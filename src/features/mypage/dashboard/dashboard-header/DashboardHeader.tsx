import DashboardContent from './DashboardContent'
import UserProfile from './UserProfile'

interface DashboardHeaderProps {
  likedShortsCount: number
  playlistCount: number
  myShortsCount: number
}

export default function DashboardHeader({
  likedShortsCount,
  playlistCount,
  myShortsCount,
}: DashboardHeaderProps) {
  return (
    <section className="my-20 flex w-full flex-col gap-4 md:mt-5 md:mb-20 md:flex-row md:items-center md:justify-between">
      <UserProfile />
      <DashboardContent
        likedShortsCount={likedShortsCount}
        playlistCount={playlistCount}
        myShortsCount={myShortsCount}
      />
    </section>
  )
}
