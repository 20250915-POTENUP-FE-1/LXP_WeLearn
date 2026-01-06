'use client'

import { ShortsListHeaderProps } from '@/types/mypage-shorts'

export default function ShortsListHeader({ totalCount, label = '총' }: ShortsListHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <span className="text-sm text-gray-500">
        {label} {totalCount}개
      </span>
    </div>
  )
}
