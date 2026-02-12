import SortButton, { SortOption } from '@/components/ui/SortButton'
import LikeShortsCard from '@/features/mypage/likes/LikeShortsCard'
import LikeShortsLeftSection from '@/features/mypage/likes/LikeShortsLeftSection'
import { likeApi } from '@/services/shorts/likes.service';

export default async function LikeShortsPage() {
  const data = await likeApi.getLikedShorts({ page: 0, size: 20})
  const likeShortsList = data?.content ?? []

  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-8 lg:flex-row">
        <LikeShortsLeftSection />
        <div className="order-2 flex-1 lg:order-2">
          <div className="my-4 flex justify-end">
            {/*<SortButton />*/}
          </div>
          <LikeShortsCard likeShortsList={likeShortsList}/>
        </div>
      </div>
    </div>
  )
}
