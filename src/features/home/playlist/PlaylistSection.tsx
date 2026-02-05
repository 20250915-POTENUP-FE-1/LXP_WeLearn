import Image from 'next/image'
import { Play } from 'lucide-react'
import PlaylistButton from '@/features/home/playlist/PlaylistButton'
import { PlayListCard } from '@/types/playlist/playlist'

interface PlayListContainerProps {
  items: PlayListCard[]
}

export default async function PlaylistSection({ items }: PlayListContainerProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-xl font-extrabold text-gray-900 uppercase">Knowledge Blocks</h2>
      <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
        {items.map((item, index) => (
          <PlaylistButton key={item.id}>
            <div className="transition-all duration-200 hover:-translate-y-1 hover:drop-shadow-lg">
              <div className="relative mb-2 aspect-9/16 pt-2">
                {/* 스택 효과 - 카드 상단에 쌓인 레이어 */}
                <div className="absolute top-0 left-1/2 h-1 w-[85%] -translate-x-1/2 rounded-t-sm border bg-gray-400/80" />
                <div className="absolute top-1 left-1/2 h-1 w-[92%] -translate-x-1/2 rounded-t-sm border bg-gray-400" />
                {/* 메인 카드 */}
                <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-200 shadow-md">
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-black/30 text-white">
                    <p className="text-md max-w-[80%] truncate pb-2 font-medium">{item.title}</p>
                    <div className="flex items-center justify-center gap-2 rounded-xl border-2 border-white/50 bg-black/50 px-4 py-3">
                      <Play size={24} fill="currentColor" />
                      <span className="m-0 p-0 text-lg font-bold">{item.shortsCount}개</span>
                    </div>
                  </div>

                  {item.thumbnailUrl ? (
                    <Image
                      src={item.thumbnailUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="224px"
                      priority={index === 0}
                    />
                  ) : (
                    <div className="h-full w-full bg-linear-to-br from-gray-200 to-gray-300" />
                  )}
                </div>
              </div>

              <p className="truncate p-2 text-sm font-medium text-gray-900 group-hover:text-black">
                {item.title}
              </p>
              <p className="pb-2 text-xs text-gray-500">
                {item.category} {'·'} {item.shortsCount}개
              </p>
            </div>
          </PlaylistButton>
        ))}
      </div>
    </section>
  )
}
