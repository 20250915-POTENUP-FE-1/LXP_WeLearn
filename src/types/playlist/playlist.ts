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

// 임시 플레이 리스트 카드에 대한 정보
export interface PlayListCard {
  id: number
  thumbnailUrl: string
  title: string
  shortsCount: number
  categoryName: string
  progress?: number
  viewCount: number
  likeCount: number
  description: string
  visibility: Visibility
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
export interface Playlist {
  id: number
  title: string
  description: string
  thumbnailUrl: string
  visibility: Visibility
  itemCount: number
  owner: PlaylistOwner
  createdAt: string
  updatedAt: string
  item?: PlaylistItems
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
  shorts: PlaylistShorts[]
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
  uploader: PlaylistUploader
  category: Category
}

interface PlaylistUploader {
  memberId: number
  nickname: string
  profileImageUrl: string
}
