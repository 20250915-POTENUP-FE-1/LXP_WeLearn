'use client'
import Link from 'next/link'
import HeaderDropdown from './HeaderDropdown'
import { useEffect, useState } from 'react'
import { GetUserInfoAction } from '@/features/auth/action'
import { UserInfo } from '@/types/user/user'

interface HeaderRightSectionProps {
  isLogined: boolean
}

export default function HeaderRightSection({ isLogined }: HeaderRightSectionProps) {
  const [userData, setUserData] = useState<UserInfo | null>(null)

  useEffect(() => {
    if (!isLogined) {
      setUserData(null)
      localStorage.removeItem('user')
      return
    }

    const fetchUser = async () => {
      // 1️⃣ 먼저 localStorage 확인
      const cached = localStorage.getItem('user')
      if (cached) {
        setUserData(JSON.parse(cached))
        return
      }

      // 2️⃣ 없으면 서버 Action 호출
      const result = await GetUserInfoAction({ success: false })

      if (result.success && result.data) {
        setUserData(result.data)
        localStorage.setItem('user', JSON.stringify(result.data))
      }
    }

    fetchUser()
  }, [isLogined])

  return (
    <div className="flex items-center gap-1 md:gap-3">
      {isLogined ? (
        <HeaderDropdown user={userData} />
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
