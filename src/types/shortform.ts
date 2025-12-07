export interface ShortsUploader {
  userId: number
  nickname: string
  profileUrl: string
}

export interface ShortsCategory {
  categoryId: number
  name: string
}

export interface ShortsDetail {
  id: number
  title: string
  description: string
  videoUrl: string
  thumbnailUrl: string
  uploader: ShortsUploader
  category: ShortsCategory
}

export interface ShortsNavigation {
  prevId: number | null
  nextId: number | null
  sortBy?: 'latest' | 'popular' | 'category'
  categoryId?: number | null
}
