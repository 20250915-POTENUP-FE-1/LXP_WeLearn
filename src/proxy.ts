import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value

  // 로그인 되어있어야 접근 가능한 경로
  const protectedRoutes = [''] ///mypage

  const { pathname } = request.nextUrl

  // 보호 라우트 체크
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))

  // 보호된 라우트인데 토큰 없음 → 로그인으로 리다이렉트
  // if (isProtected && !accessToken) {
  //   const loginUrl = new URL('/signin', request.url)
  //   return NextResponse.redirect(loginUrl)
  // }

  // // 로그인 상태인데 로그인 페이지 들어오면 홈으로 보내기
  // if (pathname === '/signin' && accessToken) {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }

  // if (pathname === '/signup' && accessToken) {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ['/mypage/:path*', '/signin', '/signup'],
}
