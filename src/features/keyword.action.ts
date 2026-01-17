'use server'

import { keywordApi, KeywordResponse } from '@/services/keyword/keyword.service'
import { ApiResponse } from '@/types/mypage-shorts'

export async function getKeywordsAction(): Promise<ApiResponse<KeywordResponse[]>> {
  try {
    return await keywordApi.getAll()
  } catch {
    return { success: false, code: 'ERROR', message: '키워드 조회 실패', data: [] }
  }
}
