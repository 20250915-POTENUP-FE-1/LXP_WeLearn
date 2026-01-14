// ========== 상수 정의 ==========
export const VALIDATION_LIMITS = {
  TITLE_MAX_LENGTH: 40,
  DESCRIPTION_MAX_LENGTH: 500,
  KEYWORDS_MIN: 1,
  KEYWORDS_MAX: 5,
} as const

export const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime']
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
