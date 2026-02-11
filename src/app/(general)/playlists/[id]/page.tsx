import PlaylistDetailContainer from '@/features/playlists/PlaylistDetailContainer'
import { playlistApi } from '@/services/playlist/playlist.service'

interface PlaylistsItemPageProps {
  params: Promise<{ id: string }>
}
export default async function PlaylistsItemPage({ params }: PlaylistsItemPageProps) {
  const { id } = await params
  // api 완성시 즉각 service 함수 호출
  const playlistItem = await playlistApi.getPlaylistItem(Number(id))

  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-8 lg:flex-row">
        <PlaylistDetailContainer playlistItem={playlistItem.data} />
      </div>
    </div>
  )
}
