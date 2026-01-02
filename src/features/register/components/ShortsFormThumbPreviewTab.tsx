'use client'

import { ImageIcon } from 'lucide-react'
import ShortsFormPreviewFrame from './ShortsFormPreviewFrame'
import ShortsFormEmptyState from './ShortsFormEmptyState'

interface ThumbnailPreviewTabProps {
  thumbnail?: string | null
  onRemove: () => void
}

export default function ShortsFormThumbPreviewTab({
  thumbnail,
  onRemove,
}: ThumbnailPreviewTabProps) {
  // 썸네일이 있으면 미리보기 렌더링
  if (thumbnail) {
    return (
      // 썸네일 미리보기 프레임
      <ShortsFormPreviewFrame onRemove={onRemove}>
        <img
          src={thumbnail}
          alt="썸네일 미리보기"
          className="h-full w-full rounded-2xl object-cover"
        />
      </ShortsFormPreviewFrame>
    )
  }

  return (
    // 빈 상태 렌더링
    <ShortsFormEmptyState
      icon={<ImageIcon strokeWidth={0.5} size={102} color="#aaa" />}
      description={
        <>
          썸네일이 없습니다. <br /> 썸네일을 업로드해주세요.
        </>
      }
    />
  )
}
