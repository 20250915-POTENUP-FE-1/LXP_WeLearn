'use server'

import { keywordApi } from '@/services/keyword/keyword.service'
import { ApiResponse } from '@/types/api/api'
import { KeyWord } from '@/types/keyword/keyword'

export async function getKeywordsAction(): Promise<ApiResponse<KeyWord[]>> {
  try {
    return await keywordApi.getAllKeyword()
  } catch {
    return { success: false, code: 'ERROR', message: '키워드 조회 실패', data: [] }
  }
}
