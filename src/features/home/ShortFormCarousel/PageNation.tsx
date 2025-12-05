'use client'

import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ShortFormItem } from '@/features/home/types/ShortFormItem'

export default function PageNation({
  children,
  items,
}: {
  children: React.ReactNode
  items: ShortFormItem[]
}) {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(items.length - 1, prev + 1))
  }

  return (
    <>
      <div className="relative">
        <button
          onClick={handlePrev}
          className="absolute top-1/2 -left-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-600 shadow-lg transition-colors hover:text-gray-900"
          aria-label="이전"
        >
          <ChevronLeft />
        </button>
        {children}

        <button
          onClick={handleNext}
          className="absolute top-1/2 -right-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-600 shadow-lg transition-colors hover:text-gray-900"
          aria-label="다음"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {[0, 1, 2, 3, 4].map((idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 w-2 rounded-full transition-colors ${
              currentIndex === idx ? 'bg-gray-900' : 'bg-gray-300'
            }`}
            aria-label={`${idx + 1}번째 페이지`}
          />
        ))}
      </div>
    </>
  )
}
