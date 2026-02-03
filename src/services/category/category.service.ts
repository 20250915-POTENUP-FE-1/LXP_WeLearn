import { api } from '@/lib/utils/apiUtils'
import { ApiResponse } from '@/types/api/api'
import { Category } from '@/types/category/category'
import { PageRequest, PageResponse, ShortsBase } from '@/types/shorts/shorts'

export const categoryApi = {
  /** 전체 카테고리 목록 조회 */
  getAll: async (): Promise<ApiResponse<Category[]>> => {
    return api.get<ApiResponse<Category[]>>('/api/v1/categories', { auth: false })
  },

  /** 전체 숏츠 목록 조회 (페이지네이션) */
  getAllShorts: async ({ page = 0, size = 8 }: PageRequest = {}): Promise<
    ApiResponse<PageResponse<ShortsBase[]>>
  > => {
    return await api.get<ApiResponse<PageResponse<ShortsBase[]>>>('/api/v1/shorts', {
      cache: 'no-store',
      params: { page, size, sort: 'createdAt,desc' },
      auth: false,
    })
  },

  /** 카테고리별 숏츠 목록 조회 */
  getShortsByCategoryId: async (
    categoryId: number,
    { page = 0, size = 8 }: PageRequest = {},
  ): Promise<ApiResponse<PageResponse<ShortsBase[]>>> => {
    return await api.get<ApiResponse<PageResponse<ShortsBase[]>>>(
      `/api/v1/categories/${categoryId}/shorts`,
      {
        cache: 'no-store',
        params: { page, size, sort: 'createdAt,desc' },
        auth: false,
      },
    )
  },
}
