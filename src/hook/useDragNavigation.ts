import { PanInfo } from 'framer-motion'
import { useCallback } from 'react'

interface UseDragNavigationProps {
  onPrev: () => void
  onNext: () => void
  threshold?: number // 이동 거리 기준 (기본값: 50)
  velocityThreshold?: number // 드래그 속도 기준 (기본값: 500)
}

/**
 * 세로 방향 드래그/스와이프로 이전/다음 네비게이션을 처리하는 커스텀 훅
 *
 * @param onPrev - 이전으로 이동하는 콜백 함수
 * @param onNext - 다음으로 이동하는 콜백 함수
 * @param threshold - 이동 거리 기준 (px, 기본값: 50)
 * @param velocityThreshold - 드래그 속도 기준 (px/s, 기본값: 500)
 * @returns handleDragEnd - Framer Motion의 onDragEnd에 전달할 핸들러
 *
 */
export function useDragNavigation({
  onPrev,
  onNext,
  threshold = 50,
  velocityThreshold = 500,
}: UseDragNavigationProps) {
  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const velocity = info.velocity.y // 드래그 속도
      const offset = info.offset.y // 드래그 이동량

      if (offset < -threshold || velocity < -velocityThreshold) {
        // 위로 스와이프 → 다음 콘텐츠
        onNext()
      } else if (offset > threshold || velocity > velocityThreshold) {
        // 아래로 스와이프 → 이전 콘텐츠
        onPrev()
      }
    },
    [onPrev, onNext, threshold, velocityThreshold],
  )

  return handleDragEnd
}
