import SortButton, { SortOption } from '@/components/ui/SortButton'
import PlaylistCard from '@/features/playlists/PlaylistCard'
import PlaylistPreview from '@/features/playlists/PlaylistPreview'
import PlaylistRightHeader from '@/features/playlists/PlaylistRightHeader'
import { ShortsBase } from '@/types/shorts/shorts'

interface PlaylistsPageProps {
  initialShorts: ShortsBase[]
  totalCount: number
}

export default function PlaylistsPage({ totalCount }: PlaylistsPageProps) {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-8 lg:flex-row">
        <PlaylistPreview />

        <div className="order-2 flex-1 lg:order-2">
          <div className="mb-4 flex items-center justify-between">
            <PlaylistRightHeader totalCount={totalCount} />
            {/* <SortButton /> */}
          </div>
          {/* ==================== Shorts List ==================== */}
          <PlaylistCard />
        </div>
      </div>
    </div>
  )
}
