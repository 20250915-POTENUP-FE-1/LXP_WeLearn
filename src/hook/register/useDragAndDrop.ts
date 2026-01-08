import { useCallback } from 'react'

interface UseDragAndDropOptions {
  onDragStateChange?: (isDragging: boolean) => void // 드래그 상태 변경 콜백 (선택)
  onFileDrop: (file: File) => void // 파일 드랍 시 실행할 콜백 (필수)
}

export default function useDragAndDrop({ onDragStateChange, onFileDrop }: UseDragAndDropOptions) {
  // 드래그 영역 진입 시 호출
  const handleDragEnter = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      onDragStateChange?.(true)
    },
    [onDragStateChange],
  )

  // 드래그 영역 이탈 시 호출
  const handleDragLeave = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      onDragStateChange?.(false)
    },
    [onDragStateChange],
  )

  // 드래그 중 영역 위에 있을 때 호출 (기본 동작 방지용)
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  // 파일 드랍 시 호출
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      onDragStateChange?.(false)

      // 드랍된 첫 번째 파일만 처리
      const file = e.dataTransfer.files?.[0]
      if (file) {
        onFileDrop(file)
      }
    },
    [onDragStateChange, onFileDrop],
  )

  return {
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  }
}
