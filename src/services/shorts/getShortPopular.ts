import { api } from '@/lib/utils/apiUtils'
import type { PageShortsResponse } from '@/types/mypage-shorts'

export async function getShortPopular({ page = 0, size = 8 } = {}) {
  try {
    const popularShorts = await api.get<PageShortsResponse>('/api/v1/shorts', {
      cache: 'no-store', // 항상 최신 데이터
      params: {
        page,
        size,
      },
    })

    return popularShorts
  } catch (error) {
    console.error('shorts 목록 불러오기 실패:', error)
    return null
  }
}
