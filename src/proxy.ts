import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value
  const { pathname } = request.nextUrl

  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  const protectedRoutes = ['/mypage']
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))

  if (isProtected && !accessToken) {
    if (refreshToken) {
      try {
        const refreshRes = await fetch(`${baseUrl}/api/v1/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        })
        if (refreshRes.ok) {
          const refreshData = await refreshRes.json()

          const newAccessToken = refreshData.data.accessToken
          const newRefreshToken = refreshData.data.refreshToken

          const response = NextResponse.next()

          response.cookies.set('accessToken', newAccessToken, {
            httpOnly: true,
            path: '/',
          })

          response.cookies.set('refreshToken', newRefreshToken, {
            httpOnly: true,
            path: '/',
          })

          return response
        }
      } catch (err) {
        console.error('Middleware refresh failed:', err)
      }
    }

    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if ((pathname === '/signin' || pathname === '/signup') && accessToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/mypage/:path*', '/signin', '/signup'],
}
