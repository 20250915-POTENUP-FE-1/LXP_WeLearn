'use server'

import { authApi } from '@/services/auth/auth.service'
import { UserInfo } from '@/types/auth'

type ActionState = {
  success: boolean
  message?: string
  errors?: Record<string, string>
  user?: UserInfo
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
): Promise<ActionState> => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const payload = { email, password }

  let response

  try {
    response = await authApi.signin(payload)

    return {
      success: true,
      user: response.data.user,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '알수없는 오류 발생',
    }
  }
}

export const LogoutAction = async (prevState: ActionState) => {
  try {
    await authApi.logout()
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '알수없는 오류 발생',
    }
  }
  return { success: true }
}
