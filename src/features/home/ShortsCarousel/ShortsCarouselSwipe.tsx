'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { components } from '@/types/api-schema'
import { useDragNavigation } from '@/hook/useDragNavigation'
import ShortPreviewCard from './ShortPreviewCard'

type ShortsItem = components['schemas']['ShortsResponse']

type ShortsCarouselSwipeProps = {
  items: ShortsItem[]
}

function getItemsPerPage() {
  if (typeof window === 'undefined') return 4
  if (window.innerWidth < 640) return 1
  if (window.innerWidth < 1024) return 2
  return 4
}

export default function ShortsCarouselSwipe({ items }: ShortsCarouselSwipeProps) {
  const [startIndex, setStartIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(4)
  const containerRef = useRef<HTMLDivElement>(null)
  const [itemWidth, setItemWidth] = useState(0)
  const gap = 16 // gap-4 = 16px

  useEffect(() => {
    const updateDimensions = () => {
      setItemsPerPage(getItemsPerPage())
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const currentItemsPerPage = getItemsPerPage()
        const totalGap = gap * (currentItemsPerPage - 1)
        setItemWidth((containerWidth - totalGap) / currentItemsPerPage)
      }
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const maxStartIndex = Math.max(0, items.length - itemsPerPage)

  useEffect(() => {
    if (startIndex > maxStartIndex) {
      setStartIndex(maxStartIndex)
    }
  }, [maxStartIndex, startIndex])

  const handlePrev = useCallback(() => {
    setStartIndex((prev) => Math.max(0, prev - 1))
  }, [])

  const handleNext = useCallback(() => {
    setStartIndex((prev) => Math.min(maxStartIndex, prev + 1))
  }, [maxStartIndex])

  const handleDragEnd = useDragNavigation({
    onPrev: handlePrev,
    onNext: handleNext,
    direction: 'horizontal',
  })

  const translateX = -startIndex * (itemWidth + gap)

  return (
    <>
      <div ref={containerRef} className="relative overflow-hidden">
        {startIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-lg transition-colors hover:bg-gray-100 hover:text-gray-900 sm:-left-4 sm:h-10 sm:w-10"
            aria-label="이전"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        )}

        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          animate={{ x: translateX }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="flex cursor-grab touch-pan-y active:cursor-grabbing"
          style={{ gap }}
        >
          {items.map((item) => (
            <div
              key={item.shortsId}
              className="shrink-0"
              style={{
                width:
                  itemWidth || `calc((100% - ${gap * (itemsPerPage - 1)}px) / ${itemsPerPage})`,
              }}
            >
              <ShortPreviewCard item={item} />
            </div>
          ))}
        </motion.div>

        {startIndex < maxStartIndex && (
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-lg transition-colors hover:bg-indigo-100 hover:text-gray-900 sm:-right-4 sm:h-10 sm:w-10"
            aria-label="다음"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        )}
      </div>

      {/* 하단 위치 인디케이터 */}
      <div className="mt-6 flex justify-center gap-1.5">
        {Array.from({ length: maxStartIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setStartIndex(idx)}
            className={`h-1.5 rounded-full transition-all ${
              startIndex === idx ? 'w-4 bg-gray-900' : 'w-1.5 bg-gray-300'
            }`}
            aria-label={`${idx + 1}번째 위치`}
          />
        ))}
      </div>
    </>
  )
}
