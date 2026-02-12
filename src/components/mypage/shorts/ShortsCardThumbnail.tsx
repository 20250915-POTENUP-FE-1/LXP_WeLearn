import { ShortsBase } from '@/types/shorts/shorts'
import Image from 'next/image'

interface ShortsCardThumbnailProps {
  shorts: ShortsBase
  thumbnailUrl: string
  title?: string
}

export default function ShortsCardThumbnail({
  thumbnailUrl,
  title = '썸네일',
  shorts,
}: ShortsCardThumbnailProps) {
  return (
    <div className="relative h-48 w-28 shrink-0 overflow-hidden rounded-lg border-transparent bg-gray-200 sm:h-48 sm:w-36">
      <Image
        src={thumbnailUrl}
        alt={title}
        fill
        sizes="(min-width: 640px) 144px, 112px"
        className="object-cover"
        unoptimized
      />
      {shorts.categoryName && (
        <span className="absolute top-2 left-2 rounded-full border border-gray-400/20 bg-black/50 px-3 py-1 text-[10px] text-white">
          {shorts.categoryName}
        </span>
      )}
    </div>
  )
}
