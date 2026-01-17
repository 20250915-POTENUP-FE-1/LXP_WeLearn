'use client'

import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import LikeShortsDropdownMenu from '@/features/mypage/likes/LikeShortsDropdownMenu'
import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'

export default function LikeShortsCard() {
  return (
    <div>
      <div className="space-y-6">
        {/* ==================== Shorts Card 1 ==================== */}
        <div className="flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
          {/* 썸네일 */}
          <div className="relative h-48 w-28 shrink-0 overflow-hidden rounded-lg border-transparent bg-gray-200 sm:h-48 sm:w-36">
            <Image
              src="https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg"
              alt="Spring Boot 시작하기"
              fill
              className="object-cover"
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
                  배포전문가 · 조회수 100회 · createdAt
                </p>
                <p className="mb-1 line-clamp-2 text-sm text-gray-700">
                  {' '}
                  실수는 줄이고, 배포는 빠르게! 이 영상으로 CI/CD 개념, 웃으면서 한 번에
                  정리해보시죠 ☕🚀
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
                <LikeShortsDropdownMenu />
              </DropdownMenu>
            </div>
            {/* 키워드 */}
            <div className="mt-auto flex flex-wrap gap-2">
              <span className="px-1 py-1 text-xs text-gray-900">#CI/CD #DOCKER</span>
            </div>
          </div>
        </div>

        {/* ==================== Shorts Card 2 ==================== */}
        <div className="flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
          <div className="relative h-48 w-28 shrink-0 overflow-hidden rounded-lg border-transparent bg-gray-200 sm:h-48 sm:w-36">
            <Image
              src="https://images.pexels.com/photos/35008891/pexels-photo-35008891.jpeg"
              alt="Figma 오토 레이아웃 기초"
              fill
              className="object-cover"
            />
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
                <LikeShortsDropdownMenu />
              </DropdownMenu>
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
            <Image
              src="https://images.pexels.com/photos/35383162/pexels-photo-35383162.jpeg"
              alt="React 상태 관리 30초 요약"
              fill
              className="object-cover"
            />
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
                <LikeShortsDropdownMenu />
              </DropdownMenu>
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
            <Image
              src="https://images.pexels.com/photos/2182863/pexels-photo-2182863.jpeg"
              alt="CSS Grid 1분 이해"
              fill
              className="object-cover"
            />
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
                <LikeShortsDropdownMenu />
              </DropdownMenu>
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
            <Image
              src="https://images.pexels.com/photos/5483075/pexels-photo-5483075.jpeg"
              alt="DB 인덱스는 왜 필요할까?"
              fill
              className="object-cover"
            />
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
                <LikeShortsDropdownMenu />
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
