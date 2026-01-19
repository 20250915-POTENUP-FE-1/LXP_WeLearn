'use client'
import { useEffect, useRef, useCallback } from 'react'

const DEFAULT_PREVIEW_DURATION = 3500 // ms, 3.5초

interface UseVideoPreviewOptions {
  videoUrl?: string | null
  previewDuration?: number
}

export function useVideoPreview({
  videoUrl,
  previewDuration = DEFAULT_PREVIEW_DURATION,
}: UseVideoPreviewOptions) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const timeoutRef = useRef<number | null>(null)

  const handleMouseEnter = useCallback(() => {
    const video = videoRef.current
    if (!video || !videoUrl) return

    video.currentTime = 0
    video.muted = true

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // 자동재생 막힌 경우 무시
      })
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      video.pause()
    }, previewDuration)
  }, [videoUrl, previewDuration])

  const handleMouseLeave = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    video.pause()
    video.currentTime = 0
  }, [])

  const handleLoadedData = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    if (video.currentTime === 0) {
      try {
        video.currentTime = 0.01
        video.pause()
      } catch {
        // 일부 브라우저에서 시킹 실패할 수 있어서 무시
      }
    }
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    videoRef,
    handleMouseEnter,
    handleMouseLeave,
    handleLoadedData,
  }
}
