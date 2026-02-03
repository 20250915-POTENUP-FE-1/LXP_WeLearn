'use server';

import { api } from '@/lib/utils/apiUtils';
import { ApiResponse } from '@/types/api/api';
import { PageResponse, ShortsBase } from '@/types/shorts/shorts';

export async function getShortPopular({ page = 0, size = 8 } = {}) {
  try {
    return await api.get<ApiResponse<PageResponse<ShortsBase[]>>>('/api/v1/shorts', {
      cache: 'no-store', // 항상 최신 데이터
      params: {
        page,
        size,
      },
      auth: false,
    })
  } catch (error) {
    console.error('shorts 목록 불러오기 실패:', error)
    return null
  }
}
