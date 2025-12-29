export default function MyShortsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* ==================== Main Layout (모바일: 세로, PC: 가로) ==================== */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* ==================== Left Section - Fixed Preview (모바일에서 먼저 노출) ==================== */}
        <div className="order-1 w-full lg:order-1 lg:w-80 lg:flex-shrink-0">
          <div className="lg:sticky lg:top-24">
            {/* 페이지 타이틀 */}
            <h1 className="mb-6 text-2xl font-bold text-gray-900">내가 만든 숏츠</h1>

            {/* Preview Card */}
            <div className="relative mx-auto aspect-[9/16] max-w-[280px] overflow-hidden rounded-xl bg-gray-900 lg:mx-0">
              {/* 카테고리 뱃지 */}
              <span className="absolute top-3 left-3 z-10 rounded bg-green-500 px-2 py-1 text-xs text-white">
                category
              </span>

              {/* 썸네일 영역 */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                <span className="text-sm text-gray-500">미리보기</span>
              </div>

              {/* 하단 정보 영역 */}
              <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="mb-1 font-medium text-white">shortsTitle</h3>
                <p className="mb-3 text-sm text-gray-300">description</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white">nickName</span>
                  <span className="rounded bg-white/20 px-2 py-0.5 text-xs text-white">#tag</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== Right Section - My Shorts List ==================== */}
        <div className="order-2 flex-1 lg:order-2">
          {/* ==================== 내 숏츠 만들기 버튼 ==================== */}
          <button className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 py-5 text-lg font-medium text-white transition-colors hover:bg-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            내 숏츠 만들기
          </button>

          {/* ==================== List Header (총 갯수) ==================== */}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">총 8개</span>
          </div>

          {/* ==================== My Shorts List ==================== */}
          <div className="space-y-4">
            {/* ==================== My Shorts Card 1 (비공개) ==================== */}
            <div className="flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
              {/* 썸네일 */}
              <div className="relative h-40 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-48 sm:w-36">
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                {/* 공개 상태 뱃지 */}
                <span className="absolute top-2 left-2 flex items-center gap-1 rounded bg-gray-600 px-1.5 py-0.5 text-[10px] text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  비공개
                </span>
              </div>
              {/* 콘텐츠 */}
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 line-clamp-2 font-medium text-gray-900">
                      AI 시대의 필수 지식 MCP 이 영상 하나로 끝내세요!
                    </h3>
                    <p className="mb-1 text-sm text-gray-500">윤개발</p>
                    <p className="mb-2 text-xs text-gray-400">1분 전</p>
                  </div>
                  {/* 더보기 버튼 */}
                  <button className="flex-shrink-0 rounded-full p-1 transition-colors hover:bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400"
                    >
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                </div>
                {/* 태그 */}
                <div className="mt-auto flex flex-wrap gap-1">
                  <span className="text-xs text-gray-400">#프로그래밍</span>
                  <span className="text-xs text-gray-400">#AI</span>
                  <span className="text-xs text-gray-400">#mcp</span>
                </div>
              </div>
            </div>

            {/* ==================== My Shorts Card 2 (공개) ==================== */}
            <div className="flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
              <div className="relative h-40 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-48 sm:w-36">
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                <span className="absolute top-2 left-2 flex items-center gap-1 rounded bg-green-500 px-1.5 py-0.5 text-[10px] text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  공개
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 line-clamp-2 font-medium text-gray-900">
                      파이썬 일주일 완전 정복 로드맵
                    </h3>
                    <p className="mb-1 text-sm text-gray-500">윤개발</p>
                    <p className="mb-2 text-xs text-gray-400">5개월 전</p>
                  </div>
                  <button className="flex-shrink-0 rounded-full p-1 transition-colors hover:bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400"
                    >
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                </div>
                <div className="mt-auto flex flex-wrap gap-1">
                  <span className="text-xs text-gray-400">#프로그래밍</span>
                  <span className="text-xs text-gray-400">#파이썬</span>
                  <span className="text-xs text-gray-400">#python</span>
                </div>
              </div>
            </div>

            {/* ==================== My Shorts Card 3 (공개) ==================== */}
            <div className="flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
              <div className="relative h-40 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-48 sm:w-36">
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                <span className="absolute top-2 left-2 flex items-center gap-1 rounded bg-green-500 px-1.5 py-0.5 text-[10px] text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  공개
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 line-clamp-2 font-medium text-gray-900">
                      개발자가 다크 모드를 쓰는 이유
                    </h3>
                    <p className="mb-1 text-sm text-gray-500">윤개발</p>
                    <p className="mb-2 text-xs text-gray-400">6개월 전</p>
                  </div>
                  <button className="flex-shrink-0 rounded-full p-1 transition-colors hover:bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400"
                    >
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                </div>
                <div className="mt-auto flex flex-wrap gap-1">
                  <span className="text-xs text-gray-400">#개발자</span>
                  <span className="text-xs text-gray-400">#develop</span>
                  <span className="text-xs text-gray-400">#darkmode</span>
                </div>
              </div>
            </div>

            {/* ==================== My Shorts Card 4 (공개) ==================== */}
            <div className="flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
              <div className="relative h-40 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-48 sm:w-36">
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                <span className="absolute top-2 left-2 flex items-center gap-1 rounded bg-green-500 px-1.5 py-0.5 text-[10px] text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  공개
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 line-clamp-2 font-medium text-gray-900">
                      점프 투 파이썬! 파이썬의 기초
                    </h3>
                    <p className="mb-1 text-sm text-gray-500">윤개발</p>
                    <p className="mb-2 text-xs text-gray-400">7개월 전</p>
                  </div>
                  <button className="flex-shrink-0 rounded-full p-1 transition-colors hover:bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400"
                    >
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                </div>
                <div className="mt-auto flex flex-wrap gap-1">
                  <span className="text-xs text-gray-400">#프로그래밍</span>
                  <span className="text-xs text-gray-400">#파이썬</span>
                  <span className="text-xs text-gray-400">#python</span>
                  <span className="text-xs text-gray-400">#백엔드</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== Dropdown Menu - 공개 상태 (더보기 클릭 시) ==================== */}
      {/*
      <div className="absolute bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[140px] z-30">
        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          비공개하기
        </button>
        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          수정
        </button>
        <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          삭제
        </button>
      </div>
      */}

      {/* ==================== Dropdown Menu - 비공개 상태 (더보기 클릭 시) ==================== */}
      {/*
      <div className="absolute bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[140px] z-30">
        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          공개하기
        </button>
        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          수정
        </button>
        <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          삭제
        </button>
      </div>
      */}
    </div>
  )
}
