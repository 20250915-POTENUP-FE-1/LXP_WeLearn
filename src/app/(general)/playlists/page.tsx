import PlaylistPageWrapper from '@/features/playlists/PlaylistPageWrapper'

export default async function PlaylistsPage() {
  const [initialPlaylists] = await Promise.all([
    fetch('http://localhost:4000/shortsPlaylists').then((res) => res.json()), // Mock server
  ])
  return (
    <div>
      <PlaylistPageWrapper initialPlaylists={initialPlaylists} />
    </div>
  )
}
