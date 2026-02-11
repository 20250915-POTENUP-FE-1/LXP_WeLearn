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
} from '@/types/playlist/playlist'
import { PageRequest } from '@/types/shorts/shorts'

export const playlistApi = {
  /**
   * ================
   * Get 요청
   * ================
   */

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
  getPlaylistItem: async (playlistId: number): Promise<ApiResponse<PlaylistInfo>> => {
    const response = await api.get<ApiResponse<PlaylistInfo>>(`/api/v1/playlists/${playlistId}`)

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
    )

    return response
  },

  /**
   * =================
   * POST 요청
   * =================
   */

  createPlaylist: async (content: PlaylistRequest) => {
    const response = await api.post('/api/v1/playlists', content)

    return response
  },

  addShortsPlaylist: async (
    shortsId: string,
    playlistId: string,
  ): Promise<ApiResponse<PlaylistShorts>> => {
    const response = await api.post(`/api/v1/playlists/${playlistId}/items`, { shortsId: shortsId })

    return response
  },

  /**
   * ================
   * PATCH
   * ================
   */

  patchPlaylistInfo: async (
    data: PatchPlaylistMeta,
    playlistId: string,
  ): Promise<ApiResponse<PlaylistMetaDataResponse>> => {
    return await api.patch(`/api/v1/playlists/${playlistId}`, data)
  },

  /**
   * ================
   * Delete
   * ================
   */

  deleteShortsInPlaylist: async (shortsId: number, playlistId: number) => {
    const response = await api.delete(`/api/v1/playlists/${playlistId}/items/${shortsId}`)
  },
}
