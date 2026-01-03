'use client'

import { ShortsPreviewCardProps } from '@/types/myshorts'

export default function ShortsPreviewCard({
  title = 'shortsTitle',
  category = 'category',
  description = 'description',
  thumbnailUrl,
  authorName = 'nickName',
  tags = ['tag'],
}: ShortsPreviewCardProps) {
  return (
    <div className="relative mx-auto aspect-[9/16] max-w-[280px] overflow-hidden rounded-xl bg-gray-900 lg:mx-0">
      {/* 카테고리 뱃지 */}
      <span className="absolute top-3 left-3 z-10 rounded bg-green-500 px-2 py-1 text-xs text-white">
        {category}
      </span>

      {/* 썸네일 영역 */}
      <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={title} className="h-full w-full object-cover" />
        ) : (
          <span className="text-sm text-gray-500">미리보기</span>
        )}
      </div>

      {/* 하단 정보 영역 */}
      <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="mb-1 font-medium text-white">{title}</h3>
        <p className="mb-3 text-sm text-gray-300">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-white">{authorName}</span>
          {tags.length > 0 && (
            <span className="rounded bg-white/20 px-2 py-0.5 text-xs text-white">#{tags[0]}</span>
          )}
        </div>
      </div>
    </div>
  )
}
