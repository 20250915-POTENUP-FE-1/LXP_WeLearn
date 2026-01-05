import api from '@/lib/utils/apiUtils'
import type { components } from '@/types/api-schema'

// API 응답 타입
type UserResponse = components['schemas']['UserResponse']

interface UserUpdateRequest {
  nickname: string
  profileUrl?: string
  name?: string
}

const apiClient = api()

export const userApi = {
  /**
   * 내 정보 조회
   * GET /api/v1/users/me
   */
  getMe: async (): Promise<UserResponse> => {
    const response = await apiClient.get('/api/v1/users/me', {
      cache: 'no-store',
    })
    return response
  },

  /**
   * 내 정보 수정
   * PATCH /api/v1/users/me
   */
  updateMe: async (data: UserUpdateRequest): Promise<UserResponse> => {
    const response = await apiClient.patch('/api/v1/users/me', data)
    return response
  },

  /**
   * 회원 탈퇴
   * DELETE /api/v1/users/me
   */
  deleteMe: async (): Promise<boolean> => {
    await apiClient.delete('/api/v1/users/me')
    return true
  },
}
