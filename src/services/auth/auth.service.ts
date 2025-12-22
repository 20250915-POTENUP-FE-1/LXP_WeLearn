import api from '@/lib/utils/apiUtils'
import { parseSetCookie } from '@/lib/utils/parseSetCookie'
import { cookies } from 'next/headers'

interface SignupRequest {
  email: string
  password: string
  nickname: string
  name: string
  profileUrl?: string
}

interface SigninRequest {
  email: string
  password: string
}

const auth = api()

export const authApi = {
  // 회원가입
  signup: async (data: SignupRequest) => {
    const response = await auth.post('/api/v1/auth/signup', data, { cache: 'no-store' })
    return response
  },

  // // 로그인
  signin: async (data: SigninRequest) => {
    const res = await auth.post('/api/v1/auth/login', data, { cache: 'no-store' })
    const cookieHeader = res.headers.get('set-cookie')
    const cookieStore = await cookies()
    if (cookieHeader) {
      const parsedCookie = parseSetCookie(cookieHeader)
      parsedCookie.forEach((cookie) => {
        cookieStore.set(cookie)
      })
    }

    const result = await res.json()
    if (!res.ok) throw new Error(result.message || '로그인 실패')
    return result
  },

  // 로그아웃
  logout: async () => {
    const response = await auth.post('/api/v1/auth/logout')
    const cookieHeader = response.headers.get('set-cookie')
    const cookieStore = await cookies()
    if (cookieHeader) {
      const parsedCookie = parseSetCookie(cookieHeader)
      parsedCookie.forEach((cookie) => {
        cookieStore.set(cookie)
      })
    }
    const result = await response.json()
    if (!response.ok) throw new Error(result.message || '알 수 없는 에러 발생')
    return result
  },
}
