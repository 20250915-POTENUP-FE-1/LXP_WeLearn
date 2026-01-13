'use server'

import { userApi, type UserResponse } from '@/services/mypage/user.service'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

interface UserUpdateRequest {
  nickname: string
  profileUrl?: string
  name?: string
}

// 액션 응답 타입
export type ActionState<T = unknown> = {
  success: boolean
  message?: string
  data?: T
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

  // 유효성 검사
  if (!nickname || nickname.trim().length < 2) {
    return {
      success: false,
      message: '닉네임은 2자 이상이어야 합니다.',
    }
  }

  const payload: UserUpdateRequest = {
    nickname: nickname.trim(),
    profileUrl: profileUrl || undefined,
  }

  try {
    const user = await userApi.updateMe(payload)

    revalidatePath('/mypage') // 캐시 무효화

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

    // 탈퇴 후 리다이렉트
    redirect('/')
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '회원 탈퇴 실패',
    }
  }
}
