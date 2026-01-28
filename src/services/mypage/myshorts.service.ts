import { api } from '@/lib/utils/apiUtils'
import { ApiResponse } from '@/types/api/api'
import { PageRequest, PageResponse, ShortsBase, ShortsRequest } from '@/types/shorts/shorts'

export const myShortsApi = {
  /** 내 숏츠 목록 조회 */
  getMyShorts: async ({ page = 0, size = 20 }: PageRequest = {}): Promise<
    PageResponse<ShortsBase[]>
  > => {
    const res = await api.get<ApiResponse<PageResponse<ShortsBase[]>>>(
      `/api/v1/shorts/me?page=${page}&size=${size}`,
      {
        cache: 'no-cache',
      },
    )
    return res.data
  },

  /** 숏츠 상세 조회 */
  getShorts: async (shortsId: number): Promise<ShortsBase> => {
    const response = await api.get<ApiResponse<ShortsBase>>(`/api/v1/shorts/${shortsId}`)
    if (response.data) {
      return response.data
    }
    throw new Error('숏츠를 찾을 수 없습니다')
  },

  /** 숏츠 수정 */
  updateShorts: async (
    shortsId: number,
    data: Partial<ShortsRequest>,
  ): Promise<ApiResponse<ShortsBase>> => {
    const response = await api.patch<ApiResponse<ShortsBase>>(`/api/v1/shorts/${shortsId}`, {
      body: data,
    })
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
