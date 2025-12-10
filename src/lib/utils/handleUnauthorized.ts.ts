'use server'
import { authApi } from '@/services/auth/auth.service'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const handleUnauthorized = async () => {
  try {
    await authApi.logout()
  } catch (error) {
    console.warn(error)
  }

  try {
    const cookieStore = await cookies()
    cookieStore.delete('accessToken')
    cookieStore.delete('refreshToken')
  } catch (error) {
    console.error(error)
  }

  redirect('/signin') // redirect는 서버 컴포넌트에서 가능
}
