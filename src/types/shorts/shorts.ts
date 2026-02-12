import { ShortsStatus, ShortsVisibility, UploadStatus } from './status'

//------------- 업로더 ------------
// 숏츠 업로더
export interface ShortsUploader {
  userId: number
  userNickname: string
  userProfileUrl: string | null
}

// ----------------- Request ---------------
// 숏츠 업로드 / 수정 Request
export interface ShortsRequest {
  title: string
  description: string | null
  categoryId: number
  keywords: string[]
  fileName?: string
  contentType?: string
  durationSec?: number
  visibility?: ShortsVisibility
  thumbnailUrl?: string | null
}

// ----------------- Response ----------------
/**
 * 모든 숏츠 데이터
 */
export interface ShortsBase {
  shortsId: number
  title: string
  description: string
  categoryId: number
  categoryName: string
  keywords: string[]

  videoUrl: string
  thumbnailUrl: string | null
  durationSec: number

  userId: number
  userNickname: string
  userProfileUrl: string | null
  status: ShortsStatus
  shortsStatusDescription?: string | null
  visibility: ShortsVisibility

  isLiked: boolean
  likeCount: number
  viewCount: number
  commentCount: number

  createdAt: string
  updatedAt: string
}

/**
 * 좋아요한 숏츠
 * 개발시 수정 필요 **
 */
export interface LikedShorts {
  id: string
  category: string
  thumbnailUrl: string
  title: string
  nickname: string
  progress: number
}

/* =========================
 * Upload (Presigned URL) -> /api/v1/shorts/upload
 * 숏츠 업로드 요청
 * ========================= */

export interface PresignedUrlRequest {
  title: string
  description: string
  categoryId: number
  keywords: string[]
  fileName: string
  fileSize: number
  contentType: string
  durationSec: number
}

export interface PresignedUrlResponse {
  shortId: number
  videoPresignedUrl: string
  thumbnailPresignedUrl: string
  uploadId: string
  expiresIn: number
  maxFileSize: number
}

/* =========================
 * Confirm(업로드) -> /api/v1/shorts/{shortsId}/upload-complete
 * 업로드 확정
 * ========================= */
// 업로드 완료 확정 요청
export interface ConfirmUploadRequest {
  shortId: number
  uploadId: string
  videoUrl: string
  thumbnailUrl: string
}

// 업로드 완료 확정 응답
export interface ConfirmUploadResponse {
  shortId: number
  uploadId: string
  videoUrl: string
  thumbnailUrl: string
}
/* =========================
 * Upload Status -> /api/v1/shorts/{shortsId}/upload-status
 * 숏츠 업로드 상태 조회
 * ========================= */

export interface ShortsUploadStatus {
  shortsId: string
  shortsStatus: ShortsStatus
  uploadStatus: UploadStatus
  videoUrl?: string
  thumbnailUrl?: string
  durationSec?: number
  uploadedAt: string
  completedAt?: string
  errorMessage?: string | null
  shortsStatusDescription?: string | null
}

/* =========================
 * Recommendation ->  /api/v1/recommendations/shorts/{shortsId}
 * 숏츠 추천 목록 조회
 * ========================= */

export interface ShortsRecommendation {
  shortsId: number
  title: string
  thumbnailUrl: string
  uploaderNickname: string
  categoryName: string
  viewCount: number
  likeCount: number
  keywords: string[]
  durationSec: number
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

/**
 * 플레이리스트 조회시
 * SHORTS 데이터
 */

export interface PlaylistShorts {
  shortsId: number
  title: string
  thumbnailUrl: string
  durationSec: number
  shortsOwner: { id: number; nickname: string }
}

/* =========================
 * Pagination (Common) -> 직접 쓸 일 없음
 * ========================= */

export interface Sort {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}

export interface PageRequest {
  page?: number
  size?: number
  sort?: string
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
  content: T
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
