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
  shortsId: string
  title: string
  description: string
  videoUrl: string
  thumbnailUrl: string
  uploader: ShortsUploader
  category: ShortsCategory
}
