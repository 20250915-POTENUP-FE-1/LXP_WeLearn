'use client'

import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ShortPreviewCard from '@/features/home/ShortFormCarousel/ShortPreviewCard'
import type { components } from '@/types/api-schema'

type ShortsItem = components['schemas']['ShortsResponse']

type PageNationProps = {
  items: ShortsItem[]
  itemsPerPage?: number
}

export default function PageNation({
  items,
  itemsPerPage = 4, // 한 페이지당 4개
}: PageNationProps) {
  const [currentPage, setCurrentPage] = React.useState(0)

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage))

  const startIndex = currentPage * itemsPerPage
  const visibleItems = items.slice(startIndex, startIndex + itemsPerPage)

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
  }

  return (
    <>
      <div className="relative">
        {currentPage > 0 && (
          <button
            onClick={handlePrev}
            className="absolute top-1/2 -left-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-transparent text-gray-600 shadow-lg transition-colors hover:bg-gray-100 hover:text-gray-900"
            aria-label="이전"
          >
            <ChevronLeft />
          </button>
        )}

        {/* 여기서 바로 4개씩 카드 렌더링 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {visibleItems.map((item) => (
            <ShortPreviewCard key={item.shortsId} item={item} />
          ))}
        </div>

        {currentPage < totalPages - 1 && (
          <button
            onClick={handleNext}
            className="absolute top-1/2 -right-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-transparent text-gray-600 shadow-lg transition-colors hover:bg-gray-100 hover:text-gray-900"
            aria-label="다음"
          >
            <ChevronRight />
          </button>
        )}
      </div>

      {/* 하단 페이지 버튼 (동그라미) */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx)}
            className={`h-2 w-2 rounded-full transition-colors ${
              currentPage === idx ? 'bg-gray-900' : 'bg-gray-300'
            }`}
            aria-label={`${idx + 1}번째 페이지`}
          />
        ))}
      </div>
    </>
  )
}
