import { useEffect, useState } from 'react'

interface UseKeywordsNavigationParams {
  itemCount: number
  onSelect: (index: number) => void
}

export default function useKeywordsNavigation({
  itemCount,
  onSelect,
}: UseKeywordsNavigationParams) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  // itemCount 변경 시 activeIndex 범위 체크
  useEffect(() => {
    if (itemCount === 0) {
      setActiveIndex(-1)
    } else if (activeIndex >= itemCount) {
      setActiveIndex(itemCount - 1)
    }
  }, [itemCount, activeIndex])

  // 드롭다운 열기
  const open = () => setIsOpen(true)

  // 드롭다운 닫기
  const close = () => {
    setIsOpen(false)
    setActiveIndex(-1)
  }

  // 키보드 네비게이션
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || itemCount === 0) {
      if (e.key === 'Escape') close()
      return
    }

    switch (e.key) {
      // 아래 화살표: 다음 항목으로 이동 (마지막이면 처음으로)
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex((prev) => (prev < itemCount - 1 ? prev + 1 : 0))
        break
      // 위 화살표: 이전 항목으로 이동 (처음이면 마지막으로)
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : itemCount - 1))
        break
      // 엔터: 현재 선택된 항목 확정 (없으면 첫 번째 항목 선택)
      case 'Enter':
        e.preventDefault()
        if (activeIndex >= 0 && activeIndex < itemCount) {
          onSelect(activeIndex)
        } else if (itemCount > 0) {
          onSelect(0)
        }
        break
      // ESC: 드롭다운 닫기
      case 'Escape':
        e.preventDefault()
        close()
        break
    }
  }

  // 포커스 해제
  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget as Node)) {
      return
    }
    close()
  }

  return {
    isOpen,
    activeIndex,
    open,
    close,
    handleKeyDown,
    handleBlur,
  }
}
