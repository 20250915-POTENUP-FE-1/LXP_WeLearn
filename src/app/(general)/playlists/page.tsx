import PlaylistPageCollection from '@/features/playlists/PlaylistPageCollection'
import { playlistApi } from '@/services/playlist/playlist.service'

export default async function PlaylistsPage() {
  const response = await playlistApi.getPublicPlaylist({ page: 0, size: 10 })
  return (
    <div className="w-full">
      <PlaylistPageCollection initialPlaylists={response.data.content} />
    </div>
  )
}
