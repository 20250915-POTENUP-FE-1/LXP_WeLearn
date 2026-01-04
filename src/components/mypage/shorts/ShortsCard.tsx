'use client'

import { MoreHorizontal } from 'lucide-react'
import { ShortsResponse } from '@/types/myshorts'
import ShortsCardThumbnail from './ShortsCardThumbnail'

interface ShortsCardProps {
  shorts: ShortsResponse
  isSelected?: boolean
  onSelect?: () => void
  onMoreClick?: () => void
}

export default function ShortsCard({
  shorts,
  isSelected = false,
  onSelect,
  onMoreClick,
}: ShortsCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`flex cursor-pointer gap-4 rounded-lg border bg-white p-4 transition-shadow hover:shadow-md ${
        isSelected ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200'
      }`}
    >
      {/* 썸네일 */}
      <ShortsCardThumbnail thumbnailUrl={shorts.thumbnailUrl} />

      {/* 콘텐츠 */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="mb-1 line-clamp-2 font-medium text-gray-900">{shorts.title}</h3>
            <p className="mb-1 text-sm text-gray-500">{shorts.uploader?.nickname ?? '익명'}</p>
          </div>

          {/* 더보기 버튼 */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMoreClick?.()
            }}
            className="flex-shrink-0 rounded-full p-1 transition-colors hover:bg-gray-100"
          >
            <MoreHorizontal size={18} className="text-gray-400" />
          </button>
        </div>

        {/* 카테고리 */}
        {shorts.category?.name && (
          <div className="mt-auto">
            <span className="text-xs text-gray-400">#{shorts.category.name}</span>
          </div>
        )}
      </div>
    </div>
  )
}
