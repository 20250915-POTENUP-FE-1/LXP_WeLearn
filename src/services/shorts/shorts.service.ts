import { api } from '@/lib/utils/apiUtils'
import { ShortsResponse } from '@/types/mypage-shorts'

export interface RegisterShortsRequest {
  categoryId: number
  title: string
  description?: string
  keywords?: string[]
  videoUrl: string
  thumbnailUrl?: string
  durationSec?: number
}

export const shortsApi = {
  shortsDetailList: async ({ page = 0, size = 20 }) => {
    const response = await api.get('/api/v1/shorts', {
      cache: 'no-store',
      params: {
        page,
        size,
      },
    })
    return response
  },

  shortsDetail: async (shortsId: number) => {
    const response = await api.get(`/api/v1/shorts/${shortsId}`, {
      cache: 'no-store',
    })
    return response
  },

  registerShorts: async (params: RegisterShortsRequest) => {
    const response = await api.post<{ data: ShortsResponse }>('/api/v1/shorts', params)

    return response.data
  },
}
