'use client'

import React from 'react'
import ShortsFormThumbPreviewTab from './ShortsFormThumbPreviewTab'
import ShortsFormVideoPreviewTab from './ShortsFormVideoPreviewTab'
import { ShortsFormChangeHandler } from '@/features/register/types/shortsRegister'

// 공통 프리뷰/업로드 탭 타입 정의
type ShortsFormUploadTabProps =
  | {
      type: 'video'
      videoFile?: File | null
      videoSrc: string | null
      videoInputRef: React.RefObject<HTMLInputElement | null>
      onVideoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
      onRemove: () => void
      isEditMode?: boolean
    }
  | {
      type: 'thumbnail'
      thumbnail: string | null
      onChange: ShortsFormChangeHandler
      onDraggingChange?: (isDragging: boolean) => void
      isEditMode?: boolean
    }

export default function ShortsFormUploadTab(props: ShortsFormUploadTabProps) {
  if (props.type === 'video') {
    return (
      // 비디오 미리보기 탭 렌더링
      <ShortsFormVideoPreviewTab
        videoFile={props.videoFile}
        videoSrc={props.videoSrc}
        videoInputRef={props.videoInputRef}
        onVideoUpload={props.onVideoUpload}
        onRemove={props.onRemove}
        isEditMode={props.isEditMode}
      />
    )
  }

  return (
    // 썸네일 미리보기 탭 렌더링
    <ShortsFormThumbPreviewTab
      thumbnail={props.thumbnail}
      onChange={props.onChange}
      onDraggingChange={props.onDraggingChange}
      isEditMode={props.isEditMode}
    />
  )
}
