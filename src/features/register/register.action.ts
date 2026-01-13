'use server'

import { revalidatePath } from 'next/cache'
import { api } from '@/lib/utils/apiUtils'
import { userApi } from '@/services/mypage/user.service'
import type { ActionState } from '@/types/action'
import type { ShortsResponse } from '@/types/mypage-shorts'

// 숏츠 업로드 요청 타입
interface ShortsUploadRequest {
  userId: number
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
export async function uploadThumbnailAction(
  formData: FormData,
): Promise<ActionState<{ thumbnailUrl: string }>> {
  const file = formData.get('file') as File | null

  if (!file) {
    return {
      success: false,
      message: '썸네일 파일이 없습니다.',
    }
  }

  try {
    const uploadData = new FormData()
    uploadData.append('file', file)

    const data = await uploadFormData<FileUploadResponse>('/api/v1/files/thumbnails', uploadData)

    const thumbnailUrl = data.thumbnailUrl ?? data.url ?? Object.values(data)[0]

    if (!thumbnailUrl) {
      throw new Error('썸네일 URL을 받지 못했습니다.')
    }

    return {
      success: true,
      data: { thumbnailUrl },
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '썸네일 업로드 실패',
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
export async function registerShortsAction(
  metadata: RegisterShortsMetadata,
): Promise<ActionState<ShortsResponse>> {
  try {
    // 서버에서 현재 사용자 정보 조회
    const user = await userApi.getMe().catch(() => null)
    if (!user?.id) {
      return { success: false, message: '로그인이 필요합니다.' }
    }

    // 썸네일 업로드 (Base64 → 서버 업로드)
    let thumbnailUrl: string | undefined
    if (metadata.thumbnail) {
      const url = await uploadThumbnailFromBase64(metadata.thumbnail)
      if (url) {
        thumbnailUrl = url
      }
    }

    // 숏츠 등록 요청 (S3 비디오 URL + 서버 업로드된 썸네일 URL)
    const request: ShortsUploadRequest = {
      userId: user.id,
      categoryId: metadata.categoryId,
      title: metadata.title,
      description: metadata.description || undefined,
      videoUrl: metadata.videoUrl, // S3에 직접 업로드된 비디오 URL
      thumbnailUrl, // 서버에 업로드된 썸네일 URL (Base64 → 서버)
      durationSec: metadata.durationSec ?? undefined,
      keywords: metadata.keywords?.length ? metadata.keywords : undefined,
    }

    const res = await api.post<Response>('/api/v1/shorts', request)
    const response = await res.json()

    // 캐시 무효화
    revalidatePath('/mypage/myshorts')

    return {
      success: true,
      message: '숏츠가 등록되었습니다.',
      data: response?.data ?? response,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '숏츠 등록 실패',
    }
  }
}
