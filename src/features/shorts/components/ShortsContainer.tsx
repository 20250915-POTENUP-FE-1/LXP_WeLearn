'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { ShortsDetail } from '@/types/shortform'
import ShortsItem from './ShortsItem'
import ShortsNavigationButtons from './ShortsNavigationButtons'

interface ShortsContainerProps {
  shortsList: ShortsDetail[]
  initialIndex: number
}

type SlideDirection = 'up' | 'down' | null

function ShortsContainer({ shortsList, initialIndex }: ShortsContainerProps) {
  const isEmpty = shortsList.length === 0

  const safeInitialIndex = isEmpty
    ? 0
    : initialIndex < 0
      ? 0
      : initialIndex >= shortsList.length
        ? shortsList.length - 1
        : initialIndex

  const [currentIndex, setCurrentIndex] = useState(safeInitialIndex)
  const [slideDirection, setSlideDirection] = useState<SlideDirection>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const currentShorts = isEmpty ? null : shortsList[currentIndex]
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < shortsList.length - 1

  useEffect(() => {
    if (!currentShorts) return
    const newUrl = `/shortform/${currentShorts.id}`
    window.history.replaceState(null, '', newUrl)
  }, [currentShorts?.id])

  const navigateTo = useCallback(
    (direction: 'prev' | 'next') => {
      if (isAnimating) return

      if (direction === 'prev' && hasPrev) {
        setSlideDirection('down')
        setIsAnimating(true)
        // 즉시 인덱스 변경
        setCurrentIndex((prev) => prev - 1)
      } else if (direction === 'next' && hasNext) {
        setSlideDirection('up')
        setIsAnimating(true)
        // 즉시 인덱스 변경
        setCurrentIndex((prev) => prev + 1)
      }
    },
    [isAnimating, hasPrev, hasNext],
  )

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    const velocity = info.velocity.y
    const offset = info.offset.y

    if (offset < -threshold || velocity < -500) {
      navigateTo('next')
    } else if (offset > threshold || velocity > 500) {
      navigateTo('prev')
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        navigateTo('prev')
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        navigateTo('next')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigateTo])

  if (isEmpty || !currentShorts) {
    return (
      <div className="flex h-full w-full items-center justify-center">
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
    <div className="flex w-full items-center justify-center gap-4">
      <div className="w-full md:w-[420px]">
        <div className="`h-[100vh]` w-full overflow-hidden rounded-2xl md:h-[70vh]">
          <AnimatePresence initial={false} custom={slideDirection} mode="wait">
            <motion.div
              key={currentShorts.id}
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              onAnimationComplete={() => {
                // 애니메이션 완료 후 플래그만 해제
                setIsAnimating(false)
              }}
              className="h-full w-full cursor-grab active:cursor-grabbing"
            >
              <ShortsItem shorts={currentShorts} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="hidden md:block">
        <ShortsNavigationButtons
          onPrev={() => navigateTo('prev')}
          onNext={() => navigateTo('next')}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      </div>
    </div>
  )
}

export default ShortsContainer
