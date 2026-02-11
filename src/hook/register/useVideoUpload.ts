import type { RefObject } from 'react'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import type { VideoPreviewChangeHandler } from '@/types/shorts/shortsForm'
import { isValidVideoFile } from '@/features/shortsform/shortsform.validation'
import { extractVideoDuration } from '@/utils/extractVideoDuration'
import useDragAndDrop from './useDragAndDrop'

interface UseVideoUploadParams {
  onChange: VideoPreviewChangeHandler
  inputRef?: RefObject<HTMLInputElement | null> // 같은 파일 재업로드 & 삭제 후 reset용
}

export default function useVideoUpload({ onChange, inputRef }: UseVideoUploadParams) {
  // input reset 함수
  const resetInput = useCallback(() => {
    if (inputRef?.current) {
      inputRef.current.value = ''
    }
  }, [inputRef])

  // 공통 처리 함수로 중복 제거 + 예외 처리
  const applyVideoFile = useCallback(
    async (file: File) => {
      onChange('videoFile', file)

      try {
        const duration = await extractVideoDuration(file)
        onChange('durationSec', duration)
      } catch (err) {
        console.error(err)
        toast.error('영상 정보를 불러오지 못했습니다.')
        onChange('durationSec', null)
      } finally {
        resetInput() // 삭제 후 같은 파일 재업로드 가능하도록
      }
    },
    [onChange, resetInput],
  )

  // 드롭된 파일 처리
  const handleFileDrop = useCallback(
    (file: File) => {
      if (!isValidVideoFile(file)) {
        toast.error('지원하지 않는 영상 형식입니다. (mp4만 허용)')
        return
      }
      applyVideoFile(file)
    },
    [applyVideoFile],
  )

  // 드래그 상태 변경 핸들러
  const handleDragStateChange = useCallback(
    (isDragging: boolean) => {
      onChange('isDragging', isDragging)
    },
    [onChange],
  )

  const { handleDragEnter, handleDragLeave, handleDragOver, handleDrop } = useDragAndDrop({
    onDragStateChange: handleDragStateChange,
    onFileDrop: handleFileDrop,
  })

  // 비디오 파일 선택
  const handleVideoUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      if (!isValidVideoFile(file)) {
        toast.error('지원하지 않는 영상 형식입니다. (mp4만 허용)')
        resetInput()
        return
      }

      await applyVideoFile(file)
    },
    [applyVideoFile, resetInput],
  )

  // 비디오 삭제
  const handleRemoveVideo = useCallback(() => {
    onChange('videoFile', null)
    onChange('durationSec', null)
    resetInput()
  }, [onChange, resetInput])

  return {
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleVideoUpload,
    handleRemoveVideo,
  }
}
