import { api } from '@/lib/utils/apiUtils'
import { UserInfo, UserUpdateRequest } from '@/types/user/user'

export interface UserResponse {
  success: boolean
  code?: string
  message?: string
  request?: string
  data?: UserInfo
}

export const userApi = {
  /** 내 정보 조회 */
  getMe: () => api.get<UserResponse>('/api/v1/users/me', { cache: 'no-store' }),

  /** 내 정보 수정 */
  updateMe: (data: UserUpdateRequest) => api.patch<UserInfo>('/api/v1/users/me', data),

  /** 회원 탈퇴 */
  deleteMe: () => api.delete('/api/v1/users/me'),
}
