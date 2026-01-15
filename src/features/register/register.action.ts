'use server'

import { revalidatePath } from 'next/cache'
import { api } from '@/lib/utils/apiUtils'
import { userApi } from '@/services/mypage/user.service'
import type { ActionState } from '@/types/action'
import type { ShortsResponse } from '@/types/mypage-shorts'
import { shortsApi } from '@/services/shorts/shorts.service'
import { shortsUploadApi } from '@/services/shorts/upload.service'
import { extractVideoDuration } from '@/utils/extractVideoDuration'
import { video } from 'framer-motion/client'

// Server Action용 FormData 타입 정의
export interface ShortsUploadFormData {
  categoryId: number
  title: string
  description?: string
  keywords?: string[]
  durationSec: number
}

// 숏츠 업로드 요청 타입
interface ShortsUploadRequest {
  categoryId: number
  title: string
  description?: string
  videoUrl: string
  thumbnailUrl?: string
  durationSec?: number
  keywords?: string[]
}

// 파일 업로드 응답 타입
interface FileUploadResponse {
  [key: string]: string
}

// 등록 폼 데이터 타입
export interface RegisterFormData {
  categoryId: number
  title: string
  description?: string
  keywords?: string[]
  thumbnail?: string | null
}

// 숏츠 메타데이터 등록 타입 (S3 업로드 후)
export interface RegisterShortsMetadata {
  categoryId: number
  title: string
  description?: string
  keywords?: string[]
  videoUrl: string // S3 업로드 완료된 비디오 URL
  thumbnail?: string | null // 썸네일 Base64 (기존 방식 유지)
  durationSec?: number
}

export interface UploadShortsPayload {
  title: string
  description: string
  categoryId: number
  keywords: string[]
  durationSec: number
  videoFile: File
  thumbnailFile?: File | null
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL

/**
 * FormData 썸네일 파일 업로드 (내부 유틸)
 * - 파일 업로드는 multipart/form-data가 필요하므로 별도 처리
 * - 썸네일 업로드에만 사용 (비디오는 S3로)
 */
async function uploadFormData<T = unknown>(endpoint: string, formData: FormData): Promise<T> {
  const res = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => null)
    throw new Error(errorData?.message || '파일 업로드 실패')
  }

  return res.json()
}

/**
 * 썸네일 업로드 액션
 * - 썸네일 파일을 서버로 직접 업로드
 * - FormData 기반 업로드 지원
 */
/**
 * 썸네일 업로드 액션 (null-safe)
 * - 파일이 없으면 서버에 null로 처리
 */
export async function uploadThumbnailAction(
  formData: FormData,
): Promise<ActionState<{ thumbnailUrl: string | null }>> {
  const file = formData.get('file') as File | null

  try {
    const uploadData = new FormData()

    // 파일이 있을 때만 append
    if (file) {
      uploadData.append('file', file)
    }

    // 서버에 파일 없으면 uploadData는 비어있음
    const data = await uploadFormData<FileUploadResponse>('/api/v1/files/thumbnails', uploadData)

    // 서버에서 실제로 URL을 받지 못하면 null 처리
    const thumbnailUrl = data.thumbnailUrl ?? data.url ?? Object.values(data)[0] ?? null

    return {
      success: true,
      data: { thumbnailUrl }, // null 가능
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '썸네일 업로드 실패',
      data: { thumbnailUrl: null },
    }
  }
}

/**
 * Base64 → Blob 변환 후 썸네일 업로드 (내부 유틸)
 * - registerShortsAction에서 사용
 */
async function uploadThumbnailFromBase64(base64Data: string): Promise<string | null> {
  try {
    const response = await fetch(base64Data)
    const blob = await response.blob()

    const formData = new FormData()
    formData.append('file', blob, 'thumbnail.jpg')

    const data = await uploadFormData<FileUploadResponse>('/api/v1/files/thumbnails', formData)

    return data.thumbnailUrl ?? data.url ?? Object.values(data)[0] ?? null
  } catch (error) {
    console.error('썸네일 업로드 실패:', error)
    return null
  }
}

/**
 * 숏츠 메타데이터 등록 액션 (S3 업로드 후 호출)
 *
 * 업로드 플로우:
 * 1. 비디오: S3 직접 업로드 완료 (Presigned URL 사용)
 * 2. 썸네일: Base64 → 서버 업로드 (이 함수 내부에서 처리)
 * 3. 메타데이터: 백엔드에 저장 (videoUrl, thumbnailUrl 포함)
 *
 * @param metadata - S3 비디오 URL과 메타데이터
 * @returns 숏츠 등록 결과
 */
// Server Action 예시
export async function uploadShortsAction(
  prevState: ActionState,
  payload: UploadShortsPayload,
): Promise<ActionState<ShortsResponse>> {
  try {
    const { videoFile, thumbnailFile, ...meta } = payload
    console.log(payload)

    // 비디오 길이 계산

    // Presigned URL 발급 + S3 업로드 + 업로드 확정
    const result = await shortsUploadApi.uploadShorts(
      {
        ...meta,
        fileName: videoFile.name,
        fileSize: videoFile.size,
        contentType: videoFile.type,
      },
      videoFile,
      thumbnailFile,
    )

    console.log('결과: ', result)

    // 페이지 재검증
    revalidatePath('/mypage/myshorts')

    return {
      success: true,
      data: result,
    }
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : '업로드 실패' }
  }
}
