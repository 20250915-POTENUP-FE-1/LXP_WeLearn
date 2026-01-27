'use client'

import { useShortsAutoPlay } from '@/hook/mypage/useShortsAutoPlay'
import { ShortsPreviewCard } from './ShortsPreviewItem'
import { ShortsBase } from '@/types/shorts/shorts'

interface ShortsPreviewContainerProps {
  shorts?: ShortsBase | null
  loop?: boolean
  autoplay?: boolean
}

export default function ShortsPreviewContainer({
  shorts,
  loop = false,
  autoplay = false,
}: ShortsPreviewContainerProps) {
  const { videoRef, handleLoadedData } = useShortsAutoPlay({
    enabled: Boolean(shorts?.videoUrl),
    loop,
    autoplay,
  })

  return (
    <ShortsPreviewCard
      shorts={shorts ?? null}
      videoRef={videoRef}
      onLoadedData={handleLoadedData}
      loop={loop}
    />
  )
}
