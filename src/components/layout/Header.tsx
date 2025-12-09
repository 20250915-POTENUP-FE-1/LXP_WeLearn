import { cookies } from 'next/headers'
import Link from 'next/link'
import HeaderRightSection from './HeaderRightSection'
import { Search } from 'lucide-react'

export const Header = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  const isLogined = !!token

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="홈으로 이동">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">WeLearn</span>
          </Link>

          {/* Search Bar */}
          <div className="max-w-xl flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 pr-12 text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none"
                aria-label="강의 검색"
              />
              <button
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="검색"
              >
                <Search />
              </button>
            </div>
          </div>

          {/* Right Section */}
          <HeaderRightSection isLogined={isLogined} />
        </div>
      </div>
    </header>
  )
}
