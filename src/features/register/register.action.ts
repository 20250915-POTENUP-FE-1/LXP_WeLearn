'use server'

import { revalidatePath } from 'next/cache'
import type { ActionState } from '@/types/action'
import {
  shortsUploadApi,
  type PresignedUrlRequest,
  type PresignedUrlResponse,
  type ConfirmUploadRequest,
  type ConfirmUploadResponse,
} from '@/services/shorts/upload.service'

/**
 * 1단계: Presigned URL 발급 (Server Action for useActionState)
 * - 쿠키 인증이 필요하므로 서버에서 처리
 */
export async function getPresignedUrlAction(
  prevState: ActionState<PresignedUrlResponse>,
  params: PresignedUrlRequest,
): Promise<ActionState<PresignedUrlResponse>> {
  try {
    const result = await shortsUploadApi.getPresignedUrl(params)
    return {
      success: true,
      data: result,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Presigned URL 발급 실패',
    }
  }
}

/**
 * 3단계: 업로드 완료 확정 (Server Action)
 * - 쿠키 인증이 필요하므로 서버에서 처리
 */
export async function confirmUploadAction(
  params: ConfirmUploadRequest,
): Promise<ActionState<ConfirmUploadResponse>> {
  try {
    const result = await shortsUploadApi.confirmUpload(params)

    // 페이지 재검증
    revalidatePath('/mypage/myshorts')

    return {
      success: true,
      data: result,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '업로드 확정 실패',
    }
  }
}
