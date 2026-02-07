import { Button } from '@/components/ui/Button'
import PlaylistCard from '@/features/playlists/PlaylistCard'
import PlaylistPreview from '@/features/playlists/PlaylistPreview'
import PlaylistPreviewHeader from '@/features/playlists/PlaylistPreviewHeaer'
import PlaylistRightHeader from '@/features/playlists/PlaylistRightHeader'

export default async function MyPlaylistsPage() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* ==================== Left Section - Fixed Preview (모바일에서 먼저 노출) ==================== */}
        <div className="order-1 w-full lg:order-1 lg:w-100 lg:shrink-0">
          <div className="flex flex-col items-center justify-center gap-6 py-8 md:py-0 lg:sticky lg:top-24">
            {/* Page Header (플레이리스트 제목 + 수정 버튼) */}
            <PlaylistPreview />
          </div>
        </div>

        {/* ==================== Right Section - Playlist Shorts List ==================== */}
        <div className="order-2 flex-1 lg:order-2">
          {/* ==================== List Header (총 갯수) ==================== */}
          <div className="mb-4 flex items-center justify-between">
            <PlaylistRightHeader totalCount={5} />
          </div>

          {/* ==================== Playlist Shorts List (드래그 가능) ==================== */}
          <PlaylistCard />
        </div>
      </div>
    </div>
  )
}
