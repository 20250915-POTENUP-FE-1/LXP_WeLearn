import { Category } from '../category/category'
import { Pageable } from '../shorts/shorts'
import { ShortsVisibility } from '../shorts/status'

export type Visibility = 'PUBLIC' | 'PRIVATE'

/* 플레이 리스트 생성 / 수정 요청시 Request
 * /api/v1/playlists // /api/v1/playlists/{playlistId}
 */
export interface PlaylistRequest {
  title: string
  description: string
  thumbnailUrl: string | null
  visibility: Visibility
}

// 공개 플레이리스트 조회 시
// /api/v1/playlists/public
export interface PlayListCard {
  id: number
  title: string
  description: string
  visibility: Visibility
  thumbnailUrl: string
  shortsCount: number
  categoryName: string
  progress?: number
  viewCount: number
  likeCount: number
}

export interface PlaylistBase<T = unknown> {
  content: T
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  pageable: Pageable
  size: number
  sort: {
    sorted: boolean
    empty: boolean
    unsorted: boolean
  }
  totalPages: number
  totalElements: number
}

export interface PlaylistOwner {
  id: number
  nickname: string
  profileUrl: string
}

/**
 * 내 플레이 리스트 요청시
 * /api/v1/playlists/me
 */
export interface PlaylistInfo {
  id: number
  title: string
  description: string
  thumbnailUrl: string
  visibility: Visibility
  shortsCount: number
  owner: PlaylistOwner
  createdAt: string
  updatedAt: string
  items?: PlaylistItems[]
}

// 플레이리스트 기본 틀
export interface PlaylistBase<T = unknown> {
  content: T
  pageable: Pageable
  totalPages: number
  totalElements: number
}

// 플레이리스트 조회 시
// 안에 아이템
export interface PlaylistItems {
  itemId: number
  position: number
  shorts: PlaylistShorts
  addedAt: string
}

// 숏츠 추가시
export interface PlaylistAdded<T = unknown> {
  itemId: number
  position: number
  shorts: T
  addedAt: string
}

// 삭젝 가능성 있음
// 숏츠 추가시 들어오는 숏츠 데이터
export interface PlaylistShorts {
  shortsId: number
  title: string
  description: string
  videoUrl: string
  thumbnailUrl: string
  durationSec: number
  status: ShortsVisibility
  // API 연동시 삭제 예정
  // PlaylistShorts에 uploader: PlaylistUploader로 변경
  uploader: PlaylistOwner
  // 여기까지 api 들어오면 수정
  category: Category
  keywords: string[]
  createdAt: string
  viewCount: number
}

export interface PlaylistMetaDataResponse {
  id: number
  title: string
  description: string
  visibility: Visibility
  thumbnailUrl: string
  shortsCount: number
  owner: PlaylistOwner
  createdAt: string
  updatedAt: string
  category: Category
  keywords: string[]
  viewCount: number
}

export interface PatchPlaylistMeta {
  title?: string
  description?: string
  thumbnailShortsId?: number
  visibility?: Visibility
}
