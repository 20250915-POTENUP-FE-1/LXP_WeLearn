export default function Header() {
  return (
    <header className="header sticky top-0 z-50 w-full flex-none border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* <!-- Logo Section --> */}
          <div className="flex shrink-0 items-center">
            <button
              // onClick={() => handleNavi('/lectures')}
              className="flex items-center space-x-2"
              aria-label="홈으로 이동"
            >
              {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900">
                <span className="text-lg font-bold text-white">L</span>
              </div> */}
              {/* <span className="hidden text-xl font-bold text-gray-900 sm:block">LXP</span> */}
              <div className="w-36">
                <img src="/logo_welearn.svg" alt="welearn" />
              </div>
            </button>
          </div>

          {/* <!-- Navigation & Auth Section --> */}
          <div className="flex shrink-0 items-center space-x-4">
            <div className="hidden items-center space-x-3 md:flex">
              {/*{initializing ? (
                <>
                  <SkeletonButton className="h-5 w-16 rounded" />
                  <SkeletonButton className="h-9 w-20 rounded-lg" />
                </>
              ) : user ? (
                <>
                  <button
                    onClick={() => handleNavi('/mypage')}
                    className="rounded-lg bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-gray-900 transition-colors duration-150 hover:bg-gray-200"
                  >
                    마이페이지
                  </button>
                  <button
                    onClick={handleLogout}
                    className="rounded-lg bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-gray-900 transition-colors duration-150 hover:bg-gray-200"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavi(`/login`)}
                    className="rounded-lg bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-gray-900 transition-colors duration-150 hover:bg-gray-200"
                  >
                    로그인
                  </button>
                  <button
                    onClick={() => handleNavi(`/signup`)}
                    className="rounded-lg bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-gray-900 transition-colors duration-150 hover:bg-gray-200"
                  >
                    회원가입
                  </button>
                </>*/}
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
