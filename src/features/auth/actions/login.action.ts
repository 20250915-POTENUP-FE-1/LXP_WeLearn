'use server'

import { ActionState } from '@/types/action/action';
import { authApi } from '@/services/auth/auth.service';
import { userApi } from '@/services/mypage/user.service';
import { UserInfo } from '@/types/user/user';
import { validateLogin } from '@/features/auth/schemas/login.schema';

export const LoginAction = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState<UserInfo>> => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const rawData = Object.fromEntries(formData)
  const inputs = Object.fromEntries(Object.entries(rawData).map(([key, value]) => (
    [key, value as string]
  )))

  const validation = validateLogin(email, password)
  if(!validation.isValid){
    return{
      errors: validation.errors,
      success: false,
      inputs: inputs,
    }
  }

  const payload = { email, password }

  try {
    await authApi.login(payload)
    const user = await userApi.getMe()
    return {
      success: true,
      data: user.data,
    }
  } catch (error:any) {
    console.log(error)
    const errorMessage = error.code || null
    const errorCode = error.message || error.msg || '알 수 없는 에러'

    switch (errorCode) {
      case 'USER_400':
        return {
          success: false,
          message: errorMessage,
          inputs: inputs
        }
      case 'USER_404':
        return {
          success: false,
          message: errorMessage,
          inputs: inputs
        }
    }
    return {
      success: false,
      message: error instanceof Error ? error.message : '알수없는 오류 발생',
    }
  }
}