import api from '@/lib/utils/apiUtils'
import type { components } from '@/types/api-schema'

type UserResponse = components['schemas']['UserResponse']

const apiClient = api()

export const userApi = {
  /**
   * 내 정보 조회
   * GET /api/v1/users/me
   */
  getMe: async (): Promise<UserResponse | null> => {
    try {
      const response = await apiClient.get('/api/v1/users/me', {
        cache: 'no-store',
      })
      return response
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error)
      return null
    }
  },
}
