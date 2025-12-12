import api from '@/lib/utils/apiUtils'
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
    console.log('------------service-------------')
    console.log(response)
    return response
  },

  // // 로그인
  signin: async (data: SigninRequest) => {
    //const res = await fetch('http://localhost:3000/api/auth/login', {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      //cache: 'no-store', // Next.js fetch 옵션
      //credentials: 'include',
    })

    console.log('------------service-------------')
    console.log(res)

    const cookieHeader = res.headers.get('set-cookie')
    // console.log(cookieHeader)
    const cookieStore = await cookies()
    if (cookieHeader) {
      // 여러 쿠키가 한 문자열로 합쳐져 있는 경우 안전하게 분리
      const cookies = cookieHeader
        .split(/,(?=\s*\w+=)/) // 쿠키 사이 쉼표 기준으로 분리, 값 안의 쉼표는 무시
        .map((c) => c.trim())
        .filter(Boolean)

      console.log(cookies)

      cookies.forEach((c) => {
        const [cookiePart, ...attrParts] = c.split(';')
        if (!cookiePart) return

        const [name, ...valueParts] = cookiePart.split('=')
        if (!name || valueParts.length === 0) return

        const value = valueParts.join('=').trim()

        cookieStore.set({
          name: name.trim(),
          value,
          path: '/',
          httpOnly: attrParts.some((a) => a.toLowerCase().includes('httponly')),
          secure: attrParts.some((a) => a.toLowerCase().includes('secure')),
          sameSite: ((): 'lax' | 'strict' | 'none' | undefined => {
            const s = attrParts.find((a) => a.toLowerCase().includes('samesite'))
            if (!s) return undefined
            if (s.toLowerCase().includes('lax')) return 'lax'
            if (s.toLowerCase().includes('strict')) return 'strict'
            if (s.toLowerCase().includes('none')) return 'none'
            return undefined
          })(),
        })
      })
    }

    // console.log(cookieStore.toString())

    // 다른 인증이 필요한 API 에서
    // headers : {
    //   Cookie: cookieStore.toString()
    //}

    const result = await res.json()
    console.log(result)
    if (!res.ok) throw new Error(result.message || '로그인 실패')
    return result
  },
  // signin: async (data: SigninRequest) => {
  //   const response = await auth.post('/api/v1/auth/login', data, { cache: 'no-store' })
  //   console.log('------------service-------------')

  //   return response
  // },

  // 로그아웃
  logout: async () => {
    const response = await auth.post('/api/v1/auth/logout')
    console.log('------------service----------')
    console.log(response)
    return response
  },
}
