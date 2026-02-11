import DashboardHeader from '@/features/mypage/dashboard/dashboard-header/DashboardHeader'
import DashboardPlaylists from '@/features/mypage/dashboard/DashboardPlaylists'
import DashboardLikedList from '@/features/mypage/dashboard/DashboardLikedList'
import DashboardCreatedList from '@/features/mypage/dashboard/DashboardCreatedList'
import { myShortsApi } from '@/services/mypage/myshorts.service'
import { playlistApi } from '@/services/playlist/playlist.service'
import { likeApi } from '@/services/shorts/likes.service'

export default async function MyPageDashboard() {
  const [myShortsData, likedShortsData, shortsPlaylists] = await Promise.all([
    myShortsApi.getMyShorts({ page: 0, size: 10 }),
    likeApi.getLikedShorts({ page: 0, size: 10 }),
    playlistApi.getUserPlaylist({ page: 0, size: 10 }).then((res) => res.data.content),
  ])
  const likedShortsCount = likedShortsData?.totalElements ?? 0
  const myShortsCount = myShortsData?.totalElements ?? 0

  return (
    <div className="h-full w-full">
      <main className="mx-auto max-w-7xl px-2 py-2 md:px-4 md:py-8">
        <DashboardHeader
          likedShortsCount={likedShortsCount}
          playlistCount={shortsPlaylists.length}
          myShortsCount={myShortsCount}
        />
        <DashboardLikedList shorts={likedShortsData.content} />
        <DashboardPlaylists playlists={shortsPlaylists} />
        <DashboardCreatedList shorts={myShortsData?.content ?? []} />
      </main>
    </div>
  )
}
