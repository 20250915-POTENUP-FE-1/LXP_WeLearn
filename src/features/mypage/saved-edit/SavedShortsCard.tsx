'use client'

import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import SavedShortsDropdownMenu from '@/features/mypage/saved-edit/SavedShortsDropdownMenu'
import { MoreHorizontal, Tally2 } from 'lucide-react'

export default function SavedShortsCard() {
  return (
    <div>
      <div className="space-y-6">
        {/* ==================== Playlist Shorts Card 1 ==================== */}
        <div className="group flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
          {/* 드래그 핸들 */}
          <div className="flex w-6 shrink-0 cursor-grab items-center justify-center active:cursor-grabbing">
            <Tally2 strokeWidth={1.5} />
          </div>
          {/* 썸네일 */}
          <div className="relative h-48 w-28 shrink-0 overflow-hidden rounded-lg border-transparent bg-gray-200 sm:h-48 sm:w-36">
            <img
              src="https://images.pexels.com/photos/2182863/pexels-photo-2182863.jpeg"
              alt="썸네일"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute top-2 left-2 rounded-full border border-gray-400/20 bg-black/25 px-3 py-1 text-[10px] text-white">
              개발
            </span>
          </div>
          {/* 콘텐츠 */}

          <div className="flex min-w-0 flex-1 flex-col p-2 lg:p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="pt-1 text-lg font-bold text-gray-900">
                  CI/CD? 처음 들으면 주문 같죠?
                </h3>
                <p className="mt-1.5 mb-4 text-sm text-gray-500">
                  코드읽어주는개발자 · 조회수 100회 · createdAt
                </p>
                <p className="mb-1 line-clamp-2 text-sm text-gray-700">
                  코드 짜고, 테스트하고, 배포까지… 예전엔 사람이 일일이 하느라 커피 식을 틈도
                  없었습니다. CI/CD 파이프라인은 이 모든 과정을 자동으로 처리해주는 개발자의 든든한
                  자동화
                </p>
              </div>
              {/* 더보기 드롭다운 메뉴 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="shrink-0 rounded-full p-1 transition-colors hover:bg-gray-100"
                  >
                    <MoreHorizontal size={18} className="text-black" />
                  </button>
                </DropdownMenuTrigger>
                <SavedShortsDropdownMenu />
              </DropdownMenu>
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
            <img
              src="https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg"
              alt="썸네일"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute top-2 left-2 rounded-full border border-gray-400/20 bg-black/25 px-3 py-1 text-[10px] text-white">
              개발
            </span>
          </div>
          <div className="flex min-w-0 flex-1 flex-col p-2 lg:p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="pt-1 text-lg font-bold text-gray-900">Spring Boot란 무엇인가요?</h3>
                <p className="mt-1.5 mb-4 text-sm text-gray-500">
                  윤개발 · 조회수 1,234회 · 3개월 전
                </p>
                <p className="mb-1 line-clamp-2 text-sm text-gray-700">
                  Spring Boot의 기본 개념을 알려드립니다.
                </p>
              </div>
              {/* 더보기 드롭다운 메뉴 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="shrink-0 rounded-full p-1 transition-colors hover:bg-gray-100"
                  >
                    <MoreHorizontal size={18} className="text-black" />
                  </button>
                </DropdownMenuTrigger>
                <SavedShortsDropdownMenu />
              </DropdownMenu>
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
            <img
              src="https://images.pexels.com/photos/270488/pexels-photo-270488.jpeg"
              alt="썸네일"
              className="absolute inset-0 h-full w-full object-cover"
            />
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
              {/* 더보기 드롭다운 메뉴 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="shrink-0 rounded-full p-1 transition-colors hover:bg-gray-100"
                  >
                    <MoreHorizontal size={18} className="text-black" />
                  </button>
                </DropdownMenuTrigger>
                <SavedShortsDropdownMenu />
              </DropdownMenu>
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
            <img
              src="https://images.pexels.com/photos/5483075/pexels-photo-5483075.jpeg"
              alt="썸네일"
              className="absolute inset-0 h-full w-full object-cover"
            />
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
              {/* 더보기 드롭다운 메뉴 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="shrink-0 rounded-full p-1 transition-colors hover:bg-gray-100"
                  >
                    <MoreHorizontal size={18} className="text-black" />
                  </button>
                </DropdownMenuTrigger>
                <SavedShortsDropdownMenu />
              </DropdownMenu>
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
            <img
              src="https://images.pexels.com/photos/35308304/pexels-photo-35308304.jpeg"
              alt="썸네일"
              className="absolute inset-0 h-full w-full object-cover"
            />
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
              {/* 더보기 드롭다운 메뉴 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="shrink-0 rounded-full p-1 transition-colors hover:bg-gray-100"
                  >
                    <MoreHorizontal size={18} className="text-black" />
                  </button>
                </DropdownMenuTrigger>
                <SavedShortsDropdownMenu />
              </DropdownMenu>
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
  )
}
