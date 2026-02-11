'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ShortsBase } from '@/types/shorts/shorts'
import ShortsCarouselCard from './ShortsCarouselCard'

type ShortsCarouselSwipeProps = {
  items: ShortsBase[]
}

export default function ShortsCarouselSwipe({ items }: ShortsCarouselSwipeProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: 'prev' | 'next') => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    // 카드 하나의 너비 + gap 만큼 스크롤
    // - div 요소 찾기, offsetWidth : 요소의 실제 렌더링된 너비(content+padding+border 포함, margin 포함안됨)
    // - 없으면 기본값 200
    const cardWidth = container.querySelector('div')?.offsetWidth ?? 200
    const scrollAmount = cardWidth + 16 // gap-4 = 16px
    container.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <div className="group/carousel relative">
      {/* 이전 버튼 */}
      <button
        onClick={() => handleScroll('prev')}
        className="absolute top-1/2 left-0 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-lg transition-all hover:bg-gray-100 hover:text-gray-900 sm:-left-4 sm:h-10 sm:w-10"
        aria-label="이전"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* 스크롤 컨테이너 */}
      <div
        ref={scrollRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4"
      >
        {items.map((item) => (
          <div
            key={item.shortsId}
            className="w-[calc((100%-48px)/4)] shrink-0 snap-start max-lg:w-[calc((100%-32px)/3)] max-sm:w-full"
          >
            <ShortsCarouselCard item={item} />
          </div>
        ))}
      </div>

      {/* 다음 버튼 */}
      <button
        onClick={() => handleScroll('next')}
        className="absolute top-1/2 right-0 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-lg transition-all hover:bg-gray-100 hover:text-gray-900 sm:-right-4 sm:h-10 sm:w-10"
        aria-label="다음"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
    </div>
  )
}
