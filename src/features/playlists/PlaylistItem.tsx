import { DEFAULT_IMAGES } from '@/constants/shortsImages'
import { Play } from 'lucide-react'
import Image from 'next/image'

export interface PlaylistItemProps {
  id: number
  thumbnailUrl: string | null
  title: string
  description: string
  categoryName?: string
  visibility: 'PUBLIC' | 'PRIVATE'
  shortsCount: number
  showBadge?: boolean
}

export default function PlaylistItem({
  thumbnailUrl,
  title,
  description,
  visibility,
  shortsCount,
  showBadge = false,
}: PlaylistItemProps) {
  const badgeLabel = visibility === 'PUBLIC' ? '공개' : '비공개'

  return (
    <div className="group cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:drop-shadow-lg">
      <div className="relative mb-2 aspect-9/14 pt-2">
        {/* 스택 효과 - 카드 상단에 쌓인 레이어 */}
        <div className="absolute top-0 left-1/2 h-1 w-[85%] -translate-x-1/2 rounded-t-sm border bg-gray-400/80" />
        <div className="absolute top-1 left-1/2 h-1 w-[92%] -translate-x-1/2 rounded-t-sm border bg-gray-400" />

        {/* 메인 카드 */}
        <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-200 shadow-md">
          {showBadge && (
            <span className="absolute top-3 left-3 z-12 rounded bg-black/80 px-2 py-0.5 text-[10px] text-white">
              {badgeLabel}
            </span>
          )}

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-black/40 text-white">
            <p className="mt-4 max-w-[80%] truncate text-lg font-bold">{title}</p>
            <div className="mb-4 max-w-[80%]">
              <p className="line-clamp-1 truncate pb-2 text-xs font-medium text-white">
                {description}
              </p>
              {/* <p className="text-xs text-gray-500">{shortsCount}개</p> */}
            </div>

            <div className="flex items-center justify-center gap-2 rounded-xl border-2 border-white/70 bg-black/25 px-6 py-3">
              <Play size={20} opacity={0.9} />
              <span className="m-0 p-0 text-lg font-medium">{shortsCount}개</span>
            </div>
          </div>

          <Image
            src={thumbnailUrl || DEFAULT_IMAGES.THUMBNAIL}
            alt={title}
            fill
            className="object-cover"
            sizes="224px"
          />
        </div>
      </div>
    </div>
  )
}
