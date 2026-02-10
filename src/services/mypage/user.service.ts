import { api } from '@/lib/utils/apiUtils'
import { ApiResponse } from '@/types/api/api'
import { PasswordUpdateRequest, UserInfo, UserUpdateRequest } from '@/types/user/user';
import { data } from 'framer-motion/m';

export const userApi = {
  /** 내 정보 조회 */
  getMe: () => api.get<ApiResponse<UserInfo>>('/api/v1/users/me', { cache: 'no-store' }),

  /** 내 정보 변경 */
  updateMe: (data: UserUpdateRequest) => api.patch<UserInfo>('/api/v1/users/me', data),

  /** 내 비밀번호 변경 */
  updatePassword: (data: PasswordUpdateRequest)=> api.patch<ApiResponse>('/api/v1/users/me/password', data),

  /** 회원 탈퇴 */
  deleteMe: () => api.delete('/api/v1/users/me'),
}
