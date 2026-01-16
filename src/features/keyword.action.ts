'use server'

import { keywordApi, KeywordResponse } from '@/services/keyword/keyword.service'

export async function getKeywordsAction(): Promise<KeywordResponse[]> {
  try {
    const result = await keywordApi.getAll()
    return result
  } catch (error) {
    console.error('키워드 목록 조회 실패:', error)
    return []
  }
}
