import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  VALIDATION_LIMITS,
} from '@/constants/form.validation'
import type { ShortsFormData, VideoPreviewData } from './types/shortsRegister'

// ========== 타입 정의 ==========
export type ValidationField = 'title' | 'description' | 'categoryId' | 'videoFile' | 'keywords'

export interface ValidationError {
  field: ValidationField
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

// ========== 입력 필드 검증 함수 ==========

export function validateTitle(title: string | undefined): ValidationError | null {
  const trimmed = title?.trim() ?? ''
  if (!trimmed) {
    return { field: 'title', message: '제목을 입력해주세요.' }
  }
  if (trimmed.length > VALIDATION_LIMITS.TITLE_MAX_LENGTH) {
    return {
      field: 'title',
      message: `제목은 ${VALIDATION_LIMITS.TITLE_MAX_LENGTH}자 이내로 입력해주세요.`,
    }
  }
  return null
}

export function validateDescription(description: string | undefined): ValidationError | null {
  const trimmed = description?.trim() ?? ''
  if (!trimmed) {
    return { field: 'description', message: '설명을 입력해주세요.' }
  }
  if (trimmed.length > VALIDATION_LIMITS.DESCRIPTION_MAX_LENGTH) {
    return {
      field: 'description',
      message: `설명은 ${VALIDATION_LIMITS.DESCRIPTION_MAX_LENGTH}자 이내로 입력해주세요.`,
    }
  }
  return null
}

export function validateCategoryId(categoryId: number | null | undefined): ValidationError | null {
  if (categoryId === null || categoryId === undefined) {
    return { field: 'categoryId', message: '카테고리를 선택해주세요.' }
  }
  return null
}

export function validateKeywords(keywords: string[]): ValidationError | null {
  if (keywords.length < VALIDATION_LIMITS.KEYWORDS_MIN) {
    return {
      field: 'keywords',
      message: `키워드를 ${VALIDATION_LIMITS.KEYWORDS_MIN}개 이상 입력해주세요.`,
    }
  }
  return null
}

export function validateVideoFile(videoFile: File | null | undefined): ValidationError | null {
  if (!videoFile) {
    return { field: 'videoFile', message: '영상을 업로드해주세요.' }
  }
  if (!ALLOWED_VIDEO_TYPES.includes(videoFile.type)) {
    return { field: 'videoFile', message: '지원하지 않는 영상 형식입니다. (mp4만 허용)' }
  }
  return null
}

// ========== 유틸리티 함수 ==========

export function isValidVideoFile(file: File): boolean {
  return ALLOWED_VIDEO_TYPES.includes(file.type)
}

export function isValidImageFile(file: File): boolean {
  return ALLOWED_IMAGE_TYPES.includes(file.type)
}

export function isKeywordsMaxReached(keywords: string[]): boolean {
  return keywords.length >= VALIDATION_LIMITS.KEYWORDS_MAX
}

export function isKeywordsValid(keywords: string[]): boolean {
  return keywords.length >= VALIDATION_LIMITS.KEYWORDS_MIN
}

/**
 * 숏츠 폼 전체 유효성 검증 (클라이언트용)
 * - 제목, 설명, 카테고리, 키워드, 영상 파일을 순차적으로 검증
 * - 모든 에러를 수집하여 ValidationResult로 반환
 */
export function validateShortsForm(
  formData: ShortsFormData,
  videoData: VideoPreviewData,
): ValidationResult {
  const errors: ValidationError[] = []

  // 제목
  const titleError = validateTitle(formData.title)
  if (titleError) errors.push(titleError)

  // 설명
  const descriptionError = validateDescription(formData.description)
  if (descriptionError) errors.push(descriptionError)

  // 카테고리 선택
  const categoryError = validateCategoryId(formData.categoryId)
  if (categoryError) errors.push(categoryError)

  // 키워드
  const keywordsError = validateKeywords(formData.keywords)
  if (keywordsError) errors.push(keywordsError)

  // 영상 파일
  const videoError = validateVideoFile(videoData.videoFile)
  if (videoError) errors.push(videoError)

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * 서버 액션용 유효성 검증
 */
export function validateRegisterFormData(data: {
  categoryId?: number
  title?: string
  description?: string
  keywords?: string[]
  videoFile?: File | null
}): ValidationResult {
  const errors: ValidationError[] = []

  const titleError = validateTitle(data.title)
  if (titleError) errors.push(titleError)

  const descriptionError = validateDescription(data.description)
  if (descriptionError) errors.push(descriptionError)

  const categoryError = validateCategoryId(data.categoryId)
  if (categoryError) errors.push(categoryError)

  if (data.keywords) {
    const keywordsError = validateKeywords(data.keywords)
    if (keywordsError) errors.push(keywordsError)
  }

  const videoError = validateVideoFile(data.videoFile)
  if (videoError) errors.push(videoError)

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * 첫 번째 에러 메시지 반환 (서버 액션 응답용)
 */
export function getFirstErrorMessage(result: ValidationResult): string | null {
  return result.errors[0]?.message ?? null
}
