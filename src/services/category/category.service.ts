import { api } from '@/lib/utils/apiUtils'

export interface Category {
  id: number
  name: string
}

interface CategoryListResponse {
  data: CategoryResponse[]
}

export const categoryApi = {
  getAll: async (): Promise<CategoryResponse[]> => {
    const response = await api.get<CategoryListResponse>('/api/v1/categories')
    return response.data ?? []
  },
}
