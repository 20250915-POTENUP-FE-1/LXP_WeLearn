'use client'

import Pagination from '@/components/ui/Pagination'
import MyPlaylistCard from './MyPlaylistCard'

interface ShortsPlaylist {
  id: number
  shortsCount: number
  thumbnailUrl: string
  title: string
  description: string
  categoryName: string
  visibility: 'PUBLIC' | 'PRIVATE'
}

interface MyPlaylistProps {
  playlists: ShortsPlaylist[]
  totalPages?: number
  currentPage?: number
  isPending?: boolean
  onPageChange?: (page: number) => void
}

export default function MyPlaylist({
  playlists,
  totalPages = 1,
  currentPage = 0,
  isPending = false,
  onPageChange = () => {},
}: MyPlaylistProps) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-gray-900 uppercase">My Playlists</h2>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
        {playlists.map((playlist) => (
          <MyPlaylistCard
            key={playlist.id}
            id={playlist.id}
            visibility={playlist.visibility}
            shortsCount={playlist.shortsCount}
            thumbnailUrl={playlist.thumbnailUrl}
            title={playlist.title}
            description={playlist.description}
            categoryName={playlist.categoryName}
          />
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
