'use client'

import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import LikeShortsDropdownMenu from '@/features/mypage/likes/LikeShortsDropdownMenu'
import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'

export default function PlaylistCard() {
  return (
    <div className="space-y-6">
      <div className="flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
        <div className="relative h-48 w-28 shrink-0 overflow-hidden rounded-lg border-transparent bg-gray-200 sm:h-48 sm:w-36">
          <Image
            src="https://images.pexels.com/photos/35008891/pexels-photo-35008891.jpeg"
            alt="Figma 오토 레이아웃 기초"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 112px, 144px"
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
    </div>
  )
}
