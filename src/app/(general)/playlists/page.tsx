import PlaylistPageWrapper from '@/features/playlists/PlaylistPageWrapper'

export default async function PlaylistsPage() {
  const [initialPlaylists] = await Promise.all([
    fetch('http://localhost:4000/api/v1/playlists/public').then((res) => res.json()), // Mock server
  ])
  return (
    <div className="w-full">
      <PlaylistPageWrapper initialPlaylists={initialPlaylists.data.content} />
    </div>
  )
}
