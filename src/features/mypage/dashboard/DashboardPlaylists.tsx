'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import DashboardPlaylistCard from './DashboardPlaylistCard'

interface ShortsPlaylist {
  id: number
  shortsCount: number
  thumbnailUrl: string
  title: string
  description: string
  categoryName: string
  visibility: 'PUBLIC' | 'PRIVATE'
}

interface DashboardPlaylistsProps {
  playlists: ShortsPlaylist[]
  totalPages?: number
  currentPage?: number
  isPending?: boolean
  onPageChange?: (page: number) => void
}

export default function DashboardPlaylists({ playlists }: DashboardPlaylistsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: 'prev' | 'next') => {
    if (!scrollRef.current) return
    const scrollAmount = 360
    scrollRef.current.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-gray-900 uppercase">My Created Playlists</h2>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleScroll('prev')}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-50"
          >
            <ChevronLeft strokeWidth={1.5} size={16} />
          </button>
          <button
            onClick={() => handleScroll('next')}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-50"
          >
            <ChevronRight strokeWidth={1.5} size={16} />
          </button>
          <Link href="/mypage/myplaylists">
            <Button
              variant="outline"
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors hover:bg-gray-50"
            >
              전체보기
            </Button>
          </Link>
        </div>
      </div>

      <div ref={scrollRef} className="scrollbar-hide flex gap-4 overflow-x-auto pt-1 pb-4">
        {playlists.map((playlist) => (
          <DashboardPlaylistCard
            key={playlist.id}
            id={playlist.id}
            shortsCount={playlist.shortsCount}
            thumbnailUrl={playlist.thumbnailUrl}
            title={playlist.title}
            description={playlist.description}
            categoryName={playlist.categoryName}
          />
        ))}
      </div>
    </section>
  )
}
