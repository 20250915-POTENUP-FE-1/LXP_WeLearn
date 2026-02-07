'use client'

import { Button } from '@/components/ui/Button'
import { ShortsBase } from '@/types/shorts/shorts'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import DashboardCreatedCard from './DashboardCreatedCard'

interface DashboardCreatedListProps {
  shorts: ShortsBase[]
}

export default function DashboardCreatedList({ shorts }: DashboardCreatedListProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: 'prev' | 'next') => {
    if (!scrollRef.current) return
    const scrollAmount = 360 // 카드 너비 + gap
    scrollRef.current.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center justify-between">
        {/* 타이틀 */}
        <h2 className="text-xl font-extrabold text-gray-900 uppercase">My Created Shorts</h2>

        {/* 사용자 인터랙션 */}
        <div className="flex items-center gap-2">
          {/* 스와이프 버튼 */}
          <button
            onClick={() => handleScroll('prev')}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-50"
          >
            <ChevronLeft strokeWidth={1.5} size={16} />
          </button>
          <button
            onClick={() => handleScroll('next')}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-50"
          >
            <ChevronRight strokeWidth={1.5} size={16} />
          </button>
          {/* 전체 보기 */}
          <Link href="/mypage/myshorts">
            <Button
              variant="outline"
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors hover:bg-gray-50"
            >
              전체보기
            </Button>
          </Link>
        </div>
      </div>

      {/* 숏츠 목록 */}
      <div ref={scrollRef} className="scrollbar-hide flex gap-4 overflow-x-auto pt-1 pb-4">
        {shorts.map((shorts) => (
          <DashboardCreatedCard
            key={shorts.shortsId}
            shortsId={shorts.shortsId}
            videoUrl={shorts.videoUrl}
            categoryName={shorts.categoryName}
            thumbnailUrl={shorts.thumbnailUrl}
            title={shorts.title}
            description={shorts.description}
            userNickname={shorts.userNickname}
            keywords={shorts.keywords}
          />
        ))}
      </div>
    </section>
  )
}
