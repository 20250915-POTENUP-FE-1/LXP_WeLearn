import { api } from '@/lib/utils/apiUtils'
import { ApiResponse, PageShortsResponse, PaginationParams } from '@/types/mypage-shorts'

export interface CategoryResponse {
  id: number
  name: string
}

export const categoryApi = {
  /** 전체 카테고리 목록 조회 */
  getAll: async (): Promise<ApiResponse<CategoryResponse[]>> => {
    return api.get<ApiResponse<CategoryResponse[]>>('/api/v1/categories')
  },

  /** 카테고리별 숏츠 목록 조회 */
  getShortsByCategoryId: async (
    categoryId: number,
    { page = 0, size = 8 }: PaginationParams = {},
  ): Promise<ApiResponse<PageShortsResponse>> => {
    return api.get<ApiResponse<PageShortsResponse>>(`/api/v1/categories/${categoryId}/shorts`, {
      cache: 'no-store',
      params: { page, size, sort: 'createdAt,desc' },
    })
  },
}
