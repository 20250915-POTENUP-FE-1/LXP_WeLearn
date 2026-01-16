import Link from 'next/link'
import { UserInfo } from '@/types/auth'
import HeaderDropdown from './HeaderDropdown'

interface HeaderRightSectionProps {
  isLogined: boolean
  userData?: UserInfo | null
}

export default function HeaderRightSection({ isLogined, userData }: HeaderRightSectionProps) {
  return (
    <div className="flex gap-3">
      {userData && isLogined ? (
        <HeaderDropdown user={userData} />
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
