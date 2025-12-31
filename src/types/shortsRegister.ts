// 숏츠 폼 입력 데이터 타입
export interface ShortsFormData {
  title: string
  description: string
  isPublic: boolean
  category: string
  keywords: string[]
  keywordInput: string
  thumbnail: string | null
}

// 폼 데이터 초기값
export const INITIAL_SHORTS_FORM_DATA: ShortsFormData = {
  title: '',
  description: '',
  isPublic: true,
  category: '',
  keywords: [],
  keywordInput: '',
  thumbnail: null,
}

// 비디오 프리뷰 데이터 타입
export interface VideoPreviewData {
  videoFile: File | null
  isDragging: boolean
}

// 비디오 프리뷰 초기값
export const INITIAL_VIDEO_PREVIEW_DATA: VideoPreviewData = {
  videoFile: null,
  isDragging: false,
}

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
