'use client'

import Pagination from '@/components/ui/Pagination'
import PlaylistItem from './PlaylistItem'
import { usePathname } from 'next/navigation'
import { PlayListCard, PlaylistInfo } from '@/types/playlist/playlist'
import Link from 'next/link'
import EmptyState from '../mypage/dashboard/EmptyState'

interface PlaylistPageCollectionProps {
  initialPlaylists: (PlayListCard | PlaylistInfo)[]
  totalPages?: number
  currentPage?: number
  isPending?: boolean
  onPageChange?: (page: number) => void
}

export default function PlaylistPageCollection({
  initialPlaylists,
  totalPages = 1,
  currentPage = 0,
  isPending = false,
  onPageChange = () => {},
}: PlaylistPageCollectionProps) {
  const pathname = usePathname()
  const isMyPage = pathname.includes('/myplaylists')

  return (
    <section className="flex h-full flex-col">
      <div className="mt-18 mb-12 flex items-center justify-between md:mt-0">
        <h2 className="text-xl font-extrabold text-gray-900 uppercase">
          {isMyPage ? 'My Created Playlists' : 'Playlists'}
        </h2>
      </div>
      {initialPlaylists.length === 0 ? (
        <EmptyState type="saved" />
      ) : (
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
                showBadge={isMyPage}
              />
            </Link>
          ))}
        </div>
      )}

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
              showBadge={isMyPage}
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
