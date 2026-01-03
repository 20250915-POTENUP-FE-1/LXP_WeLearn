'use client'

import React from 'react'
import ShortsFormThumbPreviewTab from './ShortsFormThumbPreviewTab'
import ShortsFormVideoPreviewTab from './ShortsFormVideoPreviewTab'

// 공통 프리뷰 탭 속성 타입 정의
type ShortsFormPreviewTabProps =
  | {
      type: 'video'
      videoFile?: File | null
      videoSrc: string | null
      videoInputRef: React.RefObject<HTMLInputElement | null>
      onVideoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
      onRemove: () => void
    }
  | {
      type: 'thumbnail'
      thumbnail?: string | null
      onRemove: () => void
    }

export default function ShortsFormPreviewTab(props: ShortsFormPreviewTabProps) {
  if (props.type === 'video') {
    return (
      // 비디오 미리보기 탭 렌더링
      <ShortsFormVideoPreviewTab
        videoFile={props.videoFile}
        videoSrc={props.videoSrc}
        videoInputRef={props.videoInputRef}
        onVideoUpload={props.onVideoUpload}
        onRemove={props.onRemove}
      />
    )
  }

  return (
    // 썸네일 미리보기 탭 렌더링
    <ShortsFormThumbPreviewTab thumbnail={props.thumbnail} onRemove={props.onRemove} />
  )
}
