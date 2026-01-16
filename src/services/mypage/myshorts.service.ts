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
  getMyShorts: async (params: PaginationParams = {}): Promise<PageShortsResponse> => {
    const { page = 0, size = 20 } = params
    console.log('[getMyShorts] 요청 파라미터:', { page, size })
    try {
      const res = await api.get<PageShortsResponse>('/api/v1/shorts/me', {
        cache: 'no-cache',
        params: { page, size },
      })
      console.log('[getMyShorts] 응답 성공:', {
        contentLength: res?.content?.length ?? 0,
        totalElements: res?.totalElements ?? 0,
        rawResponse: res,
      })
      return res
    } catch (error) {
      return { content: [], totalElements: 0 }
    }
  },

  // getMyShorts: async (params: PaginationParams = {}): Promise<PageShortsResponse> => {
  //   const response = await api.get<PageShortsResponse>('/api/v1/users/me/shorts', { params })
  //   return response
  // },

  // /** 숏츠 상세 조회 */
  // getShorts: async (shortsId: number): Promise<ShortsResponse> => {
  //   const response = await api.get<ApiResponse<PageShortsResponse>>(`/api/v1/shorts/${shortsId}`)
  //   // API가 페이지네이션 응답으로 반환하므로 첫 번째 항목 추출
  //   if (response.data?.content && response.data.content.length > 0) {
  //     return response.data.content[0]
  //   }
  //   throw new Error('숏츠를 찾을 수 없습니다')
  // },

  /** 숏츠 수정 */
  // updateShorts: async (shortsId: number, data: ShortsUpdateRequest): Promise<ShortsResponse> => {
  //   const response = await api.patch<ApiResponse<ShortsResponse>>(
  //     `/api/v1/shorts/${shortsId}`,
  //     data,
  //   )
  //   if (response.data) {
  //     return response.data
  //   }
  //   throw new Error('숏츠 수정에 실패했습니다')
  // },

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
