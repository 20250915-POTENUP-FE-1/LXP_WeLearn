'use server'

import { revalidatePath } from 'next/cache'
import { api } from '@/lib/utils/apiUtils'
import { userApi } from '@/services/mypage/user.service'
import type { ActionState } from '@/types/action'
import type { components } from '@/types/api-schema'
import { validateRegisterFormData, getFirstErrorMessage } from './register.validation'

// API 타입
type ShortsUploadRequest = components['schemas']['ShortsUploadRequest']
type ShortsResponse = components['schemas']['ShortsResponse']

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

const baseUrl = process.env.NEXT_PUBLIC_API_URL

/**
 * FormData 파일 업로드 (내부 유틸)
 * - 파일 업로드는 multipart/form-data가 필요하므로 별도 처리
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
    const uploadData = new FormData()
    uploadData.append('file', file)

    const data = await uploadFormData<FileUploadResponse>('/api/v1/files/videos', uploadData)

    const videoUrl = data.videoUrl ?? data.url ?? Object.values(data)[0]

    if (!videoUrl) {
      throw new Error('비디오 URL을 받지 못했습니다.')
    }

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
 * Base64 → Blob 변환 후 썸네일 업로드
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
 * 숏츠 등록 액션 (전체 프로세스)
 * 1. 비디오 업로드 (필수)
 * 2. 썸네일 업로드 (선택)
 * 3. 숏츠 등록
 */
export async function registerShortsAction(
  registerFormData: RegisterFormData,
  videoFile: File,
  durationSec?: number,
): Promise<ActionState<ShortsResponse>> {
  try {
    // 서버에서 현재 사용자 정보 조회
    const user = await userApi.getMe().catch(() => null)
    if (!user?.id) {
      return { success: false, message: '로그인이 필요합니다.' }
    }

    // 1. 비디오 업로드
    const videoFormData = new FormData()
    videoFormData.append('file', videoFile)

    const videoData = await uploadFormData<FileUploadResponse>(
      '/api/v1/files/videos',
      videoFormData,
    )

    const videoUrl = videoData.videoUrl ?? videoData.url ?? Object.values(videoData)[0]

    if (!videoUrl) {
      throw new Error('비디오 URL을 받지 못했습니다.')
    }

    // 2. 썸네일 업로드 (선택)
    let thumbnailUrl: string | undefined
    if (registerFormData.thumbnail) {
      const url = await uploadThumbnailFromBase64(registerFormData.thumbnail)
      if (url) {
        thumbnailUrl = url
      }
    }

    // 3. 숏츠 등록 요청
    const request: ShortsUploadRequest = {
      userId: user.id,
      categoryId: registerFormData.categoryId,
      title: registerFormData.title,
      description: registerFormData.description || undefined,
      videoUrl,
      thumbnailUrl,
      durationSec: durationSec ?? undefined,
      tagNames: registerFormData.keywords?.length ? registerFormData.keywords : undefined,
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

/**
 * 숏츠 등록 폼 액션 (FormData 기반)
 * useActionState와 함께 사용
 */
export async function registerShortsFormAction(
  prevState: ActionState<ShortsResponse>,
  formData: FormData,
): Promise<ActionState<ShortsResponse>> {
  // 서버에서 현재 사용자 정보 조회
  const user = await userApi.getMe().catch(() => null)
  if (!user?.id) {
    return { success: false, message: '로그인이 필요합니다.' }
  }

  const categoryId = Number(formData.get('categoryId'))
  const title = formData.get('title') as string
  const description = formData.get('description') as string | null
  const keywords = formData.getAll('keywords') as string[]
  const videoFile = formData.get('videoFile') as File | null
  const thumbnailBase64 = formData.get('thumbnail') as string | null
  const durationSec = formData.get('durationSec')

  // 유효성 검사
  const validation = validateRegisterFormData({
    categoryId,
    title,
    description: description ?? undefined,
    keywords,
    videoFile,
  })

  if (!validation.isValid) {
    return { success: false, message: getFirstErrorMessage(validation) ?? '유효성 검사 실패' }
  }

  // 유효성 검사 통과 후 타입 보장
  if (!videoFile) {
    return { success: false, message: '비디오 파일을 업로드해주세요.' }
  }

  try {
    // 1. 비디오 업로드
    const videoFormData = new FormData()
    videoFormData.append('file', videoFile)

    const videoData = await uploadFormData<FileUploadResponse>(
      '/api/v1/files/videos',
      videoFormData,
    )

    const videoUrl = videoData.videoUrl ?? videoData.url ?? Object.values(videoData)[0]

    if (!videoUrl) {
      throw new Error('비디오 URL을 받지 못했습니다.')
    }

    // 2. 썸네일 업로드 (선택)
    let thumbnailUrl: string | undefined
    if (thumbnailBase64) {
      const url = await uploadThumbnailFromBase64(thumbnailBase64)
      if (url) {
        thumbnailUrl = url
      }
    }

    // 3. 숏츠 등록 요청
    const request: ShortsUploadRequest = {
      userId: user.id,
      categoryId,
      title,
      description: description || undefined,
      videoUrl,
      thumbnailUrl,
      durationSec: durationSec ? Number(durationSec) : undefined,
      tagNames: keywords.length > 0 ? keywords : undefined,
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
