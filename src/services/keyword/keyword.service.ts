import { api } from '@/lib/utils/apiUtils'
import { ApiResponse } from '@/types/mypage-shorts'

export interface KeywordResponse {
  id: number
  displayName: string
  normalizedName: string
}

export const keywordApi = {
  getAll: async (): Promise<ApiResponse<KeywordResponse[]>> => {
    const response = await api.get<ApiResponse<KeywordResponse[]>>('/api/v1/keywords')
    return response
  },
}
