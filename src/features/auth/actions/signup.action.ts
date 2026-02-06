'use server'

import { ActionState } from '@/types/action/action';
import { authApi } from '@/services/auth/auth.service';
import { validateSignup } from '@/features/auth/schemas/signup.schema';

export const SignupAction = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {

  const rawData = Object.fromEntries(formData) // {nickname:'',email:'',password:''}
  const payload = {
    nickname: rawData.nickname as string,
    email: rawData.email as string,
    password: rawData.password as string,
    confirmPassword: rawData.confirmPassword as string
  }
  const validation = validateSignup(payload)

  if(!validation.isValid){
    return {
      success:false,
      errors:validation.errors,
      inputs:payload
    }
  }

  try {
    await authApi.signup(payload)
  } catch (error:any) {
    console.log('throw error',error )
    const errorCode = error.message || error.msg || '알수없는 오류 발생';
    const errorMessage = error.code || null;

    switch (errorCode) {
      case 'COMMON_400':
        return{
          success:false,
          code: errorMessage || "이메일을 기입해주세요."
        }

      case 'USER_409':
        return {
          success:false,
          code: errorMessage || "이미 사용중인 이메일입니다."
        }

      default:
        return{
          success:false,
          code:"알 수 없는 오류가 발생했습니다."
        }
    }
  }

  return {
    success: true,
  }
}
