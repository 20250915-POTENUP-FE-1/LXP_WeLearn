'use server'

import { authApi } from '@/services/auth/auth.service'
import { redirect } from 'next/navigation'

type ActionState = {
  success: boolean
  message?: string
  errors?: Record<string, string>
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
      message: error instanceof Error ? error.message : 'Unknow error',
    }
  }

  redirect('/signin')
}
