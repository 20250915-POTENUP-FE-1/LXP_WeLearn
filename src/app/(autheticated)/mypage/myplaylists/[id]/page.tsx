import PlaylistDetailContainer from '@/features/playlists/PlaylistDetailContainer'
import { playlistApi } from '@/services/playlist/playlist.service'

interface MyPlaylistsPageProps {
  params: Promise<{ id: string }>
}

export default async function MyPlaylistsPage({ params }: MyPlaylistsPageProps) {
  const { id } = await params
  const playlistItem = await playlistApi.getPlaylistItem(Number(id))

  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-8 lg:flex-row">
        <PlaylistDetailContainer playlistItem={playlistItem.data} />
      </div>
    </div>
  )
}
