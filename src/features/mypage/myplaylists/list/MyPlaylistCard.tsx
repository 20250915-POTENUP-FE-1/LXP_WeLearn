import { Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export interface MyPlaylistCardProps {
  id: number
  thumbnailUrl: string
  title: string
  description: string
  categoryName: string
  visibility: 'PUBLIC' | 'PRIVATE'
  shortsCount: number
}

export default function MyPlaylistCard({
  id,
  thumbnailUrl,
  title,
  description,
  categoryName,
  visibility,
  shortsCount,
}: MyPlaylistCardProps) {
  const badgeLabel = visibility === 'PUBLIC' ? '공개' : '비공개'

  return (
    <Link key={id} href={`/mypage/myplaylists/${id}`}>
      <div className="group cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:drop-shadow-lg">
        <div className="relative mb-2 aspect-9/14 pt-2">
          {/* 스택 효과 - 카드 상단에 쌓인 레이어 */}
          <div className="absolute top-0 left-1/2 h-1 w-[85%] -translate-x-1/2 rounded-t-sm border bg-gray-400/80" />
          <div className="absolute top-1 left-1/2 h-1 w-[92%] -translate-x-1/2 rounded-t-sm border bg-gray-400" />

          {/* 메인 카드 */}
          <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-200 shadow-md">
            <span className="absolute top-3 left-3 z-12 rounded bg-black/80 px-2 py-0.5 text-[10px] text-white">
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
          </div>

          {/* 카드 밖 콘텐츠 */}
          <div className="my-4">
            <p className="line-clamp-1 truncate pb-2 text-xs font-medium">{description}</p>
            <p className="text-xs text-gray-500">
              {categoryName} · {shortsCount}개
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
