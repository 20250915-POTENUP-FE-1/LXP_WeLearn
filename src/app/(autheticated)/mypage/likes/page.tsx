export default function LikedShortsPage() {
  return (
    <div className="h-full w-full px-4 py-8">
      {/* ==================== Page Title ==================== */}
      <h1 className="mb-6 text-2xl font-bold text-gray-900">좋아요한 숏츠</h1>

      {/* ==================== Main Layout (모바일: 세로, PC: 가로) ==================== */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* ==================== Left Section - Fixed Preview (모바일에서 먼저 노출) ==================== */}
        <div className="order-1 w-full lg:order-1 lg:w-80 lg:flex-shrink-0">
          <div className="lg:sticky lg:top-24">
            {/* Preview Card */}
            <div className="relative mx-auto aspect-[9/16] max-w-[280px] overflow-hidden rounded-xl bg-gray-900 lg:mx-0">
              {/* 카테고리 뱃지 */}
              <span className="absolute top-3 left-3 z-10 rounded bg-green-500 px-2 py-1 text-xs text-white">
                category
              </span>

              {/* 썸네일 영역 */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                <span className="text-sm text-gray-500">Video Preview</span>
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

              {/* 재생 버튼 */}
              <button className="absolute right-4 bottom-4 left-4 z-10 flex items-center justify-center gap-2 rounded-lg bg-red-500 py-3 text-white transition-colors hover:bg-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                모두 재생
              </button>
            </div>
          </div>
        </div>

        {/* ==================== Right Section - Shorts List ==================== */}
        <div className="order-2 flex-1 lg:order-2">
          {/* ==================== List Header (총 갯수 + 정렬) ==================== */}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">총 5개</span>
            <div className="relative">
              <button className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors hover:bg-gray-50">
                최신순
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              {/* ==================== Sort Dropdown (정렬 드롭다운) - hidden 제거하여 표시 ==================== */}
              {/*
              <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[140px] z-20">
                <button className="w-full px-4 py-2 text-left text-sm text-black font-medium hover:bg-gray-100">좋아요 누른 날짜 / 시간 순</button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-100">최신 순</button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-100">인기 순</button>
              </div>
              */}
            </div>
          </div>

          {/* ==================== Shorts List ==================== */}
          <div className="space-y-4">
            {/* ==================== Shorts Card 1 ==================== */}
            <div className="flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
              {/* 썸네일 */}
              <div className="relative h-40 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-44 sm:w-32">
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                <span className="absolute top-2 left-2 rounded bg-green-500 px-1.5 py-0.5 text-[10px] text-white">
                  개발
                </span>
              </div>
              {/* 콘텐츠 */}
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 line-clamp-2 font-medium text-gray-900">shortsTitle</h3>
                    <p className="mb-2 text-sm text-gray-500">nickName · createdAt</p>
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
                  <span className="text-xs text-gray-400">#tag</span>
                </div>
              </div>
            </div>

            {/* ==================== Shorts Card 2 ==================== */}
            <div className="flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
              <div className="relative h-40 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-44 sm:w-32">
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                <span className="absolute top-2 left-2 rounded bg-green-500 px-1.5 py-0.5 text-[10px] text-white">
                  개발
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 line-clamp-2 font-medium text-gray-900">
                      AI 시대의 필수 지식 MCP 이 영상 하나로 끝내세요!
                    </h3>
                    <p className="mb-2 text-sm text-gray-500">윤개발 · 3개월 전</p>
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
                  <span className="text-xs text-gray-400">#AI</span>
                  <span className="text-xs text-gray-400">#mcp</span>
                </div>
              </div>
            </div>

            {/* ==================== Shorts Card 3 ==================== */}
            <div className="flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
              <div className="relative h-40 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-44 sm:w-32">
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                <span className="absolute top-2 left-2 rounded bg-green-500 px-1.5 py-0.5 text-[10px] text-white">
                  개발
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 line-clamp-2 font-medium text-gray-900">
                      파이썬 일주일 완전 정복 로드맵
                    </h3>
                    <p className="mb-2 text-sm text-gray-500">조코딩 · 5개월 전</p>
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

            {/* ==================== Shorts Card 4 ==================== */}
            <div className="flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
              <div className="relative h-40 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-44 sm:w-32">
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                <span className="absolute top-2 left-2 rounded bg-green-500 px-1.5 py-0.5 text-[10px] text-white">
                  개발
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 line-clamp-2 font-medium text-gray-900">
                      개발자가 다크 모드를 쓰는 이유
                    </h3>
                    <p className="mb-2 text-sm text-gray-500">김개발자 · 6개월 전</p>
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

            {/* ==================== Shorts Card 5 ==================== */}
            <div className="flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
              <div className="relative h-40 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-44 sm:w-32">
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                <span className="absolute top-2 left-2 rounded bg-green-500 px-1.5 py-0.5 text-[10px] text-white">
                  개발
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 line-clamp-2 font-medium text-gray-900">
                      점프 투 파이썬! 파이썬의 기초
                    </h3>
                    <p className="mb-2 text-sm text-gray-500">프론트만로해 · 7개월 전</p>
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

      {/* ==================== Dropdown Menu (더보기 클릭 시) - hidden 제거하여 표시 ==================== */}
      {/*
      <div className="absolute bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[160px] z-30">
        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>
          재생목록에 저장
        </button>
        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          공유 제공
        </button>
        <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          좋아요 숏츠에서 삭제
        </button>
      </div>
      */}
    </div>
  )
}
