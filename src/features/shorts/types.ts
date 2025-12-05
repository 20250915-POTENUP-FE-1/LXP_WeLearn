export interface ShortsUploader {
  userId: number
  nickname: string
  profileUrl: string
}

export interface ShortsCategory {
  categoryId: number
  name: string
}

export interface ShortsActionItem {
  label: string
  count?: number
}
