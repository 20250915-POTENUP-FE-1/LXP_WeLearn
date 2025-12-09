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

  let data
  try {
    data = await authApi.signup(payload)
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

  let data

  try {
    data = await authApi.signin(payload)
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '알수없는 오류 발생',
    }
  }

  const cookieStore = await cookies()

  cookieStore.set('accessToken', data.accessToken, {
    httpOnly: true,
    maxAge: 60 * 60,
    path: '/',
  })

  cookieStore.set('refreshToken', data.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })

  return {
    success: true,
    user: data.user,
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

  return { success: true }
}
