'use client'

import Link from 'next/link'
import ShortsPlaylistCard from './ShortsPlaylistCard'
import Pagination from '@/components/ui/Pagination'

interface ShortsPlaylist {
  id: string
  visibility: 'public' | 'draft'
  shortsCount: number
  thumbnailUrl: string
  title: string
  category: string
  progress: number
}

interface ShortsPlaylistProps {
  playlists: ShortsPlaylist[]
  totalPages?: number
  currentPage?: number
  isPending?: boolean
  onPageChange?: (page: number) => void
}

export default function ShortsPlaylist({
  playlists,
  totalPages = 1,
  currentPage = 0,
  isPending = false,
  onPageChange = () => {},
}: ShortsPlaylistProps) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-gray-900 uppercase">My Shorts Playlists</h2>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
        {playlists.map((playlist) => (
          <Link key={playlist.id} href={`/mypage/saved/${playlist.id}`}>
            <ShortsPlaylistCard
              visibility={playlist.visibility}
              shortsCount={playlist.shortsCount}
              thumbnailUrl={playlist.thumbnailUrl}
              title={playlist.title}
              category={playlist.category}
              progress={playlist.progress}
            />
          </Link>
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        isPending={isPending}
        onPageChange={onPageChange}
        showPrevNext
      />
    </section>
  )
}
