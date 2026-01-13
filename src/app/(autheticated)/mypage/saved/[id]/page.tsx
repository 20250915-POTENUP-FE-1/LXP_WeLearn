import { Button } from '@/components/ui/Button'
import { GripVertical, MoreHorizontal, Pencil, Play, Tally2 } from 'lucide-react'
import Link from 'next/link'

export default function SavedShortsPage() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* ==================== Left Section - Fixed Preview (모바일에서 먼저 노출) ==================== */}
        <div className="order-1 w-full lg:order-1 lg:w-100 lg:shrink-0">
          <div className="flex flex-col items-center justify-center gap-6 py-8 md:py-0 lg:sticky lg:top-24">
            {/* Page Header (플레이리스트 제목 + 수정 버튼) */}
            <div className="flex items-center gap-3 pt-8 md:pt-0 lg:p-0">
              <h1 className="text-center text-2xl font-black text-gray-900 uppercase lg:text-left">
                Spring Boot 시작하기
              </h1>
              <button className="flex items-center justify-center gap-2 rounded bg-black px-3 py-1.5 text-sm text-white transition-colors hover:bg-black/80">
                {/* <Pencil strokeWidth={1.5} size={14} /> */}
                수정
              </button>
            </div>

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
              <div className="absolute inset-x-0 bottom-0 h-[48%] bg-linear-to-t from-black/85 via-black/45 to-transparent" />

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

            {/* 취소 / 순서 저장 버튼 */}
            <div className="pt-4-y-4 flex w-full flex-col gap-6 md:w-[360px]">
              <div className="rounded-full shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-100 hover:shadow-lg">
                <Button type="button" variant="accent" className="text-md w-full rounded-full py-6">
                  저장하기
                </Button>
              </div>
              <div className="rounded-full shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-100 hover:shadow-lg">
                <Button
                  type="button"
                  variant="secondary"
                  className="text-md w-full rounded-full py-6"
                >
                  취소
                </Button>
              </div>
            </div>
            {/* <Link href="/mypage/likes" className="group">
              <button className="flex w-full items-center justify-center gap-2 rounded-full bg-black py-5 text-lg font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-100 hover:shadow-lg md:w-[360px]">
                <Play
                  strokeWidth={1.5}
                  className="transition-transform duration-500 group-hover:rotate-360"
                />
                모두 재생
              </button>
            </Link> */}
          </div>
        </div>

        {/* ==================== Right Section - Playlist Shorts List ==================== */}
        <div className="order-2 flex-1 lg:order-2">
          {/* ==================== List Header (총 갯수) ==================== */}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">총 28개</span>
          </div>

          {/* ==================== Playlist Shorts List (드래그 가능) ==================== */}
          <div className="space-y-6">
            {/* ==================== Playlist Shorts Card 1 ==================== */}
            <div className="group flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
              {/* 드래그 핸들 */}
              <div className="flex w-6 shrink-0 cursor-grab items-center justify-center active:cursor-grabbing">
                <Tally2 strokeWidth={1.5} />
              </div>
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
                      className="text-black"
                    >
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                </div>
                {/* 키워드 */}
                <div className="mt-auto flex flex-wrap gap-2">
                  <span className="px-1 py-1 text-xs text-gray-900">#tag</span>
                </div>
              </div>
            </div>

            {/* ==================== Playlist Shorts Card 2 ==================== */}
            <div className="group flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
              {/* 드래그 핸들 */}
              <div className="flex w-6 shrink-0 cursor-grab items-center justify-center active:cursor-grabbing">
                <Tally2 strokeWidth={1.5} />
              </div>
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
                      Spring Boot란 무엇인가요?
                    </h3>
                    <p className="mt-1.5 mb-4 text-sm text-gray-500">
                      윤개발 · 조회수 1,234회 · 3개월 전
                    </p>
                    <p className="mb-1 line-clamp-2 text-sm text-gray-700">
                      Spring Boot의 기본 개념을 알려드립니다.
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

            {/* ==================== Playlist Shorts Card 3 ==================== */}
            <div className="group flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
              {/* 드래그 핸들 */}
              <div className="flex w-6 shrink-0 cursor-grab items-center justify-center active:cursor-grabbing">
                <Tally2 strokeWidth={1.5} />
              </div>
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
                      Spring vs Spring Boot, 무엇이 다른가요
                    </h3>
                    <p className="mt-1.5 mb-4 text-sm text-gray-500">
                      조코딩 · 조회수 5,678회 · 5개월 전
                    </p>
                    <p className="mb-1 line-clamp-2 text-sm text-gray-700">
                      Spring과 Spring Boot의 차이점을 비교해봅니다.
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

            {/* ==================== Playlist Shorts Card 4 ==================== */}
            <div className="group flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
              {/* 드래그 핸들 */}
              <div className="flex w-6 shrink-0 cursor-grab items-center justify-center active:cursor-grabbing">
                <Tally2 strokeWidth={1.5} />
              </div>
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
                      IntelliJ로 Spring Boot 프로젝트 시작하기
                    </h3>
                    <p className="mt-1.5 mb-4 text-sm text-gray-500">
                      김개발자 · 조회수 2,345회 · 6개월 전
                    </p>
                    <p className="mb-1 line-clamp-2 text-sm text-gray-700">
                      IntelliJ에서 Spring Boot 프로젝트를 시작하는 방법을 알려드립니다.
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

            {/* ==================== Playlist Shorts Card 5 ==================== */}
            <div className="group flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
              {/* 드래그 핸들 */}
              <div className="flex w-6 shrink-0 cursor-grab items-center justify-center active:cursor-grabbing">
                <Tally2 strokeWidth={1.5} />
              </div>
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
                      Spring Initializr 제대로 사용하는 방법
                    </h3>
                    <p className="mt-1.5 mb-4 text-sm text-gray-500">
                      프론트만로해 · 조회수 987회 · 7개월 전
                    </p>
                    <p className="mb-1 line-clamp-2 text-sm text-gray-700">
                      Spring Initializr를 사용하여 프로젝트를 설정하는 방법을 알아봅니다.
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
        <button className="w-full px-4 py-2 text-left text-sm text-green-600 hover:bg-gray-100 flex items-center gap-2">
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
