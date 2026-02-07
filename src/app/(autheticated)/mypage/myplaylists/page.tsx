import MyPlaylist from '@/features/mypage/myplaylists/list/MyPlaylist'

export default async function MyPlaylistsPage() {
  const [shortsPlaylists] = await Promise.all([
    fetch('http://localhost:4000/shortsPlaylists').then((res) => res.json()), // Mock server
  ])

  return (
    <div>
      <MyPlaylist playlists={shortsPlaylists} />
    </div>
  )
}
