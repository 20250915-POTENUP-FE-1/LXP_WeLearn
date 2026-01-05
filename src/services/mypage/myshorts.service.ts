import api from '@/lib/utils/apiUtils'
import type { components } from '@/types/api-schema'

// API 타입
type ShortsResponse = components['schemas']['ShortsResponse']
type PageShortsResponse = components['schemas']['PageShortsResponse']
type ShortsUpdateRequest = components['schemas']['ShortsUpdateRequest']

// 페이지네이션 파라미터
interface PaginationParams {
  page?: number
  size?: number
}

const apiClient = api()

export const myShortsApi = {
  /**
   * 내 숏츠 목록 조회
   * GET /api/v1/users/me/shorts
   */
  getMyShorts: async (params: PaginationParams = {}): Promise<PageShortsResponse> => {
    const { page = 0, size = 10 } = params
    const response = await apiClient.get('/api/v1/users/me/shorts', {
      params: { page, size },
      cache: 'no-store',
    })
    return response
  },

  /**
   * 숏츠 상세 조회
   * GET /api/v1/shorts/{shortId}
   */
  getShorts: async (shortId: number): Promise<ShortsResponse> => {
    const response = await apiClient.get(`/api/v1/shorts/${shortId}`, {
      cache: 'no-store',
    })
    // ApiResponsePageShortsResponse에서 첫 번째 항목 반환
    return response?.data?.content?.[0] ?? response
  },

  /**
   * 숏츠 수정
   * PATCH /api/v1/shorts/{shortId}
   */
  updateShorts: async (shortId: number, data: ShortsUpdateRequest): Promise<ShortsResponse> => {
    const response = await apiClient.patch(`/api/v1/shorts/${shortId}`, data)
    return response?.data ?? response
  },

  /**
   * 숏츠 삭제
   * DELETE /api/v1/shorts/{shortId}
   */
  deleteShorts: async (shortId: number): Promise<boolean> => {
    await apiClient.delete(`/api/v1/shorts/${shortId}`)
    return true
  },

  /**
   * 숏츠 공개/비공개 전환
   * PATCH /api/v1/shorts/{shortId}
   */
  toggleShortsStatus: async (
    shortId: number,
    currentStatus: ShortsUpdateRequest['status'],
  ): Promise<ShortsResponse> => {
    const newStatus = currentStatus === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'
    const response = await apiClient.patch(`/api/v1/shorts/${shortId}`, {
      status: newStatus,
    })
    return response?.data ?? response
  },
}
