import Link from 'next/link'

interface LikedShortsCardProps {
  shortsId: string
  thumbnailUrl: string | ''
  title?: string
  categoryName?: string
  nickname?: string
}

export default function LikedShortsCard({
  shortsId,
  thumbnailUrl,
  title,
  categoryName,
  nickname,
}: LikedShortsCardProps) {
  return (
    <Link href={`/shorts/${shortsId}`} className="group block w-56 shrink-0">
      <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white/90 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-100 hover:shadow-lg">
        <div className="relative aspect-9/16 w-full overflow-hidden rounded-2xl bg-linear-to-br from-gray-200 to-gray-300">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={title ?? '숏츠 썸네일'}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 h-full w-full bg-linear-to-br from-gray-200 to-gray-300" />
          )}

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
            <p className="mb-1 line-clamp-2 text-sm font-semibold text-white">{title}</p>
            <div className="flex items-center justify-between text-[11px] text-gray-300">
              <span className="font-medium">{nickname ?? '숏터'}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
