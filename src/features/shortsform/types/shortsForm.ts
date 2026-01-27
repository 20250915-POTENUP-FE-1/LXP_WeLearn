// 숏츠 폼 입력 데이터 타입
export interface ShortsFormData {
  title: string
  description: string
  isPublic: boolean
  categoryId: number | null
  keywords: string[]
  keywordInput: string // 키워드 자동완성
  thumbnail: string | null // base64 (미리보기용)
  thumbnailFile: File | null // 업로드용 원본 File
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
  thumbnailFile: null,
}

// 비디오 프리뷰 데이터 타입
export interface VideoPreviewData {
  videoFile: File | null
  durationSec: number | null
  isDragging: boolean
}

// 비디오 프리뷰 초기값
export const INITIAL_VIDEO_PREVIEW_DATA: VideoPreviewData = {
  videoFile: null,
  durationSec: null,
  isDragging: false,
}

// 폼 필드 변경 핸들러 타입
export type ShortsFormChangeHandler = <K extends keyof ShortsFormData>(
  field: K,
  value: ShortsFormData[K],
) => void

// 비디오 프리뷰 변경 핸들러 타입
export type VideoPreviewChangeHandler = <K extends keyof VideoPreviewData>(
  field: K,
  value: VideoPreviewData[K],
) => void

// 수정 폼용 초기 데이터 타입
export interface ShortsEditInitialData {
  formData: Partial<ShortsFormData>
  videoData: Partial<VideoPreviewData>
  videoUrl: string
  thumbnailUrl: string | null
}

// 카테고리 응답 타입 (서버에서 전달)
export interface CategoryOption {
  id: number
  name: string
}
