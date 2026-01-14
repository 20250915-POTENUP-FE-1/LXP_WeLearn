import { api } from '@/lib/utils/apiUtils'

export interface KeywordResponse {
  id: number
  name: string
}

export const keywordApi = {
  getAll: async (): Promise<KeywordResponse[]> => {
    return api.get<KeywordResponse[]>('/api/v1/keywords')
  },
}
