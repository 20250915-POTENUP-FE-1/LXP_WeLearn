import { api } from '@/lib/utils/apiUtils'
import { parseSetCookie } from '@/lib/utils/parseSetCookie'
import { setAuthCookies } from '@/lib/utils/setAuthCookies'
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

/**
 * 쿠키 헤더를 파싱하여 현재 요청의 cookieStore에 적용하는 헬퍼 함수
 */
async function applySetCookie(response: Response) {
  const cookieHeader = response.headers.get('set-cookie')
  if (cookieHeader) {
    const cookieStore = await cookies()
    const parsedCookies = parseSetCookie(cookieHeader)
    parsedCookies.forEach((cookie) => {
      // Next.js Server Action/Route Handler 환경에서 쿠키 설정
      cookieStore.set(cookie)
    })
  }
}

export const authApi = {
  /**
   * 회원가입
   */
  signup: async (data: SignupRequest) => {
    // 일반적인 POST 요청 (데이터만 반환)
    return api.post('/api/v1/users', data, { cache: 'no-store' })
  },

  /**
   * 로그인
   * 백엔드가 Set-Cookie로 토큰을 준다면 response 헤더를 직접 핸들링해야 함
   */
  signin: async (data: SigninRequest) => {
    // apiUtils에서 Response 원본을 받기 위해 필요한 경우 처리
    // 여기서는 api.post가 내부에서 res.json()을 리턴하므로,
    // 만약 헤더 접근이 필요하다면 apiUtils의 post가 Response를 반환하도록 유지해야 합니다.
    const res = await api.post<Response>('/api/v1/auth/login', data, { cache: 'no-store' })
    // 1. 쿠키 적용
    const { accessToken, refreshToken } = res.data

    setAuthCookies({ accessToken, refreshToken })
    // 2. 바디 파싱 및 에러 체크

    return res
  },

  /**
   * 로그아웃
   */
  logout: async () => {
    try {
      const res = await api.post<Response>('/api/v1/auth/logout')

      const cookieStore = await cookies()
      cookieStore.delete('accessToken')
      cookieStore.delete('refreshToken')

      return { success: true }
    } catch (err) {
      console.error(err)
      throw err
    }
  },
}
