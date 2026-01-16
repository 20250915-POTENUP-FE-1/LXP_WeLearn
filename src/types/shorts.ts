import { ShortsStatus } from './mypage-shorts'

export interface ShortsUploader {
  userId: number
  userNickName: string
  userProfileUrl: string | null
}

export interface ShortsCategory {
  categoryId: number
  name: string
}

export interface ShortsDetail {
  categoryId: number
  shortsId: number
  title: string
  description: string
  videoUrl: string
  thumbnailUrl: string
  uploader: ShortsUploader
  category: ShortsCategory
}

export interface ShortsItemType {
  categoryId: number
  categoryName: string
  durationSec: number
  shortsId: number
  status: ShortsStatus
  thumbnailUrl?: string
  title: string
  description: string
  videoUrl: string
  userId: number
  userNickname: string
  userProfileUrl: string | null
}
