import { useEffect } from 'react'

interface UseKeyboardNavigationProps {
  onPrev: () => void
  onNext: () => void
  enabled?: boolean // 키보드 네비게이션 활성화 여부
}

/**
 * 키보드 방향키(↑, ↓)로 이전/다음 네비게이션을 처리하는 커스텀 훅
 * @param onPrev - 이전으로 이동하는 콜백 함수
 * @param onNext - 다음으로 이동하는 콜백 함수
 * @param enabled - 키보드 네비게이션 활성화 여부 (기본값: true)
 */
export function useKeyboardNavigation({
  onPrev,
  onNext,
  enabled = true,
}: UseKeyboardNavigationProps) {
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        onPrev()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        onNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onPrev, onNext, enabled])
}
