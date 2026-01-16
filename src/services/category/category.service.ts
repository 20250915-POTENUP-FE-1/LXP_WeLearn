import { api } from '@/lib/utils/apiUtils'
import { ApiResponse } from '@/types/mypage-shorts'

export interface CategoryResponse {
  id: number
  name: string
}

export const categoryApi = {
  getAll: async (): Promise<ApiResponse<CategoryResponse[]>> => {
    return api.get<ApiResponse<CategoryResponse[]>>('/api/v1/categories')
  },
}
