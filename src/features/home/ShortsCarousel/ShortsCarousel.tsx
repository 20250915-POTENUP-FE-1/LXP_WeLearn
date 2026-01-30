import ShortsCarouselSwipe from './ShortsCarouselSwipe'
import { ShortsBase } from '@/types/shorts/shorts'

export default function ShortsCarousel({ data }: { data?: ShortsBase[] }) {
  const shortsCard = data ?? []
  return (
    <section className="my-12 md:mt-5 md:mb-12">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-extrabold text-gray-900 uppercase">
          Dev's Hot Pick?
        </h2>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
          오늘의 추천 {shortsCard.length ? shortsCard.length : 0}개
        </span>
      </div>

      {!shortsCard.length ? <p>오늘의 인기 숏폼 없습니다.</p> : <ShortsCarouselSwipe items={shortsCard} />}
    </section>
  )
}
