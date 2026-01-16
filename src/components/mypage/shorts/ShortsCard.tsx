'use client'

import { MoreHorizontal } from 'lucide-react'
import type { ShortsResponse } from '@/types/mypage-shorts'
import ShortsCardThumbnail from './ShortsCardThumbnail'
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import MyShortsDropdownMenu from '@/features/mypage/myshorts/MyShortsDropdownMenu'
import ShortsStatusBadge from './ShortsStatusBadge'

interface ShortsCardProps {
  shorts: ShortsResponse
  isSelected?: boolean
  onSelect?: () => void
  onToggleVisibility?: () => void
  onDelete?: () => void
}

export default function ShortsCard({
  shorts,
  isSelected = false,
  onSelect,
  onToggleVisibility,
  onDelete,
}: ShortsCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`flex cursor-pointer gap-4 rounded-lg border bg-white p-4 transition-shadow hover:shadow-md ${
        isSelected ? 'border-green-500 ring-1 ring-green-500' : 'rounded-lg border-gray-200'
      }`}
    >
      {/* 썸네일 */}
      <ShortsCardThumbnail thumbnailUrl={shorts.thumbnailUrl} shorts={shorts} />

      {/* 콘텐츠 */}
      <div className="flex min-w-0 flex-1 flex-col p-2 lg:p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            {shorts.status && <ShortsStatusBadge shortsStatus={shorts.status} />}
            <h3 className="pt-1 text-lg font-bold text-gray-900">{shorts.title}</h3>
            <p className="mt-1.5 mb-4 text-sm text-gray-500">
              {shorts.userNickname ?? '숏터'}
              {shorts.createdAt && ` · ${shorts.createdAt}`}
            </p>
            <p className="mb-1 line-clamp-2 text-sm text-gray-700">{shorts.description}</p>
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
            <MyShortsDropdownMenu
              shortsId={shorts.shortsId!}
              shortsStatus={shorts.status}
              onToggleVisibility={onToggleVisibility}
              onDelete={onDelete}
            />
          </DropdownMenu>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2">
          {/* 키워드 표시 */}
          {shorts.keywords?.map((keyword: string, index: number) => (
            <span key={index} className="px-1 py-1 text-xs text-gray-900">
              #{keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
