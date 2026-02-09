import PlaylistContainer from '@/features/playlists/PlaylistContainer'
import { PlaylistApi } from '@/services/playlist/playlist.service'

interface PlaylistsItemPageProps {
  params: Promise<{ id: string }>
}
export default async function PlaylistsItemPage({ params }: PlaylistsItemPageProps) {
  const { id } = await params
  // api 완성시 즉각 service 함수 호출
  const playlistItem = await PlaylistApi.getPlaylistItem(Number(id))
  console.log(playlistItem)
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-8 lg:flex-row">
        <PlaylistContainer playlistItem={playlistItem.data} />
      </div>
    </div>
  )
}
