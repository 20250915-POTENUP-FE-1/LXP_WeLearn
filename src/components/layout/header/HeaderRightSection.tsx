'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { UserInfo } from '@/types/auth'
import HeaderDropdown from './HeaderDropdown'

interface HeaderRightSectionProps {
  isLogined: boolean
}

export default function HeaderRightSection({ isLogined }: HeaderRightSectionProps) {
  const [user, setUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    const user = (JSON.parse(localStorage.getItem('user') || 'null') as UserInfo) || null
    if (user) setUser(user)
  }, [])

  return (
    <div className="flex gap-3">
      {isLogined && user ? (
        <HeaderDropdown user={user} />
      ) : (
        <div className="flex w-30 justify-end gap-3">
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
