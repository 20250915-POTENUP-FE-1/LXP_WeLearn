import api from '@/lib/utils/apiUtils'
import { operations } from '@/types/api-schema'

type GetShortsOperation = operations['getShortsList']

// 2) 200 응답 바디 타입
type GetShortsResponse = GetShortsOperation['responses'][200]['content']['*/*']

export async function getShortPopular({ page = 0, size = 8 } = {}) {
  try {
    const apiClient = api()

    // apiClient.get 이 제네릭을 받도록 만들어져 있다면 이렇게:
    const popularShorts: GetShortsResponse = await apiClient.get('/api/v1/shorts', {
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
