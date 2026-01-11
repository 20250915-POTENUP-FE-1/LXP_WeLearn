import { ChevronDown, MoreHorizontal, Play } from 'lucide-react'
import Link from 'next/link'

export default function LikedShortsPage() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* ==================== Left Section - Fixed Preview (모바일에서 먼저 노출) ==================== */}
        <div className="order-1 w-full lg:order-1 lg:w-100 lg:shrink-0">
          <div className="flex flex-col items-center justify-center gap-6 py-8 md:py-0 lg:sticky lg:top-24">
            {/* Page Title */}
            <h1 className="pt-8 text-center text-2xl font-black text-gray-900 uppercase md:pt-0 lg:p-0 lg:text-left">
              Liked Shorts
            </h1>

            {/* Preview Card */}
            <div className="relative mx-auto aspect-9/16 w-full overflow-hidden rounded-2xl bg-gray-200 shadow-lg md:w-[360px] lg:mx-0">
              {/* 상단 카테고리 뱃지 */}
              <div className="absolute top-3 right-3 left-3 z-10 flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-black/55 px-3 py-1 text-[10px] font-medium text-white">
                  category
                </span>
              </div>

              {/* 썸네일 영역 */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
                <span className="text-sm text-gray-500">Video Preview</span>
              </div>

              {/* 하단 그라데이션 */}
              <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

              {/* 하단 정보 영역 */}
              <div className="absolute right-0 bottom-0 left-0 p-5">
                <h3 className="mb-2 line-clamp-2 text-[18px] leading-snug font-semibold text-white">
                  shortsTitle
                </h3>
                <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-200/90">
                  description
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-200">nickName</span>
                  <span className="rounded-full border border-white/25 px-3 py-1 text-[10px] text-gray-100">
                    #tag
                  </span>
                </div>
              </div>
            </div>

            {/* 재생 버튼 */}
            <Link href="/mypage/liked" className="group">
              <button className="flex w-full items-center justify-center gap-2 rounded-full bg-green-500 py-5 text-lg font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-100 hover:shadow-lg md:w-[360px]">
                <Play
                  strokeWidth={1.5}
                  className="transition-transform duration-500 group-hover:rotate-360"
                />
                모두 재생
              </button>
            </Link>
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
                <ChevronDown strokeWidth={1.5} size={14} />
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
          <div className="space-y-6">
            {/* ==================== Shorts Card 1 ==================== */}
            <div className="flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
              {/* 썸네일 */}
              <div className="relative h-48 w-28 shrink-0 overflow-hidden rounded-lg border-transparent bg-gray-200 sm:h-48 sm:w-36">
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                <span className="absolute top-2 left-2 rounded-full border border-gray-400/20 bg-black/25 px-3 py-1 text-[10px] text-white">
                  개발
                </span>
              </div>
              {/* 콘텐츠 */}
              <div className="flex min-w-0 flex-1 flex-col p-2 lg:p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="pt-1 text-lg font-bold text-gray-900">shortsTitle</h3>
                    <p className="mt-1.5 mb-4 text-sm text-gray-500">
                      nickName · 조회수 100회 · createdAt
                    </p>
                    <p className="mb-1 line-clamp-2 text-sm text-gray-700">description</p>
                  </div>
                  {/* 더보기 버튼 */}
                  <button className="shrink-0 rounded-full p-1 transition-colors hover:bg-gray-100">
                    <MoreHorizontal size={18} className="text-black" />
                  </button>
                </div>
                {/* 키워드 */}
                <div className="mt-auto flex flex-wrap gap-2">
                  <span className="px-1 py-1 text-xs text-gray-900">#tag</span>
                </div>
              </div>
            </div>

            {/* ==================== Shorts Card 2 ==================== */}
            <div className="flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
              <div className="relative h-48 w-28 shrink-0 overflow-hidden rounded-lg border-transparent bg-gray-200 sm:h-48 sm:w-36">
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                <span className="absolute top-2 left-2 rounded-full border border-gray-400/20 bg-black/25 px-3 py-1 text-[10px] text-white">
                  개발
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col p-2 lg:p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="pt-1 text-lg font-bold text-gray-900">
                      AI 시대의 필수 지식 MCP 이 영상 하나로 끝내세요!
                    </h3>
                    <p className="mt-1.5 mb-4 text-sm text-gray-500">
                      윤개발 · 조회수 1,234회 · 3개월 전
                    </p>
                    <p className="mb-1 line-clamp-2 text-sm text-gray-700">
                      MCP에 대한 모든 것을 알려드립니다.
                    </p>
                  </div>
                  <button className="shrink-0 rounded-full p-1 transition-colors hover:bg-gray-100">
                    <MoreHorizontal size={18} className="text-black" />
                  </button>
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  <span className="px-1 py-1 text-xs text-gray-900">#프로그래밍</span>
                  <span className="px-1 py-1 text-xs text-gray-900">#AI</span>
                  <span className="px-1 py-1 text-xs text-gray-900">#mcp</span>
                </div>
              </div>
            </div>

            {/* ==================== Shorts Card 3 ==================== */}
            <div className="flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
              <div className="relative h-48 w-28 shrink-0 overflow-hidden rounded-lg border-transparent bg-gray-200 sm:h-48 sm:w-36">
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                <span className="absolute top-2 left-2 rounded-full border border-gray-400/20 bg-black/25 px-3 py-1 text-[10px] text-white">
                  개발
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col p-2 lg:p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="pt-1 text-lg font-bold text-gray-900">
                      파이썬 일주일 완전 정복 로드맵
                    </h3>
                    <p className="mt-1.5 mb-4 text-sm text-gray-500">
                      조코딩 · 조회수 5,678회 · 5개월 전
                    </p>
                    <p className="mb-1 line-clamp-2 text-sm text-gray-700">
                      파이썬을 일주일 만에 마스터하는 방법을 알려드립니다.
                    </p>
                  </div>
                  <button className="shrink-0 rounded-full p-1 transition-colors hover:bg-gray-100">
                    <MoreHorizontal size={18} className="text-black" />
                  </button>
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  <span className="px-1 py-1 text-xs text-gray-900">#프로그래밍</span>
                  <span className="px-1 py-1 text-xs text-gray-900">#파이썬</span>
                  <span className="px-1 py-1 text-xs text-gray-900">#python</span>
                </div>
              </div>
            </div>

            {/* ==================== Shorts Card 4 ==================== */}
            <div className="flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
              <div className="relative h-48 w-28 shrink-0 overflow-hidden rounded-lg border-transparent bg-gray-200 sm:h-48 sm:w-36">
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                <span className="absolute top-2 left-2 rounded-full border border-gray-400/20 bg-black/25 px-3 py-1 text-[10px] text-white">
                  개발
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col p-2 lg:p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="pt-1 text-lg font-bold text-gray-900">
                      개발자가 다크 모드를 쓰는 이유
                    </h3>
                    <p className="mt-1.5 mb-4 text-sm text-gray-500">
                      김개발자 · 조회수 2,345회 · 6개월 전
                    </p>
                    <p className="mb-1 line-clamp-2 text-sm text-gray-700">
                      다크 모드의 장점과 개발자들이 선호하는 이유를 알아봅니다.
                    </p>
                  </div>
                  <button className="shrink-0 rounded-full p-1 transition-colors hover:bg-gray-100">
                    <MoreHorizontal size={18} className="text-black" />
                  </button>
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  <span className="px-1 py-1 text-xs text-gray-900">#개발자</span>
                  <span className="px-1 py-1 text-xs text-gray-900">#develop</span>
                  <span className="px-1 py-1 text-xs text-gray-900">#darkmode</span>
                </div>
              </div>
            </div>

            {/* ==================== Shorts Card 5 ==================== */}
            <div className="flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
              <div className="relative h-48 w-28 shrink-0 overflow-hidden rounded-lg border-transparent bg-gray-200 sm:h-48 sm:w-36">
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  thumbnailUrl
                </div>
                <span className="absolute top-2 left-2 rounded-full border border-gray-400/20 bg-black/25 px-3 py-1 text-[10px] text-white">
                  개발
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col p-2 lg:p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="pt-1 text-lg font-bold text-gray-900">
                      점프 투 파이썬! 파이썬의 기초
                    </h3>
                    <p className="mt-1.5 mb-4 text-sm text-gray-500">
                      프론트만로해 · 조회수 987회 · 7개월 전
                    </p>
                    <p className="mb-1 line-clamp-2 text-sm text-gray-700">
                      파이썬의 기초부터 차근차근 배워봅시다.
                    </p>
                  </div>
                  <button className="shrink-0 rounded-full p-1 transition-colors hover:bg-gray-100">
                    <MoreHorizontal size={18} className="text-black" />
                  </button>
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  <span className="px-1 py-1 text-xs text-gray-900">#프로그래밍</span>
                  <span className="px-1 py-1 text-xs text-gray-900">#파이썬</span>
                  <span className="px-1 py-1 text-xs text-gray-900">#python</span>
                  <span className="px-1 py-1 text-xs text-gray-900">#백엔드</span>
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
