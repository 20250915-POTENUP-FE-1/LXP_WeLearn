import PlaylistDetailContainer from '@/features/playlists/PlaylistDetailContainer'
import { clientApi } from '@/lib/utils/clientApiUtils'
import { playlistApi } from '@/services/playlist/playlist.service'
import { ApiResponse } from '@/types/api/api'
import { PlaylistInfo } from '@/types/playlist/playlist'

interface MyPlaylistsPageProps {
  params: Promise<{ id: string }>
}

export default async function MyPlaylistsPage({ params }: MyPlaylistsPageProps) {
  const { id } = await params
  // const playlistItem = await clientApi.get<ApiResponse<PlaylistInfo>>(`/api/playlists/${id}`)
  const playlistItem = await playlistApi.getPlaylistItem(Number(id))
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-8 lg:flex-row">
        <PlaylistDetailContainer playlistItem={playlistItem.data} />
      </div>
    </div>
  )
}
