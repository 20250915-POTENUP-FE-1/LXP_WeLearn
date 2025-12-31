import { VideoPreviewChangeHandler } from '@/types/shortsRegister'

interface UseVideoUploadParams {
  onChange: VideoPreviewChangeHandler
}

export default function useVideoUpload({ onChange }: UseVideoUploadParams) {
  // 드래그 진입
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onChange('isDragging', true)
  }

  // 드래그 이탈
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onChange('isDragging', false)
  }

  // 드래그 오버
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  // 드롭 처리
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onChange('isDragging', false)

    const files = e.dataTransfer.files
    if (files.length > 0 && files[0].type.startsWith('video/')) {
      onChange('videoFile', files[0])
    }
  }

  // 비디오 파일 선택
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('video/')) {
      onChange('videoFile', file)
    }
  }

  // 비디오 삭제
  const handleRemoveVideo = () => {
    onChange('videoFile', null)
  }

  return {
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleVideoUpload,
    handleRemoveVideo,
  }
}
