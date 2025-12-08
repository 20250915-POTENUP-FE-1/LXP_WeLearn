'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { ShortsDetail } from '@/types/shortform'
import ShortsItem from './ShortsItem'
import ShortsNavigationButtons from './ShortsNavigationButtons'
import { useKeyboardNavigation } from '@/hook/useKeyboardNavigation'

/**
 * ShortsContainer
 * 숏폼 리스트 세로 슬라이드(스와이프)로 탐색하는 컨테이너 컴포넌트
 */
interface ShortsContainerProps {
  shortsList: ShortsDetail[] // 전체 숏폼 리스트는 배열로
  initialIndex: number
}

// 슬라이드 이동 방향 타입 정의
type SlideDirection = 'up' | 'down' | null

export default function ShortsContainer({ shortsList, initialIndex }: ShortsContainerProps) {
  const isEmpty = shortsList.length === 0

  // 넘어가는 인덱스를 방지하기 위한 안전한 초기 인덱스 계산
  function getSafeInitialIndex(
    initialIndex: number,
    shortsLength: number,
    isEmpty: boolean,
  ): number {
    if (isEmpty || shortsLength === 0) return 0
    if (initialIndex < 0) return 0
    if (initialIndex >= shortsLength) return shortsLength - 1
    return initialIndex
  }

  const safeInitialIndex = getSafeInitialIndex(initialIndex, shortsList.length, isEmpty)

  const [currentIndex, setCurrentIndex] = useState(safeInitialIndex) // 현재 노출 중인 숏폼 인덱스
  const [slideDirection, setSlideDirection] = useState<SlideDirection>(null) // 슬라이드 방향 상태
  const [isAnimating, setIsAnimating] = useState(false) // 애니메이션 중 여부 플래그

  const currentShorts = isEmpty ? null : shortsList[currentIndex] // 현재 숏폼 데이터
  const hasPrev = currentIndex > 0 // 이전 컨텐츠 존재 여부
  const hasNext = currentIndex < shortsList.length - 1 // 다음 컨텐츠 존재 여부

  // 현재 숏폼이 바뀔 때 URL 동기화 (/shortform/:id)
  useEffect(() => {
    if (!currentShorts) return
    const newUrl = `/shortform/${currentShorts.id}`
    window.history.replaceState(null, '', newUrl)
  }, [currentShorts?.id])

  /**
   * 이전/다음 숏폼으로 이동
   * - 애니메이션 방향 설정 후 인덱스 변경
   */
  const navigateTo = useCallback(
    (direction: 'prev' | 'next') => {
      if (isAnimating) return // 애니메이션 중 - 중복 입력 방지

      if (direction === 'prev' && hasPrev) {
        setSlideDirection('down') // 위로 이동 - 화면은 아래에서 위로 올라감
        setIsAnimating(true)
        setCurrentIndex((prev) => prev - 1)
      } else if (direction === 'next' && hasNext) {
        setSlideDirection('up') // 아래로 이동 - 화면은 위에서 아래로 내려감
        setIsAnimating(true)
        setCurrentIndex((prev) => prev + 1)
      }
    },
    [isAnimating, hasPrev, hasNext],
  )

  /**
   * 드래그 종료 시 다음/이전으로 넘길지 판단
   * - offset, velocity 기준으로 스와이프 방향 체크
   */
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50 // 이동 거리 기준
    const velocity = info.velocity.y // 드래그 속도
    const offset = info.offset.y // 드래그 이동량

    if (offset < -threshold || velocity < -500) {
      // 위로 스와이프 → 다음 콘텐츠
      navigateTo('next')
    } else if (offset > threshold || velocity > 500) {
      // 아래로 스와이프 → 이전 콘텐츠
      navigateTo('prev')
    }
  }

  // 키보드 방향키 네비게이션 훅 사용
  useKeyboardNavigation({
    onPrev: () => navigateTo('prev'),
    onNext: () => navigateTo('next'),
    enabled: !isEmpty, // 데이터가 있을 때만 키보드 네비게이션 활성화
  })

  // 데이터가 없을 때 처리
  if (isEmpty || !currentShorts) {
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
    <div className="flex w-full items-center justify-center gap-4">
      {/* 메인 숏폼 영역 */}
      <div className="w-full md:w-[420px]">
        {/* 세로 슬라이드 영역 (모바일: 전체 높이, 데스크탑: 70vh) */}
        <div className="`h-[100vh]` w-full overflow-hidden rounded-2xl bg-black md:h-[70vh]">
          <AnimatePresence initial={false} custom={slideDirection} mode="wait">
            <motion.div
              key={currentShorts.id} // 콘텐츠가 바뀔 때마다 애니메이션 트리거
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              drag="y" // 세로 방향 드래그 허용
              dragConstraints={{ top: 0, bottom: 0 }} // 실제 위치는 고정, 오직 제스처용
              dragElastic={0.2} // 드래그 탄성 정도
              onDragEnd={handleDragEnd} // 드래그 끝난 후 이동 결정
              onAnimationComplete={() => {
                // 슬라이드 애니메이션 완료 후 플래그 해제
                setIsAnimating(false)
              }}
              className="h-full w-full cursor-grab active:cursor-grabbing"
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
