import type { RefObject } from 'react'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import type { ShortsFormChangeHandler } from '@/types/shorts/shortsForm'
import { isValidImageFile } from '@/features/shortsform/shortsform.validation'
import useDragAndDrop from './useDragAndDrop'

interface UseThumbnailUploadParams {
  onChange: ShortsFormChangeHandler
  inputRef?: RefObject<HTMLInputElement | null>
}

export default function useThumbnailUpload({ onChange, inputRef }: UseThumbnailUploadParams) {
  const [isDragging, setIsDragging] = useState(false)

  // input reset 함수
  const resetInput = useCallback(() => {
    if (inputRef?.current) {
      inputRef.current.value = ''
    }
  }, [inputRef])

  // 공통 처리 함수
  const applyThumbnailFile = useCallback(
    (file: File) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        onChange('thumbnail', reader.result as string)
        onChange('thumbnailFile', file)
        resetInput()
      }
      reader.onerror = () => {
        toast.error('이미지를 불러오지 못했습니다.')
        resetInput()
      }
      reader.readAsDataURL(file)
    },
    [onChange, resetInput],
  )

  // 드롭된 파일 처리
  const handleFileDrop = useCallback(
    (file: File) => {
      if (!isValidImageFile(file)) {
        toast.error('지원하지 않는 이미지 형식입니다. (jpg, png, gif, webp만 허용)')
        return
      }
      applyThumbnailFile(file)
    },
    [applyThumbnailFile],
  )

  const { handleDragEnter, handleDragLeave, handleDragOver, handleDrop } = useDragAndDrop({
    onDragStateChange: setIsDragging,
    onFileDrop: handleFileDrop,
  })

  // 썸네일 파일 선택
  const handleThumbnailUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      if (!isValidImageFile(file)) {
        toast.error('지원하지 않는 이미지 형식입니다. (jpg, png, gif, webp만 허용)')
        resetInput()
        return
      }

      applyThumbnailFile(file)
    },
    [applyThumbnailFile, resetInput],
  )

  // 썸네일 삭제
  const handleRemoveThumbnail = useCallback(() => {
    onChange('thumbnail', null)
    onChange('thumbnailFile', null)
    resetInput()
  }, [onChange, resetInput])

  return {
    isDragging,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleThumbnailUpload,
    handleRemoveThumbnail,
  }
}
