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
    console.log(`login 에러:`,error)

    switch (error.code) {
      case 'USER_400':
        return {
          success: false,
          message: error.message,
          inputs: inputs
        }
      case 'USER_404':
        return {
          success: false,
          message: error.message,
          inputs: inputs
        }
      default:
        return {
          success: false,
          message: '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          inputs: inputs
        }
    }
  }
}