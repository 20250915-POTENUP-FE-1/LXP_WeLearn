import { toast } from 'react-toastify'
import { ShortsFormData, VideoPreviewData } from '@/features/register/types/shortsRegister'

type FieldKey = 'title' | 'description' | 'categoryId' | 'videoFile'

interface ValidationResult {
  isValid: boolean
  field?: FieldKey
  message?: string
}

// 허용 파일 형식 정의
export const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime']
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

export function isValidVideoFile(file: File): boolean {
  return ALLOWED_VIDEO_TYPES.includes(file.type)
}

export function isValidImageFile(file: File): boolean {
  return ALLOWED_IMAGE_TYPES.includes(file.type)
}

export function shortsFormValidation(
  formData: ShortsFormData,
  videoData: VideoPreviewData,
  showToast: boolean = true,
): ValidationResult {
  // 실패 결과 생성 헬퍼
  const fail = (field: FieldKey, message: string): ValidationResult => {
    if (showToast) toast.error(message)
    return { isValid: false, field, message }
  }

  // 필드 검증
  const title = formData.title?.trim() ?? ''
  if (!title) return fail('title', '제목을 입력해주세요.')
  if (title.length > 50) return fail('title', '제목은 50자 이내로 입력해주세요.')

  const description = formData.description?.trim() ?? ''
  if (!description) return fail('description', '설명을 입력해주세요.')

  if (description.length > 500) return fail('description', '설명은 500자 이내로 입력해주세요.')

  if (formData.categoryId === null || formData.categoryId === undefined)
    return fail('categoryId', '카테고리를 선택해주세요.')

  if (!videoData.videoFile) return fail('videoFile', '영상을 업로드해주세요.')

  if (!isValidVideoFile(videoData.videoFile)) {
    return fail('videoFile', '지원하지 않는 영상 형식입니다. (mp4, webm, mov만 허용)')
  }
  return { isValid: true }
}
