'use server'

import { ActionState } from '@/types/action/action';
import { authApi } from '@/services/auth/auth.service';

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