import Image from 'next/image'

interface LikedShortsCardProps {
  thumbnailUrl: string | ''
  title?: string
  progress?: number
  categoryName?: string
  nickname?: string
}

export default function LikedShortsCard({
  thumbnailUrl,
  title,
  progress,
  categoryName,
  nickname,
}: LikedShortsCardProps) {
  return (
    <div className="group block w-56 shrink-0 cursor-pointer">
      <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white/90 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-100 hover:shadow-lg">
        <div className="relative aspect-9/16 w-full overflow-hidden rounded-2xl bg-linear-to-br from-gray-200 to-gray-300">
          <Image
            src={thumbnailUrl}
            alt={`${title} 썸네일`}
            fill
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="224px"
          />

          {/* 상단 배지 */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 pt-1.5 pl-3">
            <span className="rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">
              {categoryName}
            </span>
          </div>

          {/* 하단 그라데이션 + 텍스트 */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex h-[60%] flex-col justify-end bg-linear-to-t from-black/95 via-black/70 to-transparent p-4">
            <p className="mb-1 line-clamp-1 text-sm font-semibold text-white">{title}</p>
            <div className="flex items-center justify-between pt-2 text-[11px] text-gray-300">
              <span className="font-medium">{nickname}</span>
            </div>

            {/* 프로그래스바 */}
            <div className="mt-2 h-1 w-full rounded-full bg-gray-500/50">
              <div
                className="h-full rounded-full bg-red-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
