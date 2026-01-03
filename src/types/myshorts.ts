// 숏츠 공개 상태
export type ShortsVisibility = 'public' | 'private'

// 숏츠 아이템 (공통)
export interface ShortsItem {
  id: string
  title: string
  description?: string
  thumbnailUrl: string | null
  category: string
  tags: string[]
  authorName: string
  createdAt: string
}

// 내 숏츠 아이템 (공개 상태 포함)
export interface MyShortsItem extends ShortsItem {
  visibility: ShortsVisibility
}

// 미리보기 카드 Props
export interface ShortsPreviewCardProps {
  title?: string
  category?: string
  description?: string
  thumbnailUrl?: string | null
  authorName?: string
  tags?: string[]
}

// 리스트 헤더 Props
export interface ShortsListHeaderProps {
  totalCount: number
  label?: string
}

// 숏츠 카드 Props
export interface ShortsCardProps {
  shorts: ShortsItem | MyShortsItem
  onSelect?: () => void
}

// 썸네일 Props
export interface ShortsThumbnailProps {
  thumbnailUrl: string | null
  visibility?: ShortsVisibility
}
