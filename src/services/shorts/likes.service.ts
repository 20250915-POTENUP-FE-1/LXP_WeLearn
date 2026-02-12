import { api } from '@/lib/utils/apiUtils'
import { ApiResponse } from '@/types/api/api'
import { PageRequest, PageResponse, ShortsBase } from '@/types/shorts/shorts'

export const likeApi = {
  like: async (shortsId: number) => {
    const response = await api.post<ApiResponse>(`/api/v1/shorts/${shortsId}/likes`)
    return response
  },

  /**  좋아요 목록 조회 */
  getLikedShorts: async ({ page = 0, size = 20 }: PageRequest = {}): Promise<
    PageResponse<ShortsBase[]>
  > => {
    const response = await api.get<ApiResponse<PageResponse<ShortsBase[]>>>(
      `/api/v1/me/likes/shorts?page=${page}&size=${size}`,
    )
    return response.data
  },
}
