'use client'

import Link from 'next/link'
import { ShortsItemType } from '@/types/shorts'
import { useVideoPreview } from '@/hook/useVideoPreview'

export default function ShortPreviewCard({ item }: { item: ShortsItemType }) {
  const { videoRef, handleMouseEnter, handleMouseLeave, handleLoadedData } = useVideoPreview({
    videoUrl: item.videoUrl,
  })

  return (
    <Link
      href={`/shorts/${item.shortsId}`}
      className="group block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white/90 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-100 hover:shadow-lg">
        <div className="relative aspect-9/16 w-full overflow-hidden rounded-2xl bg-linear-to-br from-gray-200 to-gray-300">
          {/* 비디오가 썸네일 + 프리뷰를 둘 다 담당 */}
          {item.videoUrl ? (
            <video
              ref={videoRef}
              src={item.videoUrl}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              playsInline
              muted
              preload="metadata"
              poster={item.thumbnailUrl ?? undefined} // 로딩 전에 보일 썸네일
              onLoadedData={handleLoadedData}
            />
          ) : item.thumbnailUrl ? (
            // 비디오 없을 때만 이미지Fallback
            <img
              src={item.thumbnailUrl}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 h-full w-full bg-linear-to-br from-gray-200 to-gray-300" />
          )}

          {/* 상단 배지 */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 pt-1.5 pl-4">
            {item.categoryName && (
              <span className="rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">
                {item.categoryName}
              </span>
            )}
          </div>

          {/* 하단 그라데이션 + 텍스트 */}
          <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-black/85 via-black/50 to-transparent p-4">
            <p className="mb-1 line-clamp-2 text-sm font-semibold text-white">{item.title}</p>
            <p className="mb-2 line-clamp-2 h-[3.25em] text-[11px] text-gray-200">
              {item.description}
            </p>
            <div className="flex items-center justify-between text-[11px] text-gray-300">
              <span className="font-medium">{item.userNickname ?? '숏터'}</span>
              {item.keywords?.[0] && (
                <span className="rounded-full border border-white/25 px-2 py-0.5 text-[10px] text-gray-100">
                  #{item.keywords[0]}
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
