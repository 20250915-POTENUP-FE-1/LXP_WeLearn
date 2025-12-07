'use client'

import { useRef, useEffect } from 'react'

interface ShortsPlayerProps {
  videoUrl: string
  thumbnailUrl?: string
}

function ShortsPlayer({ videoUrl, thumbnailUrl }: ShortsPlayerProps) {
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
      controls
      autoPlay
      muted
      loop
      playsInline
      poster={thumbnailUrl}
      src={videoUrl}
    />
  )
}

export default ShortsPlayer
