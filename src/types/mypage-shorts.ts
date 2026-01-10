import type { components } from '@/types/api-schema'

// ============================================
// API 스키마 기반 타입
// ============================================
export type ShortsResponse = components['schemas']['ShortsResponse']
export type CategoryDto = components['schemas']['CategoryDto']
export type UploaderDto = components['schemas']['UploaderDto']
export type PageShortsResponse = components['schemas']['PageShortsResponse']
export type ShortsUpdateRequest = components['schemas']['ShortsUpdateRequest']

// ============================================
// 공개 상태 (API 스키마 기준)
// ============================================
export type ShortsStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'

// ============================================
// API 공통 응답 래퍼
// ============================================
export interface ApiResponse<T> {
  success: boolean
  code: string
  message: string
  data: T
}

// ============================================
// 페이지네이션 파라미터
// ============================================
export interface PaginationParams {
  page?: number
  size?: number
}

// 미리보기 아이템
export interface ShortsPreviewItemProps {
  shorts?: ShortsResponse | null
}

// 리스트 헤더
export interface ShortsListHeaderProps {
  totalCount: number
  label?: string
}

// 숏츠 카드
export interface ShortsCardProps {
  shorts: ShortsResponse
  isSelected?: boolean
  onSelect?: () => void
  onMoreClick?: () => void
}

// 썸네일
export interface ShortsCardThumbnailProps {
  thumbnailUrl?: string | null
  videoUrl?: string | null
  status?: ShortsStatus
}

// 드롭다운 메뉴
export interface ShortsDropdownMenuProps {
  status: ShortsStatus
  onToggleVisibility?: () => void
  onEdit?: () => void
  onDelete?: () => void
}
