'use server'

import { authApi } from '@/services/auth/auth.service'
import { UserInfo } from '@/types/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

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

    const cookieStore = await cookies()

    cookieStore.set('accessToken', response.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60,
      path: '/',
    })

    cookieStore.set('refreshToken', response.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    })

    return {
      success: true,
      user: response.user,
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

  const cookieStore = await cookies()
  cookieStore.delete('accessToken')
  cookieStore.delete('refreshToken')

  return { success: true }
}
