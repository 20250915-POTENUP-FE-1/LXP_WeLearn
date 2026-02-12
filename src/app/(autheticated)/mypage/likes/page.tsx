import LikeShortsContainer from '@/features/mypage/likes/LikeShortsContainer'
import { likeApi } from '@/services/shorts/likes.service'

export default async function LikeShortsPage() {
  const data = await likeApi.getLikedShorts({ page: 0, size: 20 })
  const likeShortsList = data?.content ?? []

  return (
    <div className="h-full w-full">
      <LikeShortsContainer initialShorts={likeShortsList} />
    </div>
  )
}
