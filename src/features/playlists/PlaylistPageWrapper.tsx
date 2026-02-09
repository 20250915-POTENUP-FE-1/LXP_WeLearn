'use client'

import Pagination from '@/components/ui/Pagination'
import PlaylistItem from './PlaylistItem'
import { usePathname } from 'next/navigation'
import { PlaylistInfo } from '@/types/playlist/playlist'
import Link from 'next/link'

interface PlaylistPageWrapperProps {
  initialPlaylists: PlaylistInfo[]
  totalPages?: number
  currentPage?: number
  isPending?: boolean
  onPageChange?: (page: number) => void
}

export default function PlaylistPageWrapper({
  initialPlaylists,
  totalPages = 1,
  currentPage = 0,
  isPending = false,
  onPageChange = () => {},
}: PlaylistPageWrapperProps) {
  const pathname = usePathname()
  const isMyPage = pathname.includes('/myplaylists')

  return (
    <section className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-gray-900 uppercase">
          {isMyPage ? 'My Playlists' : 'Playlists'}
        </h2>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
        {initialPlaylists.map((playlist) => (
          <Link
            href={isMyPage ? `/mypage/myplaylists/${playlist.id}` : `/playlists/${playlist.id}`}
            key={playlist.id}
          >
            <PlaylistItem
              id={playlist.id}
              visibility={playlist.visibility}
              shortsCount={playlist.shortsCount}
              thumbnailUrl={playlist.thumbnailUrl}
              title={playlist.title}
              description={playlist.description}
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
