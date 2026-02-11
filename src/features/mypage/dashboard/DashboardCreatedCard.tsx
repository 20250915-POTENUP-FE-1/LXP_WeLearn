'use client'

import Link from 'next/link'
import { useVideoPreview } from '@/hook/useVideoPreview'

interface DashboardCreatedCardProps {
  shortsId: number
  videoUrl: string
  thumbnailUrl: string | null
  title: string
  description: string
  categoryName: string
  userNickname: string
  keywords: string[] | null
}

export default function DashboardCreatedCard({
  shortsId,
  videoUrl,
  title,
  description,
  categoryName,
  userNickname,
  keywords,
}: DashboardCreatedCardProps) {
  const { videoRef, handleMouseEnter, handleMouseLeave, handleLoadedData } = useVideoPreview({
    videoUrl,
  })

  return (
    <Link
      href={'/mypage/myshorts'}
      className="group block w-56 shrink-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white/90 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-100 hover:shadow-lg">
        <div className="relative aspect-9/16 w-full overflow-hidden rounded-2xl bg-gray-900">
          {/* 비디오 - 첫 프레임을 썸네일로 사용 */}
          <video
            ref={videoRef}
            src={videoUrl}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={handleLoadedData}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* 상단 배지 */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 pt-1.5 pl-4">
            {categoryName && (
              <span className="rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">
                {categoryName}
              </span>
            )}
          </div>

          {/* 하단 그라데이션 + 텍스트 */}
          <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-black/85 via-black/50 to-transparent p-4">
            <p className="mb-0.5 line-clamp-1 text-sm font-semibold text-white">{title}</p>
            <p className="mb-1.5 line-clamp-1 text-[11px] text-gray-300">{description}</p>
            <div className="flex items-center justify-between text-[11px] text-gray-300">
              <span className="font-medium">{userNickname}</span>
              {keywords && keywords.length > 0 && (
                <span className="rounded bg-white/20 px-1.5 py-0.5 text-[9px] text-white/90">
                  #{keywords[0]}
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
