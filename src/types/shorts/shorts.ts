import { Category } from '../category/category'
import { ShortsStatus } from '../mypage-shorts'
import { UserInfo } from '../user/user'
import { Status } from './status'

/** 🔹 Shorts 최소 공통 Base */
export interface ShortsBase {
  shortsId: string | number
  title: string
  description: string
  thumbnailUrl: string | null
  category: Category
  uploader: Omit<UserInfo, 'email'>
}

/* =========================
 * Shorts List  -> /api/v1/shorts
 * 숏츠 목록 조회
 * ========================= */

export interface ShortsListItem extends ShortsBase {
  videoUrl: string
  duration: number
  viewCount: number
  likeCount: number
  keywords?: string[]
  createdAt: string
}

/* =========================
 * Category Shorts -> /api/v1/categories/{categoryId}/shorts
 * 같은 카테고리 숏츠 목록 조회
 * ========================= */

export interface CategoryShortsItem extends ShortsBase {
  videoUrl: string
  durationSec: number
  status: ShortsStatus
}

/* =========================
 * Popular Shorts -> /api/v1/shorts/popular
 * 인기 목록 숏츠 조회
 * ========================= */

export interface PopularShortsItem extends ShortsBase {
  videoUrl: string
  durationSec: number
  viewCount: number
  likeCount: number
  status: ShortsStatus
}

/* =========================
 * Shorts Detail -> /api/v1/shorts/{shortsId}
 * 숏츠 상세 조회
 * ========================= */

export interface ShortsDetail {
  shortId: string
  title: string
  description: string
  thumbnailUrl: string
  duration: number
  s3Key: string
  viewCount: number
  likeCount: number
  commentCount: number
  category: Category
  keywords: string[]
  uploader: Omit<UserInfo, 'email'>
  isLiked: boolean
  createdAt: string
  updatedAt: string
}

/* =========================
 * My Shorts -> /api/v1/shorts/me
 * 내 숏츠 목록 조회
 * ========================= */

export interface MyShortsItem extends ShortsBase {
  videoUrl: string
  duration: number | null
  status: Status
  viewCount: number
  likeCount: number
  commentCount: number
  keywords: string[]
  createdAt: string
  updatedAt: string
}

/* =========================
 * Upload (Presigned URL) -> /api/v1/shorts/upload
 * 숏츠 업로드 요청
 * ========================= */

export interface ShortsUploadPrepare {
  shortsId: string
  videoPresignedUrl: string
  thumbnailPresignedUrl?: string
  uploadId: string
  expiresIn: number
  maxFileSize: number
}

/* =========================
 * Upload Status -> /api/v1/shorts/{shortsId}/upload-status
 * 숏츠 업로드 상태 조회
 * ========================= */

export interface ShortsUploadStatus {
  shortsId: string
  status: ShortsStatus
  videoUrl?: string
  thumbnailUrl?: string
  durationSec?: number
  uploadedAt: string
  completedAt?: string
  errorMessage?: string | null
}

/* =========================
 * Recommendation ->  /api/v1/recommendations/shorts/{shortsId}
 * 숏츠 추천 목록 조회
 * ========================= */

export interface ShortsRecommendation {
  shortsId: number
  title: string
  thumbnailUrl: string
  similarity: number
}

export interface ShortsRecommendationPage {
  recommendations: ShortsRecommendation[]
  pageInfo: {
    offset: number
    limit: number
    totalCount: number
    hasNext: boolean
    nextOffset: number
  }
}

/* =========================
 * Pagination (Common) -> 직접 쓸 일 없음
 * ========================= */

export interface Sort {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}

export interface Pageable {
  pageNumber: number
  pageSize: number
  offset?: number
  paged?: boolean
  unpaged?: boolean
  sort?: Sort
}

export interface PageResponse<T> {
  content: T[]
  pageable: Pageable
  totalElements: number
  totalPages: number
  last: boolean
  first: boolean
  size?: number
  number?: number
  numberOfElements?: number
  empty?: boolean
}
