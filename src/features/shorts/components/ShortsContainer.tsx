'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ShortsNavigationButtons from './ShortsNavigationButtons'
import { useKeyboardNavigation } from '@/hook/useKeyboardNavigation'
import { getSafeIndex } from '@/lib/utils/getSafeIndex'
import { useDragNavigation } from '@/hook/useDragNavigation'
import { useScrollNavigation } from '@/hook/useScrollNavigation'
import { usePathname, useRouter } from 'next/navigation'
import ShortsCard from './ShortsCard'
import { ShortsBase, ShortsRecommendationPageInfo } from '@/types/shorts/shorts'
import { Loader2 } from 'lucide-react'
import { useShortsFeed } from '@/hook/shorts/useShortsFeed'

interface ShortsContainerProps {
  shortsList: ShortsBase[]
  initialIndex: number
  playlistId: string | string[] | undefined
  feedMode: 'playlist' | 'recommendation'
  totalElements?: number
  seedShortsId?: number
  initialRecommendationPageInfo?: ShortsRecommendationPageInfo
}

type SlideDirection = 'up' | 'down' | null

export default function ShortsContainer({
  shortsList,
  initialIndex,
  playlistId,
  feedMode,
  totalElements,
  seedShortsId,
  initialRecommendationPageInfo,
}: ShortsContainerProps) {
  const safeInitialIndex = getSafeIndex(initialIndex, shortsList.length)
  const [currentIndex, setCurrentIndex] = useState(safeInitialIndex)
  const [slideDirection, setSlideDirection] = useState<SlideDirection>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const {
    list,
    isFetching,
    hasNextInList,
    canFetchRecommendation,
    isLoadingNext,
    fetchMore,
    releaseAutoFetchBlock,
    toggleLike,
  } = useShortsFeed({
    feedMode,
    initialShortsList: shortsList,
    playlistId,
    currentIndex,
    totalElements,
    seedShortsId,
    initialRecommendationPageInfo,
  })

  const pathname = usePathname()
  const router = useRouter()
  const currentShorts = list[currentIndex] ?? null
  const currentShortsId = currentShorts?.shortsId
  const hasPrev = currentIndex > 0
  const hasNext = hasNextInList || canFetchRecommendation

  useEffect(() => {
    if (!currentShortsId) return
    const newUrl = pathname.includes('comments')
      ? `/shorts/${currentShortsId}/comments`
      : `/shorts/${currentShortsId}`
    window.history.replaceState(null, '', newUrl)
  }, [currentShortsId, pathname])

  const navigateTo = useCallback(
    async (direction: 'prev' | 'next') => {
      if (isAnimating) return

      if (direction === 'prev' && hasPrev) {
        setSlideDirection('down')
        setIsAnimating(true)
        setCurrentIndex((prev) => prev - 1)
        return
      }

      if (direction !== 'next') return

      if (hasNextInList) {
        setSlideDirection('up')
        setIsAnimating(true)
        setCurrentIndex((prev) => prev + 1)
        return
      }

      if (!canFetchRecommendation || isFetching) return

      releaseAutoFetchBlock()
      const addedCount = await fetchMore()
      if (addedCount > 0) {
        setSlideDirection('up')
        setIsAnimating(true)
        setCurrentIndex((prev) => prev + 1)
      }
    },
    [
      canFetchRecommendation,
      fetchMore,
      hasNextInList,
      hasPrev,
      isAnimating,
      isFetching,
      releaseAutoFetchBlock,
    ],
  )

  const handleDragEnd = useDragNavigation({
    onPrev: () => navigateTo('prev'),
    onNext: () => navigateTo('next'),
    threshold: 50,
    velocityThreshold: 500,
  })

  useKeyboardNavigation({
    onPrev: () => navigateTo('prev'),
    onNext: () => navigateTo('next'),
    enabled: !!currentShorts,
  })

  const handleWheel = useScrollNavigation({
    onPrev: () => navigateTo('prev'),
    onNext: () => navigateTo('next'),
  })

  if (!currentShorts) {
    return (
      <div className="flex h-full w-full items-center justify-center text-white">
        <p>영상이 없습니다.</p>
      </div>
    )
  }

  const slideVariants = {
    enter: (direction: SlideDirection) => ({
      y: direction === 'up' ? '100%' : '-100%',
    }),
    center: {
      y: 0,
    },
    exit: (direction: SlideDirection) => ({
      y: direction === 'up' ? '-100%' : '100%',
    }),
  }

  return (
    <div className="flex h-dvh w-full items-center justify-center gap-4 md:h-full">
      <div className="relative h-dvh w-full overflow-hidden md:h-full md:w-[460px]">
        <div
          className="h-dvh w-full overflow-hidden sm:rounded-2xl md:h-[84vh]"
          onWheel={(e) => {
            handleWheel(e.nativeEvent)
          }}
        >
          <AnimatePresence initial={false} custom={slideDirection} mode="popLayout">
            <motion.div
              key={currentShorts.shortsId}
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.5}
              onDragEnd={handleDragEnd}
              onAnimationComplete={() => {
                setIsAnimating(false)
                if (pathname.includes('comments')) {
                  router.prefetch(`/shorts/${currentShorts.shortsId}/comments`)
                } else {
                  router.prefetch(`/shorts/${currentShorts.shortsId}`)
                }
              }}
              className="h-full w-full cursor-grab overflow-y-hidden active:cursor-grabbing"
            >
              <ShortsCard shorts={currentShorts} handleToggleLike={toggleLike} />
            </motion.div>
          </AnimatePresence>
        </div>
        {isLoadingNext && (
          <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden">
            <Loader2 className="animate-spin text-white drop-shadow" size={28} />
          </div>
        )}
      </div>

      <div className="hidden md:block">
        <ShortsNavigationButtons
          onPrev={() => navigateTo('prev')}
          onNext={() => navigateTo('next')}
          hasPrev={hasPrev}
          hasNext={hasNext}
          isLoadingNext={isLoadingNext}
        />
      </div>
    </div>
  )
}
