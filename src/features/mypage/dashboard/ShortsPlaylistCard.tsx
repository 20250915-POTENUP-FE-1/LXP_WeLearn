import { Play } from 'lucide-react'
import Image from 'next/image'

interface ShortsPlaylistCardProps {
  thumbnailUrl: string
  title: string
  progress: number
  category: string
  visibility: 'public' | 'draft'
  shortsCount: number
}

export default function ShortsPlaylistCard({
  thumbnailUrl,
  title,
  progress,
  category,
  visibility,
  shortsCount,
}: ShortsPlaylistCardProps) {
  const badgeLabel = visibility === 'public' ? '공개' : '비공개'

  return (
    <div className="group cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:drop-shadow-lg">
      <div className="relative mb-2 aspect-9/16 pt-2">
        {/* 스택 효과 - 카드 상단에 쌓인 레이어 */}
        <div className="absolute top-0 left-1/2 h-1 w-[85%] -translate-x-1/2 rounded-t-sm border bg-gray-400/80" />
        <div className="absolute top-1 left-1/2 h-1 w-[92%] -translate-x-1/2 rounded-t-sm border bg-gray-400" />

        {/* 메인 카드 */}
        <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-200 shadow-md">
          <span className="absolute top-3 left-3 z-10 rounded bg-black/80 px-2 py-0.5 text-xs text-white">
            {badgeLabel}
          </span>

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-black/40 text-white">
            <p className="text-md max-w-[80%] truncate pb-2 font-medium">{title}</p>
            <div className="flex items-center justify-center gap-2 rounded-xl border-2 border-white/50 bg-black/50 px-4 py-3">
              <Play size={20} fill="currentColor" opacity={0.9} />
              <span className="text-md m-0 p-0 font-medium">{shortsCount}개</span>
            </div>
          </div>

          <Image src={thumbnailUrl} alt={title} fill className="object-cover" sizes="224px" />

          <div className="absolute right-2 bottom-3 left-2 z-10">
            {/* <p className="text-xs text-gray-200">
              {category} · {shortsCount}개
            </p> */}
            <div className="mt-2 h-1 w-full rounded-full bg-gray-500/50">
              <div
                className="h-full rounded-full bg-green-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
