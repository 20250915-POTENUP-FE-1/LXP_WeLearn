'use client'

import { ChevronLeft, ChevronRight, Folders } from 'lucide-react'
import { PlayListCard } from '@/types/playlist/playlist'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { useRef } from 'react'
import PlaylistItem from '@/features/playlists/PlaylistItem'

interface PlaylistSectionProps {
  items: PlayListCard[]
}

export default function PlaylistSection({ items }: PlaylistSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: 'prev' | 'next') => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const cardWidth = container.querySelector('div')?.offsetWidth ?? 200
    const scrollAmount = cardWidth + 16 // gap-4 = 16px
    container.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="mb-12">
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-extrabold text-gray-900 uppercase">Knowledge Blocks</h2>
        <Link href="/playlists">
          <Button
            variant="outline"
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors hover:bg-gray-50"
          >
            전체보기
          </Button>
        </Link>
      </div>
      {!items.length ? (
        <p className="flex min-h-100 flex-col items-center justify-center py-16 text-center">
          <Folders strokeWidth={1.5} className="mb-4 h-12 w-12 text-gray-400" />
          <span className="text-center text-gray-500">등록된 플레이리스트가 없습니다.</span>
        </p>
      ) : (
        <div className="group/carousel relative">
          {/* 이전 버튼 */}
          <button
            onClick={() => handleScroll('prev')}
            className="absolute top-1/2 left-0 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-lg transition-all hover:bg-gray-100 hover:text-gray-900 sm:-left-4 sm:h-10 sm:w-10"
            aria-label="이전"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* 스크롤 컨테이너 */}
          <div
            ref={scrollRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4"
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="w-[calc((100%-48px)/4)] shrink-0 snap-start max-lg:w-[calc((100%-32px)/3)] max-sm:w-[calc((100%-16px)/2)]"
              >
                <Link href={`/playlists/${item.id}`}>
                  <PlaylistItem
                    id={item.id}
                    thumbnailUrl={item.thumbnailUrl}
                    title={item.title}
                    description={item.description}
                    visibility={item.visibility}
                    shortsCount={item.shortsCount}
                  />
                </Link>
              </div>
            ))}
          </div>

          {/* 다음 버튼 */}
          <button
            onClick={() => handleScroll('next')}
            className="absolute top-1/2 right-0 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-lg transition-all hover:bg-gray-100 hover:text-gray-900 sm:-right-4 sm:h-10 sm:w-10"
            aria-label="다음"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
      )}
    </section>
  )
}
