'use client'

import Image from 'next/image'
import type { ShortsStatus } from '@/types/myshorts'
import ShortsStatusBadge from './ShortsStatusBadge'

interface ShortsCardThumbnailProps {
  thumbnailUrl?: string | null
  status?: ShortsStatus
  showStatusBadge?: boolean
}

export default function ShortsCardThumbnail({
  thumbnailUrl,
  status,
  showStatusBadge,
}: ShortsCardThumbnailProps) {
  return (
    <div className="relative h-40 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-48 sm:w-36">
      {/* 썸네일 이미지 */}
      {thumbnailUrl ? (
        <Image
          src={thumbnailUrl}
          alt="썸네일"
          fill
          sizes="(min-width: 640px) 144px, 112px"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
          썸네일 없음
        </div>
      )}
      {/* 상태 배지 */}
      {showStatusBadge && status && <ShortsStatusBadge status={status} />}
    </div>
  )
}
