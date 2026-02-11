import { api } from '@/lib/utils/apiUtils'
import { ApiResponse } from '@/types/api/api'
import {
  PlaylistBase,
  PlaylistRequest,
  PlaylistShorts,
  PlaylistInfo,
  PlayListCard,
  PatchPlaylistMeta,
  PlaylistMetaDataResponse,
  ReorderPlaylist,
  PlaylistItems,
} from '@/types/playlist/playlist'
import { PageRequest, PageResponse } from '@/types/shorts/shorts'

export const playlistApi = {
  // * GET

  // 유저 개인 플레이 리스트 조회
  getUserPlaylist: async ({
    page,
    size,
  }: PageRequest): Promise<ApiResponse<PlaylistBase<PlaylistInfo[]>>> => {
    const params = new URLSearchParams({
      page: String(page),
      size: String(size),
    })

    const response = await api.get<ApiResponse<PlaylistBase<PlaylistInfo[]>>>(
      `/api/v1/playlists/me?${params}`,
      {
        cache: 'no-store',
      },
    )

    return response
  },

  // 플레이리스트 상세 조회
  getPlaylistItem: async (
    playlistId: number,
    page?: number,
    size?: number,
    sort?: string,
  ): Promise<ApiResponse<PageResponse<PlaylistItems[]>>> => {
    const params = new URLSearchParams()

    if (page !== undefined) params.set('page', String(page))
    if (size !== undefined) params.set('size', String(size))
    if (sort !== undefined) params.set('sort', sort)

    const query = params.toString()

    const response = await api.get<ApiResponse<PageResponse<PlaylistItems[]>>>(
      `/api/v1/playlists/${playlistId}${query ? `?${query}` : ''}`,
      {
        cache: 'no-store',
      },
    )

    return response
  },

  // 공개 플레이리스트 조회
  getPublicPlaylist: async ({
    page = 0,
    size = 10,
    sort = 'createdAt,desc',
  }: PageRequest): Promise<ApiResponse<PlaylistBase<PlayListCard[]>>> => {
    const params = new URLSearchParams({
      page: String(page),
      size: String(size),
      sort: String(sort),
    })

    const response = await api.get<ApiResponse<PlaylistBase<PlayListCard[]>>>(
      `/api/v1/playlists/public?${params}`,
      { cache: 'no-store' },
    )

    return response
  },

  // * POST

  createPlaylist: async (content: PlaylistRequest) => {
    const response = await api.post('/api/v1/playlists', content, { cache: 'no-store' })

    return response
  },

  addShortsPlaylist: async (
    shortsId: string,
    playlistId: string,
  ): Promise<ApiResponse<PlaylistShorts>> => {
    const response = await api.post(`/api/v1/playlists/${playlistId}/items`, { shortsId: shortsId })

    return response
  },

  // * PATCH

  patchPlaylistInfo: async (
    data: PatchPlaylistMeta,
    playlistId: string,
  ): Promise<ApiResponse<PlaylistMetaDataResponse>> => {
    return await api.patch(`/api/v1/playlists/${playlistId}`, data)
  },

  updateShortsOrder: async (
    data: ReorderPlaylist,
    playlistId: string,
  ): Promise<ApiResponse<PlaylistInfo>> => {
    return await api.patch(`/api/v1/playlists/${playlistId}/items/reorder`, data, {
      cache: 'no-store',
    })
  },

  // * DELETE
  deleteShortsInPlaylist: async (shortsId: number, playlistId: number) => {
    const response = await api.delete(`/api/v1/playlists/${playlistId}/items/${shortsId}`, {
      cache: 'no-store',
    })
  },
}
