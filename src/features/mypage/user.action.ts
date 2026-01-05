'use server'

import { userApi } from '@/services/mypage/user.service'
import type { components } from '@/types/api-schema'

type UserResponse = components['schemas']['UserResponse']

interface UserUpdateRequest {
  nickname: string
  profileUrl?: string
  name?: string
}

// 액션 응답 타입
type ActionState<T = unknown> = {
  success: boolean
  message?: string
  data?: T
}

/**
 * 내 정보 조회 액션
 */
export async function getMeAction(): Promise<ActionState<UserResponse>> {
  try {
    const user = await userApi.getMe()

    return {
      success: true,
      data: user,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '사용자 정보 조회 실패',
    }
  }
}

/**
 * 내 정보 수정 액션
 */
export async function updateMeAction(
  prevState: ActionState<UserResponse>,
  formData: FormData,
): Promise<ActionState<UserResponse>> {
  const nickname = formData.get('nickname') as string
  const profileUrl = formData.get('profileUrl') as string | null

  const payload: UserUpdateRequest = {
    nickname,
    profileUrl: profileUrl || undefined,
  }

  try {
    const user = await userApi.updateMe(payload)

    return {
      success: true,
      message: '프로필이 수정되었습니다.',
      data: user,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '프로필 수정 실패',
    }
  }
}

/**
 * 회원 탈퇴 액션
 */
export async function deleteMeAction(): Promise<ActionState> {
  try {
    await userApi.deleteMe()

    return {
      success: true,
      message: '회원 탈퇴가 완료되었습니다.',
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '회원 탈퇴 실패',
    }
  }
}
