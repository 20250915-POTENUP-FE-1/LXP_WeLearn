import { SetAuthCookies } from '@/types/cookie'
import { cookies } from 'next/headers'

export async function setAuthCookies({ accessToken, refreshToken }: SetAuthCookies) {
  const cookieStore = await cookies()

  // Access Token
  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 30, // 30분 (예시)
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
