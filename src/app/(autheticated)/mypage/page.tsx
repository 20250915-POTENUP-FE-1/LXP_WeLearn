export default function MyPageDashboard() {
  return (
    <div className="h-full w-full">
      {/* ==================== Main Content ==================== */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* ==================== User Profile Section ==================== */}
        <section className="mb-10 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">userName</h1>
            <p className="text-sm text-gray-500">userEmail</p>
          </div>
        </section>

        {/* ==================== Liked Shorts Section (좋아요한 숏츠) ==================== */}
        <section className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">shortsLikedList</h2>
            <div className="flex items-center gap-2">
              <button className="rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors hover:bg-gray-50">
                전체보기
              </button>
              {/* 좌우 슬라이드 버튼 */}
              <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-50">
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
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-50">
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
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* 좋아요 숏츠 가로 스크롤 리스트 */}
          <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
            {/* Liked Shorts Card 1 */}
            <div className="w-56 flex-shrink-0">
              <div className="relative mb-2 aspect-9/16 overflow-hidden rounded-lg bg-gray-200">
                {/* 카테고리 뱃지 */}
                <span className="absolute top-2 left-2 rounded bg-green-500 px-2 py-0.5 text-xs text-white">
                  개발
                </span>
                {/* 썸네일 */}
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                {/* 하단 프로그레스 바 */}
                <div className="absolute right-0 bottom-0 left-0 h-1 bg-gray-300">
                  <div className="h-full w-3/4 bg-red-500"></div>
                </div>
              </div>
              <p className="truncate text-sm font-medium text-gray-900">shortsTitle</p>
              <p className="truncate text-xs text-gray-500">채널명</p>
            </div>

            {/* Liked Shorts Card 2 */}
            <div className="w-56 flex-shrink-0">
              <div className="relative mb-2 aspect-9/16 overflow-hidden rounded-lg bg-gray-200">
                <span className="absolute top-2 left-2 rounded bg-green-500 px-2 py-0.5 text-xs text-white">
                  개발
                </span>
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                <div className="absolute right-0 bottom-0 left-0 h-1 bg-gray-300">
                  <div className="h-full w-1/2 bg-red-500"></div>
                </div>
              </div>
              <p className="truncate text-sm font-medium text-gray-900">shortsTitle</p>
              <p className="truncate text-xs text-gray-500">채널명</p>
            </div>

            {/* Liked Shorts Card 3 */}
            <div className="w-56 flex-shrink-0">
              <div className="relative mb-2 aspect-9/16 overflow-hidden rounded-lg bg-gray-200">
                <span className="absolute top-2 left-2 rounded bg-orange-500 px-2 py-0.5 text-xs text-white">
                  비즈니스
                </span>
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                <div className="absolute right-0 bottom-0 left-0 h-1 bg-gray-300">
                  <div className="h-full w-full bg-red-500"></div>
                </div>
              </div>
              <p className="truncate text-sm font-medium text-gray-900">shortsTitle</p>
              <p className="truncate text-xs text-gray-500">채널명</p>
            </div>

            {/* Liked Shorts Card 4 */}
            <div className="w-56 flex-shrink-0">
              <div className="relative mb-2 aspect-9/16 overflow-hidden rounded-lg bg-gray-200">
                <span className="absolute top-2 left-2 rounded bg-orange-500 px-2 py-0.5 text-xs text-white">
                  비즈니스
                </span>
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                <div className="absolute right-0 bottom-0 left-0 h-1 bg-gray-300">
                  <div className="h-full w-1/4 bg-red-500"></div>
                </div>
              </div>
              <p className="truncate text-sm font-medium text-gray-900">shortsTitle</p>
              <p className="truncate text-xs text-gray-500">채널명</p>
            </div>

            {/* Liked Shorts Card 5 */}
            <div className="w-56 flex-shrink-0">
              <div className="relative mb-2 aspect-9/16 overflow-hidden rounded-lg bg-gray-200">
                <span className="absolute top-2 left-2 rounded bg-green-500 px-2 py-0.5 text-xs text-white">
                  개발
                </span>
                {/* 최신순 뱃지 */}
                <span className="absolute top-2 right-2 rounded bg-black px-2 py-0.5 text-xs text-white">
                  최신순
                </span>
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                <div className="absolute right-0 bottom-0 left-0 h-1 bg-gray-300">
                  <div className="h-full w-0 bg-red-500"></div>
                </div>
              </div>
              <p className="truncate text-sm font-medium text-gray-900">shortsTitle</p>
              <p className="truncate text-xs text-gray-500">채널명</p>
            </div>
          </div>
        </section>

        {/* ==================== Saved Shorts Section (저장한 플레이리스트) ==================== */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">shortsSavedList</h2>
          </div>

          {/* 플레이리스트 그리드 */}
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {/* Playlist Card 1 */}
            <div className="group cursor-pointer">
              <div className="relative mb-2 aspect-9/16 overflow-hidden rounded-lg bg-gray-200">
                {/* 공개/비공개 뱃지 */}
                <span className="absolute top-2 left-2 rounded bg-gray-800 px-2 py-0.5 text-xs text-white">
                  비공개
                </span>
                {/* 숏츠 갯수 */}
                <span className="absolute top-2 right-2 flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  12
                </span>
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                {/* 하단 프로그레스 바 */}
                <div className="absolute right-0 bottom-0 left-0 h-1 bg-gray-300">
                  <div className="h-full w-2/3 bg-green-500"></div>
                </div>
              </div>
              <p className="truncate text-sm font-medium text-gray-900 group-hover:text-black">
                savedListTitle
              </p>
              <p className="text-xs text-gray-500">개발 · 12개</p>
            </div>

            {/* Playlist Card 2 */}
            <div className="group cursor-pointer">
              <div className="relative mb-2 aspect-9/16 overflow-hidden rounded-lg bg-gray-200">
                <span className="absolute top-2 left-2 rounded bg-green-500 px-2 py-0.5 text-xs text-white">
                  공개
                </span>
                <span className="absolute top-2 right-2 flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  8
                </span>
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                <div className="absolute right-0 bottom-0 left-0 h-1 bg-gray-300">
                  <div className="h-full w-1/2 bg-green-500"></div>
                </div>
              </div>
              <p className="truncate text-sm font-medium text-gray-900 group-hover:text-black">
                숏츠로 완성하는 개발 학습 지도
              </p>
              <p className="text-xs text-gray-500">개발 · 8개</p>
            </div>

            {/* Playlist Card 3 */}
            <div className="group cursor-pointer">
              <div className="relative mb-2 aspect-9/16 overflow-hidden rounded-lg bg-gray-200">
                <span className="absolute top-2 left-2 rounded bg-orange-500 px-2 py-0.5 text-xs text-white">
                  공개
                </span>
                <span className="absolute top-2 right-2 flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  5
                </span>
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                <div className="absolute right-0 bottom-0 left-0 h-1 bg-gray-300">
                  <div className="h-full w-full bg-green-500"></div>
                </div>
              </div>
              <p className="truncate text-sm font-medium text-gray-900 group-hover:text-black">
                개념부터 실전까지 파이썬 모음
              </p>
              <p className="text-xs text-gray-500">비즈니스 · 5개</p>
            </div>

            {/* Playlist Card 4 */}
            <div className="group cursor-pointer">
              <div className="relative mb-2 aspect-9/16 overflow-hidden rounded-lg bg-gray-200">
                <span className="absolute top-2 left-2 rounded bg-green-500 px-2 py-0.5 text-xs text-white">
                  공개
                </span>
                <span className="absolute top-2 right-2 flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  15
                </span>
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                <div className="absolute right-0 bottom-0 left-0 h-1 bg-gray-300">
                  <div className="h-full w-1/4 bg-green-500"></div>
                </div>
              </div>
              <p className="truncate text-sm font-medium text-gray-900 group-hover:text-black">
                15일 완전 정복 기능별 html
              </p>
              <p className="text-xs text-gray-500">개발 · 15개</p>
            </div>

            {/* Playlist Card 5 */}
            <div className="group cursor-pointer">
              <div className="relative mb-2 aspect-9/16 overflow-hidden rounded-lg bg-gray-200">
                <span className="absolute top-2 left-2 rounded bg-green-500 px-2 py-0.5 text-xs text-white">
                  공개
                </span>
                <span className="absolute top-2 right-2 flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  7
                </span>
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                <div className="absolute right-0 bottom-0 left-0 h-1 bg-gray-300">
                  <div className="h-full w-3/4 bg-green-500"></div>
                </div>
              </div>
              <p className="truncate text-sm font-medium text-gray-900 group-hover:text-black">
                Spring Boot 시작하기
              </p>
              <p className="text-xs text-gray-500">개발 · 7개</p>
            </div>

            {/* Playlist Card 6 */}
            <div className="group cursor-pointer">
              <div className="relative mb-2 aspect-9/16 overflow-hidden rounded-lg bg-gray-200">
                <span className="absolute top-2 left-2 rounded bg-green-500 px-2 py-0.5 text-xs text-white">
                  공개
                </span>
                <span className="absolute top-2 right-2 flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  10
                </span>
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                <div className="absolute right-0 bottom-0 left-0 h-1 bg-gray-300">
                  <div className="h-full w-1/2 bg-green-500"></div>
                </div>
              </div>
              <p className="truncate text-sm font-medium text-gray-900 group-hover:text-black">
                숏츠로 완성하는 개발 직접 지도
              </p>
              <p className="text-xs text-gray-500">개발 · 10개</p>
            </div>

            {/* Playlist Card 7 */}
            <div className="group cursor-pointer">
              <div className="relative mb-2 aspect-9/16 overflow-hidden rounded-lg bg-gray-200">
                <span className="absolute top-2 left-2 rounded bg-orange-500 px-2 py-0.5 text-xs text-white">
                  공개
                </span>
                <span className="absolute top-2 right-2 flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  6
                </span>
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                <div className="absolute right-0 bottom-0 left-0 h-1 bg-gray-300">
                  <div className="h-full w-1/3 bg-green-500"></div>
                </div>
              </div>
              <p className="truncate text-sm font-medium text-gray-900 group-hover:text-black">
                개념부터 실전까지 파이썬 모음
              </p>
              <p className="text-xs text-gray-500">비즈니스 · 6개</p>
            </div>

            {/* Playlist Card 8 */}
            <div className="group cursor-pointer">
              <div className="relative mb-2 aspect-9/16 overflow-hidden rounded-lg bg-gray-200">
                <span className="absolute top-2 left-2 rounded bg-green-500 px-2 py-0.5 text-xs text-white">
                  공개
                </span>
                <span className="absolute top-2 right-2 flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  9
                </span>
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                <div className="absolute right-0 bottom-0 left-0 h-1 bg-gray-300">
                  <div className="h-full w-2/3 bg-green-500"></div>
                </div>
              </div>
              <p className="truncate text-sm font-medium text-gray-900 group-hover:text-black">
                Spring Boot 시작하기
              </p>
              <p className="text-xs text-gray-500">개발 · 9개</p>
            </div>
          </div>

          {/* ==================== Pagination ==================== */}
          <div className="flex items-center justify-center gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded bg-black text-sm text-white">
              1
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded text-sm text-gray-600 hover:bg-gray-100">
              2
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded text-sm text-gray-600 hover:bg-gray-100">
              3
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded text-sm text-gray-600 hover:bg-gray-100">
              4
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded text-sm text-gray-600 hover:bg-gray-100">
              5
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
