'use client'

import { MoreHorizontal } from 'lucide-react'
import ShortsThumbnail from './ShortsThumbnail'
import { MyShortsItem } from '@/types/myshorts'

interface ShortsCardProps {
  shorts: MyShortsItem
  onSelect?: () => void
  onMoreClick?: () => void
}

export default function ShortsCard({ shorts, onSelect, onMoreClick }: ShortsCardProps) {
  const { title, thumbnailUrl, authorName, createdAt, tags, visibility } = shorts

  return (
    <div
      onClick={onSelect}
      className="flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
    >
      {/* 썸네일 */}
      <ShortsThumbnail thumbnailUrl={thumbnailUrl} visibility={visibility} />

      {/* 콘텐츠 */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="mb-1 line-clamp-2 font-medium text-gray-900">{title}</h3>
            <p className="mb-1 text-sm text-gray-500">{authorName}</p>
            <p className="mb-2 text-xs text-gray-400">{createdAt}</p>
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

        {/* 태그 */}
        <div className="mt-auto flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span key={tag} className="text-xs text-gray-400">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
