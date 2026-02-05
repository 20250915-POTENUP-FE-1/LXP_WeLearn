import { ApiResponse } from '@/types/api/api'
import {
  PlaylistBase,
  PlaylistItem,
  PlaylistRequest,
  PlaylistShorts,
} from '@/types/playlist/playlist'
import { PageRequest } from '@/types/shorts/shorts'
import { cookies } from 'next/headers'

const baseUrl = 'https://995dcec8-b9b9-4ce1-b734-d1a7806c16ea.mock.pstmn.io'
export const PlaylistApi = {
  // 유저 개인 플레이 리스트 조회
  getUserPlaylist: async ({ page, size }: PageRequest): Promise<PlaylistBase<PlaylistItem[]>> => {
    const params = new URLSearchParams({
      page: String(page),
      size: String(size),
    })
    const response = await fetch(`${baseUrl}/api/playlists/me?${params}`, {
      cache: 'no-store',
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error('request failed')
    }
    return data.data
  },

  createPlaylist: async (content: PlaylistRequest) => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    const response = await fetch(`${baseUrl}/api/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(content),
    })

    if (!response.ok) {
      throw new Error('플레이리스트 생성 실패')
    }

    const data = await response.json()

    return data
  },

  addShortsPlaylist: async (
    shortsId: number,
    playlistId: number,
  ): Promise<ApiResponse<PlaylistShorts>> => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    const response = await fetch(`${baseUrl}/api/playlists/${playlistId}/items`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ shortsId }),
    })

    if (!response.ok) {
      throw new Error('숏츠 저장 실패')
    }

    const data = await response.json()

    return data.data
  },
}
