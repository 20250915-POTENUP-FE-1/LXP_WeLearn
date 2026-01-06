'use client'

import type { ShortsResponse } from '@/types/mypage-shorts'
import { ShortsPreviewItem } from './ShortsPreviewItem'
import { useShortsAutoPlay } from '@/hook/mypage/useShortsAutoPlay'

interface ShortsPreviewContainerProps {
  shorts?: ShortsResponse | null
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
    <ShortsPreviewItem
      shorts={shorts ?? null}
      videoRef={videoRef}
      onLoadedData={handleLoadedData}
      loop={loop}
    />
  )
}
