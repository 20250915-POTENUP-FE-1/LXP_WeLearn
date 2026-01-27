import { api } from '@/lib/utils/apiUtils'
import { ApiResponse } from '@/types/api/api'
import { KeyWord } from '@/types/keyword/keyword'

export const keywordApi = {
  getAll: async (): Promise<ApiResponse<KeyWord[]>> => {
    const response = await api.get<ApiResponse<KeyWord[]>>('/api/v1/keywords')
    return response
  },
}
