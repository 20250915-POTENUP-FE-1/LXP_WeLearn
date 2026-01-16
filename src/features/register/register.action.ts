'use server'

import { revalidatePath } from 'next/cache'
import type { ActionState } from '@/types/action'
import type { ShortsResponse } from '@/types/mypage-shorts'
import { shortsUploadApi } from '@/services/shorts/upload.service'

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

export interface UploadShortsPayload {
  title: string
  description: string
  categoryId: number
  keywords: string[]
  durationSec: number
  videoFile: File
  thumbnailFile?: File | null
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
