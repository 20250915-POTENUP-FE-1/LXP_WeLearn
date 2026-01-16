import {
  PageResponse,
  PageShortsItem,
  ShortsItem,
} from '@/features/home/ShortsCarousel/ShortsCarousel'
import { api } from '@/lib/utils/apiUtils'
import type { ApiResponse } from '@/types/mypage-shorts'

export async function getShortPopular({ page = 0, size = 8 } = {}) {
  try {
    const popularShorts = await api.get<ApiResponse<PageResponse<ShortsItem>>>('/api/v1/shorts', {
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
