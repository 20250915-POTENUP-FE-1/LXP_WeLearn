'use client'

import { ShortsThumbnailProps } from '@/types/myshorts'
import { Globe, Lock } from 'lucide-react'

export default function ShortsThumbnail({ thumbnailUrl, visibility }: ShortsThumbnailProps) {
  return (
    <div className="relative h-40 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-48 sm:w-36">
      {/* 썸네일 이미지 */}
      {thumbnailUrl ? (
        <img src={thumbnailUrl} alt="썸네일" className="h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
          썸네일 없음
        </div>
      )}

      {/* 공개 상태 뱃지 */}
      {visibility && (
        <span
          className={`absolute top-2 left-2 flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-white ${
            visibility === 'public' ? 'bg-green-500' : 'bg-gray-600'
          }`}
        >
          {visibility === 'public' ? (
            <>
              <Globe size={10} />
              공개
            </>
          ) : (
            <>
              <Lock size={10} />
              비공개
            </>
          )}
        </span>
      )}
    </div>
  )
}
