// 숏츠 폼 입력 데이터 타입
export interface ShortsFormData {
  title: string
  description: string
  isPublic: boolean
  categoryId: number | null // API 연동 대비 (number)
  keywords: string[]
  keywordInput: string
  thumbnail: string | null // base64 (미리보기용)
}

// 폼 데이터 초기값
export const INITIAL_SHORTS_FORM_DATA: ShortsFormData = {
  title: '',
  description: '',
  isPublic: true,
  categoryId: null,
  keywords: [],
  keywordInput: '',
  thumbnail: null,
}

// 비디오 프리뷰 데이터 타입
export interface VideoPreviewData {
  videoFile: File | null
  durationSec: number | null // API 연동 대비
  isDragging: boolean
}

// 비디오 프리뷰 초기값
export const INITIAL_VIDEO_PREVIEW_DATA: VideoPreviewData = {
  videoFile: null,
  durationSec: null,
  isDragging: false,
}

// ========== 핸들러 타입 정의 ==========

// ShortsFormData 필드명 타입
export type ShortsFormField = keyof ShortsFormData

// VideoPreviewData 필드명 타입
export type VideoPreviewField = keyof VideoPreviewData

// 폼 필드 변경 핸들러 타입 : 제네릭
export type ShortsFormChangeHandler = <K extends ShortsFormField>(
  field: K,
  value: ShortsFormData[K],
) => void

// 비디오 프리뷰 변경 핸들러 타입 : 제네릭
export type VideoPreviewChangeHandler = <K extends VideoPreviewField>(
  field: K,
  value: VideoPreviewData[K],
) => void
