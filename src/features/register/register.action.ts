'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { registerApi } from '@/services/mypage/register.service'
import type { ActionState } from '@/types/action'
import type { components } from '@/types/api-schema'

// API 타입
type ShortsUploadRequest = components['schemas']['ShortsUploadRequest']
type ShortsResponse = components['schemas']['ShortsResponse']

// 등록 폼 데이터 타입
interface RegisterFormData {
  userId: number
  categoryId: number
  title: string
  description?: string
  keywords?: string[]
  thumbnail?: string | null // Base64
}

// 비디오 데이터 타입
interface VideoData {
  videoFile: File
  durationSec?: number
}

/**
 * 비디오 업로드 액션
 */
export async function uploadVideoAction(
  formData: FormData,
): Promise<ActionState<{ videoUrl: string }>> {
  const file = formData.get('file') as File | null

  if (!file) {
    return {
      success: false,
      message: '비디오 파일이 없습니다.',
    }
  }

  try {
    const videoUrl = await registerApi.uploadVideo(file)

    return {
      success: true,
      data: { videoUrl },
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '비디오 업로드 실패',
    }
  }
}

/**
 * 썸네일 업로드 액션
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
    const thumbnailUrl = await registerApi.uploadThumbnail(file)

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
 * 숏츠 등록 액션 (전체 프로세스)
 * 1. 비디오 업로드
 * 2. 썸네일 업로드 (선택)
 * 3. 숏츠 등록
 */
export async function registerShortsAction(
  registerFormData: RegisterFormData,
  videoFile: File,
  durationSec?: number,
): Promise<ActionState<ShortsResponse>> {
  try {
    // 1. 비디오 업로드
    const videoUrl = await registerApi.uploadVideo(videoFile)

    // 2. 썸네일 업로드 (선택)
    let thumbnailUrl: string | undefined
    if (registerFormData.thumbnail) {
      const url = await registerApi.uploadThumbnailFromBase64(registerFormData.thumbnail)
      if (url) {
        thumbnailUrl = url
      }
    }

    // 3. 숏츠 등록 요청
    const request: ShortsUploadRequest = {
      userId: registerFormData.userId,
      categoryId: registerFormData.categoryId,
      title: registerFormData.title,
      description: registerFormData.description || undefined,
      videoUrl,
      thumbnailUrl,
      durationSec: durationSec ?? undefined,
      tagNames: registerFormData.keywords?.length ? registerFormData.keywords : undefined,
    }

    const data = await registerApi.uploadShorts(request)

    // 캐시 무효화
    revalidatePath('/mypage/myshorts')

    return {
      success: true,
      message: '숏츠가 등록되었습니다.',
      data,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '숏츠 등록 실패',
    }
  }
}

/**
 * 숏츠 등록 폼 액션 (FormData 기반)
 * useActionState와 함께 사용
 */
export async function registerShortsFormAction(
  prevState: ActionState<ShortsResponse>,
  formData: FormData,
): Promise<ActionState<ShortsResponse>> {
  const userId = Number(formData.get('userId'))
  const categoryId = Number(formData.get('categoryId'))
  const title = formData.get('title') as string
  const description = formData.get('description') as string | null
  const keywords = formData.getAll('keywords') as string[]
  const videoFile = formData.get('videoFile') as File | null
  const thumbnailBase64 = formData.get('thumbnail') as string | null
  const durationSec = formData.get('durationSec')

  // 유효성 검사
  if (!userId) {
    return { success: false, message: '로그인이 필요합니다.' }
  }

  if (!categoryId) {
    return { success: false, message: '카테고리를 선택해주세요.' }
  }

  if (!title?.trim()) {
    return { success: false, message: '제목을 입력해주세요.' }
  }

  if (!videoFile || videoFile.size === 0) {
    return { success: false, message: '비디오 파일을 업로드해주세요.' }
  }

  try {
    // 1. 비디오 업로드
    const videoUrl = await registerApi.uploadVideo(videoFile)

    // 2. 썸네일 업로드 (선택)
    let thumbnailUrl: string | undefined
    if (thumbnailBase64) {
      const url = await registerApi.uploadThumbnailFromBase64(thumbnailBase64)
      if (url) {
        thumbnailUrl = url
      }
    }

    // 3. 숏츠 등록 요청
    const request: ShortsUploadRequest = {
      userId,
      categoryId,
      title,
      description: description || undefined,
      videoUrl,
      thumbnailUrl,
      durationSec: durationSec ? Number(durationSec) : undefined,
      tagNames: keywords.length > 0 ? keywords : undefined,
    }

    const data = await registerApi.uploadShorts(request)

    // 캐시 무효화
    revalidatePath('/mypage/myshorts')

    return {
      success: true,
      message: '숏츠가 등록되었습니다.',
      data,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '숏츠 등록 실패',
    }
  }
}
