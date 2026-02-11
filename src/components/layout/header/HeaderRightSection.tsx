'use client'
import Link from 'next/link'
import HeaderDropdown from './HeaderDropdown'
import { useAuth } from '@/shared/store/auth/auth.store'

export default function HeaderRightSection() {
  const userData = useAuth((state) => state.auth)
  const isLogined = useAuth((state) => state.isLogin)

  return (
    <div className="flex items-center gap-1 md:gap-3">
      {isLogined && userData ? (
        <HeaderDropdown />
      ) : (
        <div className="flex gap-3">
          <Link
            href="/signin"
            className="shrink-0 rounded-lg p-0 text-sm font-medium text-gray-700 transition-colors hover:font-extrabold hover:text-gray-900 md:px-2 md:py-1"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="shrink-0 rounded-lg p-0 text-sm font-medium text-gray-700 transition-colors hover:font-extrabold hover:text-gray-900 md:px-2 md:py-1"
          >
            회원가입
          </Link>
        </div>
      )}
    </div>
  )
}
