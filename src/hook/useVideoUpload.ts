import { VideoPreviewChangeHandler } from '@/types/shortsRegister'
import { a } from 'framer-motion/client'

interface UseVideoUploadParams {
  onChange: VideoPreviewChangeHandler
}

export default function useVideoUpload({ onChange }: UseVideoUploadParams) {
  // 비디오 길이 추출
  const extractVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file)
      const video = document.createElement('video')
      video.preload = 'metadata'

      window.URL.revokeObjectURL(video.src)
      resolve(Math.round(video.duration))

      video.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error('비디오 메타데이터를 불러오는 데 실패했습니다.'))
      }

      video.src = URL.createObjectURL(file)
    })
  }

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
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onChange('isDragging', false)

    const files = e.dataTransfer.files
    if (files.length > 0 && files[0].type.startsWith('video/')) {
      const file = files[0]
      onChange('videoFile', file)

      // 비디오 길이 추출
      const duration = await extractVideoDuration(file)
      onChange('durationSec', duration)
    }
  }

  // 비디오 파일 선택
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('video/')) {
      onChange('videoFile', file)

      // 비디오 길이 추출
      const duration = await extractVideoDuration(file)
      onChange('durationSec', duration)
    }
  }

  // 비디오 삭제
  const handleRemoveVideo = () => {
    onChange('videoFile', null)
    onChange('durationSec', null)
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
