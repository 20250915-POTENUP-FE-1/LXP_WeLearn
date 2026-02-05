import LikedShortsList from '@/features/mypage/dashboard/LikedShortsList'
import ShortsPlaylist from '@/features/mypage/dashboard/ShortsPlaylist'
import DashboardHeader from '@/features/mypage/dashboard/dashboard-header/DashboardHeader'
import { myShortsApi } from '@/services/mypage/myshorts.service'

export default async function MyPageDashboard() {
  const [myShortsData, likedShorts, shortsPlaylists] = await Promise.all([
    myShortsApi.getMyShorts({ page: 0, size: 1 }),
    fetch('http://localhost:4000/likedShorts').then((res) => res.json()), // Mock server
    fetch('http://localhost:4000/shortsPlaylists').then((res) => res.json()), // Mock server
  ])
  const myShortsCount = myShortsData?.totalElements ?? 0

  return (
    <div className="h-full w-full">
      <main className="mx-auto max-w-7xl px-2 py-2 md:px-4 md:py-8">
        <DashboardHeader
          likedShortsCount={likedShorts.length}
          playlistCount={shortsPlaylists.length}
          myShortsCount={myShortsCount}
        />
        <LikedShortsList shorts={likedShorts} />
        <ShortsPlaylist playlists={shortsPlaylists} />
      </main>
    </div>
  )
}
