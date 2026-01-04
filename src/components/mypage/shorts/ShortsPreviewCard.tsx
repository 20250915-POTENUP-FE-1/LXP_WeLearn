'use client'

import Image from 'next/image'
import type { ShortsResponse } from '@/types/myshorts'

export function ShortsPreviewCard({
  shorts,
  videoRef,
  previewBind,
}: {
  shorts: ShortsResponse | null
  videoRef?: React.RefObject<HTMLVideoElement | null>
  previewBind?: React.HTMLAttributes<HTMLDivElement>
}) {
  // 빈 상태
  if (!shorts) {
    return (
      <div className="relative mx-auto aspect-[9/16] w-[280px] overflow-hidden rounded-2xl bg-gray-700 shadow-lg lg:mx-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-gray-500">미리보기</span>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>
    )
  }

  return (
    <div
      className="relative mx-auto aspect-[9/16] w-[280px] overflow-hidden rounded-2xl bg-gray-200 shadow-lg lg:mx-0"
      {...previewBind}
    >
      <div className="absolute top-3 right-3 left-3 z-10 flex items-center justify-between">
        {shorts.category?.name ? (
          <span className="inline-flex items-center rounded-full bg-gray-600/90 px-3 py-1 text-xs font-medium text-white">
            {shorts.category.name}
          </span>
        ) : (
          <span />
        )}

        {/* <span className="inline-flex items-center rounded-full bg-gray-600/90 px-3 py-1 text-xs font-medium text-white">
          숏강의
        </span> */}
      </div>

      {/* 비디오/썸네일 영역 */}
      <div className="absolute inset-0">
        {shorts.videoUrl ? (
          <video
            ref={videoRef}
            src={shorts.videoUrl}
            className="h-full w-full object-cover"
            playsInline
            muted
            preload="metadata"
            poster={shorts.thumbnailUrl ?? undefined}
          />
        ) : shorts.thumbnailUrl ? (
          <Image
            src={shorts.thumbnailUrl}
            alt={shorts.title ?? '썸네일'}
            fill
            sizes="280px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-500" />
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

      {/* 하단 정보 영역 */}
      <div className="absolute right-0 bottom-0 left-0 p-5">
        <h3 className="mb-2 line-clamp-2 text-[18px] leading-snug font-semibold text-white">
          {shorts.title}
        </h3>

        {shorts.description && (
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-200/90">
            {shorts.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-200">
            {shorts.uploader?.nickname ?? '익명'}
          </span>

          {shorts.category?.name && (
            <span className="rounded-full border border-white/30 bg-gray-700/70 px-3 py-1 text-xs font-medium text-white">
              #{shorts.category.name}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
