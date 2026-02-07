import PlaylistContainer from '@/features/playlists/PlaylistContainer'

export default async function MyPlaylistsPage() {
  const [initialPlaylists] = await Promise.all([
    fetch('http://localhost:4000/shortsPlaylists').then((res) => res.json()), // Mock server
  ])

  return (
    <div>
      <PlaylistContainer initialPlaylists={initialPlaylists} />
    </div>
  )
}
