import type { ShortsFormData, VideoPreviewData } from './shortsRegister'

// 폼 모드 타입
export type ShortsFormMode = 'create' | 'edit'

// 수정 폼 Props
export interface ShortsEditFormProps {
  shortId: number
  initialData: ShortsEditInitialData
}

// 서버에서 받아온 숏츠 데이터를 폼 데이터로 변환한 타입
export interface ShortsEditInitialData {
  formData: Partial<ShortsFormData>
  videoData: Partial<VideoPreviewData>
  videoUrl: string // 기존 영상 URL (수정 불가, 미리보기용)
  thumbnailUrl: string | null // 기존 썸네일 URL
}

// 폼 컨테이너 공통 Props
export interface ShortsFormContainerProps {
  mode: ShortsFormMode
  shortId?: number // edit 모드에서만 필요
  initialData?: ShortsEditInitialData // edit 모드에서만 필요
}

// 변경 감지용 타입
export interface FormChangeState {
  hasChanges: boolean
  changedFields: Set<keyof ShortsFormData>
}
