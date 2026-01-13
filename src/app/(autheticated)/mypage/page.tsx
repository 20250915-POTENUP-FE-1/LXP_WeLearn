import LikeShortsList from '@/features/mypage/dashboard/LikeShortsList'
import SavedShortsList from '@/features/mypage/dashboard/SavedShortsList'
import UserProfile from '@/features/mypage/dashboard/UserProfile'
import { likeShorts, savedPlaylists, user } from '@/dummy/data'

export default async function MyPageDashboard() {
  return (
    <div className="h-full w-full">
      <main className="mx-auto max-w-7xl px-4 py-8">
        <UserProfile
          userName={user.name}
          userEmail={user.email}
          profileImageUrl={user.profileImageUrl}
        />
        <LikeShortsList shorts={likeShorts} />
        <SavedShortsList playlists={savedPlaylists} />
      </main>
    </div>
  )
}
