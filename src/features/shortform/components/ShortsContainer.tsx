'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ShortsNavigationButtons from './ShortsNavigationButtons'
import { useKeyboardNavigation } from '@/hook/useKeyboardNavigation'
import { getSafeIndex } from '@/lib/utils/getSafeIndex'
import { useDragNavigation } from '@/hook/useDragNavigation'
import { useScrollNavigation } from '@/hook/useScrollNavigation'
import { ShortsItemType } from '@/types/shorts'
import ShortsItem from './ShortsItem'

interface ShortsContainerProps {
  shortsList: ShortsItemType[]
  initialIndex: number
}

type SlideDirection = 'up' | 'down' | null

export default function ShortsContainer({ shortsList, initialIndex }: ShortsContainerProps) {
  const safeInitialIndex = getSafeIndex(initialIndex, shortsList.length)
  const [currentIndex, setCurrentIndex] = useState(safeInitialIndex)
  const [slideDirection, setSlideDirection] = useState<SlideDirection>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const currentShorts = shortsList[currentIndex] ?? null
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < shortsList.length - 1

  // 현재 숏폼이 바뀔 때 URL 동기화 (/shorts/:shortsId)
  useEffect(() => {
    if (!currentShorts) return
    const newUrl = `/shorts/${currentShorts.shortsId}`
    window.history.replaceState(null, '', newUrl)
  }, [currentShorts?.shortsId])

  // // 무한 스크롤
  // const fetchMore = useCallback(async () => {
  //   if (isFetching) return

  //   setIsFetching(true)

  //   const lastId = list[list.length - 1]?.shortsId
  //   const res = await getShortsDetailList(String(lastId))

  //   if (res?.shortsList?.length) {
  //     setList((prev) => [...prev, ...res.shortsList])
  //   }

  //   setIsFetching(false)
  // }, [list, isFetching])

  // useEffect(() => {
  //   const remain = list.length - currentIndex - 1

  //   if (remain <= 2) {
  //     fetchMore()
  //   }
  // }, [currentIndex, list.length, fetchMore])

  /**
   * 이전/다음 숏폼으로 이동
   * - 애니메이션 방향 설정 후 인덱스 변경
   */
  const navigateTo = useCallback(
    (direction: 'prev' | 'next') => {
      if (isAnimating) return

      if (direction === 'prev' && hasPrev) {
        setSlideDirection('down')
        setIsAnimating(true)
        setCurrentIndex((prev) => prev - 1)
      } else if (direction === 'next' && hasNext) {
        setSlideDirection('up')
        setIsAnimating(true)
        setCurrentIndex((prev) => prev + 1)
      }
    },
    [isAnimating, hasPrev, hasNext],
  )

  // 드래그 네비게이션 훅 사용
  const handleDragEnd = useDragNavigation({
    onPrev: () => navigateTo('prev'),
    onNext: () => navigateTo('next'),
    threshold: 50,
    velocityThreshold: 500,
  })

  // 키보드 방향키 네비게이션 훅 사용
  useKeyboardNavigation({
    onPrev: () => navigateTo('prev'),
    onNext: () => navigateTo('next'),
    enabled: !!currentShorts,
  })

  const handleWheel = useScrollNavigation({
    onPrev: () => navigateTo('prev'),
    onNext: () => navigateTo('next'),
  })

  // 데이터가 없을 때 처리
  if (!currentShorts) {
    return (
      <div className="flex h-full w-full items-center justify-center text-white">
        <p>영상이 없습니다.</p>
      </div>
    )
  }

  /**
   * 슬라이드 애니메이션 variants 정의 : 프레이머 모션
   * - enter: 진입 위치 (위/아래에서 들어옴)
   * - center: 중앙 고정
   * - exit: 퇴장 위치 (위/아래로 나감)
   */
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
      {/* 메인 숏폼 영역 */}
      <div className="h-dvh w-full overflow-hidden md:h-full md:w-[460px]">
        {/* 세로 슬라이드 영역 (모바일: 전체 높이, 데스크탑: 70vh) */}
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
              }}
              className="h-full w-full cursor-grab overflow-y-hidden active:cursor-grabbing"
            >
              <ShortsItem shorts={currentShorts} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 데스크톱에서만 보이는 이전/다음 버튼 영역 */}
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
