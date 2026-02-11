import PlaylistModal from '@/features/modals/playlist/PlaylistModal'
import { playlistApi } from '@/services/playlist/playlist.service'

export default async function PlaylistModalPage() {
  const initialPlaylistData = await playlistApi.getUserPlaylist({ page: 0, size: 10 })
  return <PlaylistModal initialPlaylistData={initialPlaylistData.data ?? []} />
}
