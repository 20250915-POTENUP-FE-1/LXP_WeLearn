import { api } from '@/lib/utils/apiUtils'

export interface CategoryResponse {
  id: number
  name: string
}

export const categoryApi = {
  getAll: async (): Promise<CategoryResponse[]> => {
    return api.get<CategoryResponse[]>('/api/v1/categories')
  },
}
