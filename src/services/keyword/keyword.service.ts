import { api } from '@/lib/utils/apiUtils'

export interface KeywordResponse {
  id: number
  displayName: string
  normalizedName: string
}

interface KeywordListResponse {
  data: KeywordResponse[]
}

export const keywordApi = {
  getAll: async (): Promise<KeywordResponse[]> => {
    const response = await api.get<KeywordListResponse | KeywordResponse[]>('/api/v1/keywords')
    // 응답이 { data: [...] } 형태인지 배열인지 확인
    if (Array.isArray(response)) {
      return response
    }
    return response.data ?? []
  },
}
