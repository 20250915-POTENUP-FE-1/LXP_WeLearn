'use client'

import { useRef, useEffect } from 'react'

interface ShortsPlayerProps {
  videoUrl: string
  thumbnailUrl: string | null
}

export default function ShortsPlayer({ videoUrl }: ShortsPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play().catch(() => {
        // 자동재생 차단 시 무시
      })
    }
  }, [videoUrl])

  return (
    <video
      ref={videoRef}
      key={videoUrl}
      aria-label="shorts video player"
      className="h-full w-full object-cover"
      autoPlay
      controls
      muted
      loop
      playsInline
      src={videoUrl}
    />
  )
}
