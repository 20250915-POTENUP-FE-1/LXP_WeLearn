'use client'

import { Eye, Heart } from 'lucide-react'
import Link from 'next/link'
import { useVideoPreview } from '@/hook/useVideoPreview'
import { ShortsBase } from '@/types/shorts/shorts'

// 숏츠 카드 컴포넌트 (호버 시 동영상 미리보기)
export default function CategoryShortsCard({ shorts }: { shorts: ShortsBase }) {
  // 동영상 미리보기 훅
  const { videoRef, handleMouseEnter, handleMouseLeave, handleLoadedData } = useVideoPreview({
    videoUrl: shorts.videoUrl,
  })

  return (
    <Link
      href={`/shorts/${shorts.shortsId}`}
      className="group block cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white/90 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-100 hover:shadow-lg">
        <div className="relative aspect-9/16 w-full overflow-hidden rounded-2xl bg-linear-to-br from-gray-200 to-gray-300">
          {/* 미디어 영역: 비디오 > 썸네일 > 플레이스홀더 순으로 fallback */}
          {shorts.videoUrl ? (
            <video
              ref={videoRef}
              src={shorts.videoUrl}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              playsInline
              muted
              preload="metadata"
              poster={shorts.thumbnailUrl ?? '/images/fallback-thumbnail.png'}
              onLoadedData={handleLoadedData}
            />
          ) : shorts.thumbnailUrl ? (
            <img
              src={shorts.thumbnailUrl}
              alt={'썸네일'}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 h-full w-full bg-linear-to-br from-gray-200 to-gray-300" />
          )}

          {/* 카테고리 배지 */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 pt-1.5 pl-4">
            {shorts.categoryName && (
              <span className="rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">
                {shorts.categoryName}
              </span>
            )}
          </div>

          {/* 숏츠 정보 (제목, 설명, 작성자, 좋아요/조회수) */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex h-[60%] flex-col justify-end bg-linear-to-t from-black/95 via-black/70 to-transparent p-4">
            <p className="mb-1 line-clamp-1 text-sm font-semibold text-white">{shorts.title}</p>
            <p className="my-1 line-clamp-2 text-[11px] leading-relaxed text-gray-300">
              {shorts.description}
            </p>
            <div className="flex items-center justify-between pt-2 text-[11px] text-gray-300">
              {/* 업로더 */}
              <span className="font-medium">{shorts.userNickname}</span>
              <div className="flex items-center gap-3">
                {/* 좋아요 */}
                <div className="flex items-center gap-1">
                  <Heart size={12} />
                  <span>{shorts.likeCount ?? 0}</span>
                </div>
                {/* 조회수 */}
                <div className="flex items-center gap-1">
                  <Eye size={12} />
                  <span>{shorts.viewCount ?? 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
