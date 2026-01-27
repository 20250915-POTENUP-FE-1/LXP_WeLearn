'use server'

import { authApi } from '@/services/auth/auth.service'
import { userApi } from '@/services/mypage/user.service'
import { ActionState } from '@/types/action/action'
import { UserInfo } from '@/types/user/user'

export const GetUserInfoAction = async (prevState: ActionState): Promise<ActionState<UserInfo>> => {
  try {
    const userData = await userApi.getMe()
    return { success: true, data: userData.data }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '유저 정보 조회 실패',
    }
  }
}

export const SignupAction = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string
  const nickname = formData.get('nickname') as string
  const profileUrl = formData.get('profileUrl') as string

  const payload = { email, password, name, nickname, profileUrl }

  let response
  try {
    response = await authApi.signup(payload)
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '알수없는 오류 발생',
    }
  }

  return {
    success: true,
  }
}

export const SigninAction = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState<UserInfo>> => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const payload = { email, password }

  try {
    await authApi.signin(payload)

    const user = await userApi.getMe()
    return {
      success: true,
      data: user.data,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '알수없는 오류 발생',
    }
  }
}

export const LogoutAction = async (prevState: ActionState): Promise<ActionState> => {
  try {
    await authApi.logout()
    return {
      success: true,
      message: '성공',
    }
  } catch (error) {
    console.log('LogoutAction 실패', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : '알수없는 오류 발생',
    }
  }
}
