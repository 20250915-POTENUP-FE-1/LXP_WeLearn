import { api } from '@/lib/utils/apiUtils'
import { ApiResponse } from '@/types/api/api'
import { PageResponse, ShortsBase, ShortsRecommendationPage } from '@/types/shorts/shorts'

export const shortsApi = {
  shortsDetailList: async ({
    page = 0,
    size = 20,
  }): Promise<ApiResponse<PageResponse<ShortsBase[]>>> => {
    const response = await api.get<ApiResponse<PageResponse<ShortsBase[]>>>('/api/v1/shorts', {
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
      auth: false,
    })
    return response
  },

  shortsRecommendation: async (
    shortsId: number,
    offset?: number,
    limit?: number,
    lastShortsId?: number,
  ) => {
    const params = new URLSearchParams()
    if (offset !== undefined) params.set('offset', String(offset))
    if (limit !== undefined) params.set('limit', String(limit))
    if (lastShortsId !== undefined) params.set('lastShortsId', String(lastShortsId))

    const query = params.toString()

    const response = await api.get<ApiResponse<ShortsRecommendationPage>>(
      `/api/v1/recommendations/shorts/${shortsId}${query ? `?${query}` : ''}`,
      {
        cache: 'no-store',
      },
    )

    return response
  },

  getShortPopular: async ({ page = 0, size = 10 }) => {
    const response = await api.get<ApiResponse<PageResponse<ShortsBase[]>>>(
      '/api/v1/shorts/popular',
      {
        cache: 'no-store',
        params: {
          page,
          size,
        },
      },
    )
    // console.log('인기 숏츠 목록 조회 결과:', response.data)
    return response
  },
}
