import { api } from '@/lib/utils/apiUtils'
import type {
  ShortsResponse,
  PageShortsResponse,
  ShortsUpdateRequest,
  ApiResponse,
  PaginationParams,
} from '@/types/mypage-shorts'

export const myShortsApi = {
  /** 내 숏츠 목록 조회 */
  getMyShorts: async ({
    page = 0,
    size = 20,
  }: PaginationParams = {}): Promise<PageShortsResponse> => {
    console.log('[getMyShorts] 요청 시작 - page:', page, 'size:', size)
    const res = await api.get<ApiResponse<PageShortsResponse>>('/api/v1/shorts/me', {
      cache: 'no-cache',
    })
    console.log('[getMyShorts] 응답:', res)
    console.log('[getMyShorts] 응답 data:', res.data)
    return res.data
  },

  /** 숏츠 상세 조회 */
  getShorts: async (shortsId: number): Promise<ShortsResponse> => {
    const response = await api.get<ApiResponse<ShortsResponse>>(`/api/v1/shorts/${shortsId}`)
    if (response.data) {
      return response.data
    }
    throw new Error('숏츠를 찾을 수 없습니다')
  },

  /** 숏츠 수정 */
  updateShorts: async (
    shortsId: number,
    data: ShortsUpdateRequest,
  ): Promise<ApiResponse<ShortsResponse>> => {
    const response = await api.patch<ApiResponse<ShortsResponse>>(
      `/api/v1/shorts/${shortsId}`,
      data,
    )
    if (response) {
      return response
    }
    throw new Error('숏츠 수정에 실패했습니다')
  },

  /** 숏츠 삭제 */
  deleteShorts: (shortsId: number): Promise<boolean> => {
    return api.delete(`/api/v1/shorts/${shortsId}`)
  },

  // /** 숏츠 공개/비공개 전환 */
  // toggleShortsStatus: async (
  //   shortsId: number,
  //   currentStatus: ShortsUpdateRequest['status'],
  // ): Promise<ShortsResponse> => {
  //   const newStatus = currentStatus === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'
  //   const response = await api.patch<ApiResponse<ShortsResponse>>(`/api/v1/shorts/${shortsId}`, {
  //     status: newStatus,
  //   })
  //   if (response.data) {
  //     return response.data
  //   }
  //   throw new Error('숏츠 상태 변경에 실패했습니다')
  // },
}
