import { AuthCookies } from '@/types/cookie/cookie'
import { cookies } from 'next/headers'

export async function setAuthCookies({ accessToken, refreshToken }: AuthCookies) {
  const cookieStore = await cookies()

  // Access Token
  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })

  // Refresh Token
  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7일 (예시)
  })
}
