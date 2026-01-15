import { api } from '@/lib/utils/apiUtils'

export interface Category {
  id: number
  name: string
}

export interface ApiResponse<T> {
  success: boolean
  code: string
  message: string | null
  request: any | null
  data: T
}

// 카테고리 목록 응답 타입
export type CategoryResponse = ApiResponse<Category[]>

export const categoryApi = {
  getAll: async (): Promise<CategoryResponse> => {
    return api.get<CategoryResponse>('/api/v1/categories')
  },
}
