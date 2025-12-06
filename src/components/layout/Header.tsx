import Link from 'next/link'

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2" aria-label="홈으로 이동">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">WeLearn</span>
          </a>

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
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <Link
              href="/signin"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              회원가입
            </Link>
            {/* <button
              className="p-2 text-gray-600 transition-colors hover:text-gray-900"
              aria-label="장바구니"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
            <button
              className="p-2 text-gray-600 transition-colors hover:text-gray-900"
              aria-label="프로필"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button> */}
          </div>
        </div>
      </div>
    </header>
  )
}
