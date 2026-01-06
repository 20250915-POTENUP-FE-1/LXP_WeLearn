import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value
  const { pathname } = request.nextUrl

  const protectedRoutes = ['/mypage']
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))

  // 보호 라우트인데 로그인 안됨 → 로그인 페이지
  if (isProtected && !accessToken) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  // 로그인 상태인데 로그인/회원가입 페이지 접근 → 홈으로
  if ((pathname === '/signin' || pathname === '/signup') && accessToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/mypage/:path*', '/signin', '/signup'],
}
