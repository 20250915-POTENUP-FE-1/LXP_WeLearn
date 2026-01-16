'use server'

import { keywordApi, KeywordResponse } from '@/services/keyword/keyword.service'

export async function getKeywordsAction(): Promise<KeywordResponse[]> {
  try {
    const result = await keywordApi.getAll()
    console.log('키워드 API 응답:', JSON.stringify(result, null, 2))
    return result
  } catch (error) {
    console.error('키워드 목록 조회 실패:', error)
    return []
  }
}
