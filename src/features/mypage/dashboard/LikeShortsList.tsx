import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import LikeShortsCard from './LikeShortsCard'

interface LikeShort {
  id: string
  category: string
  thumbnailUrl: string
  title: string
  nickname: string
  progress: number
}

interface LikeShortsListProps {
  shorts: LikeShort[]
  onViewAll?: () => void
  onPrevious?: () => void
  onNext?: () => void
}

export default function LikeShortsList({
  shorts,
  onViewAll,
  onPrevious,
  onNext,
}: LikeShortsListProps) {
  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 uppercase">Like Shorts</h2>

        <div className="flex items-center gap-2">
          <Link href="/mypage/likes">
            <button
              onClick={onViewAll}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors hover:bg-gray-50"
            >
              전체보기
            </button>
          </Link>
          <button
            onClick={onPrevious}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-50"
          >
            <ChevronLeft strokeWidth={1.5} size={16} />
          </button>
          <button
            onClick={onNext}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-50"
          >
            <ChevronRight strokeWidth={1.5} size={16} />
          </button>
        </div>
      </div>

      <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
        {shorts.map((short) => (
          <LikeShortsCard
            key={short.id}
            category={short.category}
            thumbnailUrl={short.thumbnailUrl}
            title={short.title}
            nickname={short.nickname}
            progress={short.progress}
          />
        ))}
      </div>
    </section>
  )
}
