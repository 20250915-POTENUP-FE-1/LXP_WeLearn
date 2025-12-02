export default function Header() {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href="/lectures" className="flex items-center" aria-label="홈으로 이동">
              <span className="text-2xl font-bold tracking-tight text-gray-900">welearn</span>
            </a>
          </div>

          {/* Auth Section - 비로그인 상태 */}
          <div className="flex items-center space-x-3">
            <a
              href="/login"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              로그인
            </a>
            <a
              href="/signup"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              회원가입
            </a>
          </div>
        </div>
      </div>
    </header>

    /*
    로그인 상태
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <a href="/lectures" className="flex items-center" aria-label="홈으로 이동">
                <span className="text-2xl font-bold tracking-tight text-gray-900">welearn</span>
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href="/mypage"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                마이페이지
              </a>
              <button
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                aria-label="로그아웃"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>
    */
  )
}
