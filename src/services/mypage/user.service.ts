import { api } from '@/lib/utils/apiUtils'

// 사용자 응답 타입
export interface UserResponse {
  userId?: number
  email?: string
  nickname?: string
  name?: string
  profileUrl?: string
  createdAt?: string
  updatedAt?: string
}

export interface UserResponseType {
  success: boolean
  code: string
  message: string
  request: string
  data: UserResponse
}

// 사용자 수정 요청 타입
interface UserUpdateRequest {
  nickname: string
  profileUrl?: string
  name?: string
}

export const userApi = {
  /** 내 정보 조회 */
  getMe: () => api.get<UserResponseType>('/api/v1/users/me', { cache: 'no-store' }),

  /** 내 정보 수정 */
  updateMe: (data: UserUpdateRequest) => api.patch<UserResponse>('/api/v1/users/me', data),

  /** 회원 탈퇴 */
  deleteMe: () => api.delete('/api/v1/users/me'),
}
