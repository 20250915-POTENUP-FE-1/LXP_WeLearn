import type { RefObject } from 'react'
import { toast } from 'react-toastify'
import { VideoPreviewChangeHandler } from '@/types/shortsRegister'

interface UseVideoUploadParams {
  onChange: VideoPreviewChangeHandler
  inputRef?: RefObject<HTMLInputElement | null> // 같은 파일 재업로드 & 삭제 후 reset용
}

export default function useVideoUpload({ onChange, inputRef }: UseVideoUploadParams) {
  // input reset 함수
  const resetInput = () => {
    if (inputRef?.current) {
      inputRef.current.value = ''
    }
  }

  // 비디오 길이 추출 로직 수정 (onloadedmetadata 기반)
  const extractVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file)
      const video = document.createElement('video')

      video.preload = 'metadata'
      video.src = url

      video.onloadedmetadata = () => {
        const duration = Number.isFinite(video.duration) ? Math.round(video.duration) : 0
        URL.revokeObjectURL(url) // 성공시에도 revoke
        resolve(duration)
      }

      video.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error('비디오 메타데이터 호출에 실패했습니다.'))
      }
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

  // 공통 처리 함수로 중복 제거 + 예외 처리
  const applyVideoFile = async (file: File) => {
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
  }

  // 드롭 처리
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onChange('isDragging', false)

    const file = e.dataTransfer.files?.[0]
    if (!file) return

    if (!file.type.startsWith('video/')) {
      toast.error('동영상 파일만 업로드할 수 있습니다.')
      return
    }

    await applyVideoFile(file)
  }

  // 비디오 파일 선택
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('video/')) {
      toast.error('동영상 파일만 업로드할 수 있습니다.')
      resetInput()
      return
    }

    await applyVideoFile(file)
  }

  // 비디오 삭제
  const handleRemoveVideo = () => {
    onChange('videoFile', null)
    onChange('durationSec', null)
    resetInput()
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
