export default function SavedShortsPage() {
  return (
    <div className="h-full w-full px-4 py-8">
      {/* ==================== Page Header (플레이리스트 제목 + 수정 버튼) ==================== */}
      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-2xl font-bold text-gray-900">Spring Boot 시작하기</h1>
        <button className="rounded bg-yellow-400 px-3 py-1 text-sm text-black transition-colors hover:bg-yellow-500">
          수정
        </button>
      </div>

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
              <div className="absolute right-0 bottom-16 left-0 bg-gradient-to-t from-black/80 to-transparent p-4">
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

        {/* ==================== Right Section - Playlist Shorts List ==================== */}
        <div className="order-2 flex-1 lg:order-2">
          {/* ==================== List Header (총 갯수) ==================== */}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">총 28개</span>
          </div>

          {/* ==================== Playlist Shorts List (드래그 가능) ==================== */}
          <div className="space-y-3">
            {/* ==================== Playlist Shorts Card 1 ==================== */}
            <div className="group flex cursor-pointer gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md">
              {/* 드래그 핸들 */}
              <div className="flex w-6 flex-shrink-0 cursor-grab items-center justify-center active:cursor-grabbing">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400 group-hover:text-gray-600"
                >
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </div>
              {/* 썸네일 */}
              <div className="relative h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-32 sm:w-24">
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
              </div>
              {/* 콘텐츠 */}
              <div className="flex min-w-0 flex-1 flex-col py-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 line-clamp-2 text-sm font-medium text-gray-900">
                      shortsTitle
                    </h3>
                    <p className="text-xs text-gray-500">nickName</p>
                    <p className="text-xs text-gray-400">createdAt</p>
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
              </div>
            </div>

            {/* ==================== Playlist Shorts Card 2 ==================== */}
            <div className="group flex cursor-pointer gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md">
              <div className="flex w-6 flex-shrink-0 cursor-grab items-center justify-center active:cursor-grabbing">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400 group-hover:text-gray-600"
                >
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </div>
              <div className="relative h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-32 sm:w-24">
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
              </div>
              <div className="flex min-w-0 flex-1 flex-col py-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 line-clamp-2 text-sm font-medium text-gray-900">
                      Spring Boot란 무엇인가요?
                    </h3>
                    <p className="text-xs text-gray-500">윤개발</p>
                    <p className="text-xs text-gray-400">3개월 전</p>
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

            {/* ==================== Playlist Shorts Card 3 ==================== */}
            <div className="group flex cursor-pointer gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md">
              <div className="flex w-6 flex-shrink-0 cursor-grab items-center justify-center active:cursor-grabbing">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400 group-hover:text-gray-600"
                >
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </div>
              <div className="relative h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-32 sm:w-24">
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
              </div>
              <div className="flex min-w-0 flex-1 flex-col py-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 line-clamp-2 text-sm font-medium text-gray-900">
                      Spring vs Spring Boot, 무엇이 다른가요
                    </h3>
                    <p className="text-xs text-gray-500">조코딩</p>
                    <p className="text-xs text-gray-400">5개월 전</p>
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

            {/* ==================== Playlist Shorts Card 4 ==================== */}
            <div className="group flex cursor-pointer gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md">
              <div className="flex w-6 flex-shrink-0 cursor-grab items-center justify-center active:cursor-grabbing">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400 group-hover:text-gray-600"
                >
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </div>
              <div className="relative h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-32 sm:w-24">
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
              </div>
              <div className="flex min-w-0 flex-1 flex-col py-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 line-clamp-2 text-sm font-medium text-gray-900">
                      IntelliJ로 Spring Boot 프로젝트 시작하기
                    </h3>
                    <p className="text-xs text-gray-500">김개발자</p>
                    <p className="text-xs text-gray-400">6개월 전</p>
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

            {/* ==================== Playlist Shorts Card 5 ==================== */}
            <div className="group flex cursor-pointer gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md">
              <div className="flex w-6 flex-shrink-0 cursor-grab items-center justify-center active:cursor-grabbing">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400 group-hover:text-gray-600"
                >
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </div>
              <div className="relative h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-32 sm:w-24">
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
              </div>
              <div className="flex min-w-0 flex-1 flex-col py-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 line-clamp-2 text-sm font-medium text-gray-900">
                      Spring Initializr 제대로 사용하는 방법
                    </h3>
                    <p className="text-xs text-gray-500">프론트만로해</p>
                    <p className="text-xs text-gray-400">7개월 전</p>
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
      <div className="absolute bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[180px] z-30">
        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          공유
        </button>
        <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          저장한 숏츠에서 삭제
        </button>
      </div>
      */}
    </div>
  )
}
