// ============================================
// 숏츠 상태
// ============================================
export type ShortsStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | null | undefined

// ============================================
// 업로더 정보
// ============================================
export interface UploaderDto {
  userId?: number
  nickname?: string
  profileImageUrl?: string
}

// ============================================
// 카테고리 정보
// ============================================
export interface CategoryDto {
  categoryId?: number
  name?: string
}

// ============================================
// 숏츠 응답 타입
// ============================================
export interface ShortsResponse {
  shortsId?: number
  title?: string
  description?: string
  videoUrl?: string
  thumbnailUrl?: string
  durationSec?: number
  keywords?: string[]
  status?: ShortsStatus
  uploader?: UploaderDto
  category?: CategoryDto
  createdAt?: string
  updatedAt?: string
}

// ============================================
// 페이지네이션 숏츠 응답
// ============================================
export interface PageShortsResponse {
  content?: ShortsResponse[]
  totalElements?: number
  totalPages?: number
  size?: number
  number?: number
  first?: boolean
  last?: boolean
  empty?: boolean
}

// ============================================
// 숏츠 수정 요청
// ============================================
export interface ShortsUpdateRequest {
  title?: string
  description?: string
  categoryId?: number
  keywords?: string[]
  status?: ShortsStatus
  thumbnailUrl?: string | null
}

// ============================================
// API 공통 응답 래퍼 // api 반환값에 대한 타입 정의
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
