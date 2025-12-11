import api from '@/lib/utils/apiUtils'

const apiClient = api()

export const shortsApi = {
  shortsDetailList: async ({ page = 0, size = 20 }) => {
    const response = await apiClient.get('/api/v1/shorts', {
      cache: 'no-store',
      params: {
        page,
        size,
      },
    })
    return response
  },

  shortsDetail: async (shortsId: number) => {
    const response = await apiClient.get(`/api/v1/shorts/${shortsId}`, {
      cache: 'no-store',
    })
    return response
  },
}
