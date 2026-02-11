'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ImageIcon, VideoIcon } from 'lucide-react'
import useVideoUpload from '@/hook/register/useVideoUpload'
import usePreviewTab from '@/hook/register/usePreviewTab'
import ShortsFormUploadTab from './ShortsFormUploadTab'
import type {
  ShortsFormData,
  VideoPreviewData,
  ShortsFormChangeHandler,
  VideoPreviewChangeHandler,
} from '@/types/shorts/shortsForm'

interface ShortsFormMediaSectionProps {
  formData: Pick<ShortsFormData, 'thumbnail'>
  videoData: Pick<VideoPreviewData, 'videoFile' | 'isDragging'>
  onFormChange: ShortsFormChangeHandler
  onVideoChange: VideoPreviewChangeHandler
  isEditMode?: boolean
  existingVideoUrl?: string
  existingThumbnailUrl?: string
}

/**
 * 숏츠 미디어 섹션 (클라이언트 컴포넌트)
 * - 동영상/썸네일 미리보기 및 업로드
 */
export default function ShortsFormMediaSection({
  formData,
  videoData,
  onFormChange,
  onVideoChange,
  isEditMode = false,
  existingVideoUrl,
  existingThumbnailUrl,
}: ShortsFormMediaSectionProps) {
  const { thumbnail } = formData
  const { videoFile, isDragging: isVideoDragging } = videoData
  const [isThumbnailDragging, setIsThumbnailDragging] = useState(false)
  const isDragging = isVideoDragging || isThumbnailDragging
  const videoInputRef = useRef<HTMLInputElement>(null)

  // 비디오 소스 생성 & 랜더링때마다 불필요한 메모리 사용 금지
  const videoSrc = useMemo(() => {
    if (isEditMode && existingVideoUrl) {
      return existingVideoUrl
    }
    if (!videoFile) return null
    return URL.createObjectURL(videoFile)
  }, [isEditMode, existingVideoUrl, videoFile])

  // 메모리 누수 방지 - 임시 URL은 수동 해제(revokeObjectURL) 필요
  useEffect(() => {
    return () => {
      if (videoSrc && !isEditMode) {
        URL.revokeObjectURL(videoSrc)
      }
    }
  }, [videoSrc, isEditMode])

  // 드래그앤드랍 핸들러
  const {
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleRemoveVideo,
    handleVideoUpload,
  } = useVideoUpload({ onChange: onVideoChange, inputRef: videoInputRef })

  const handleThumbnailRemove = () => {
    onFormChange('thumbnail', null)
  }

  const { isVideoTab, isThumbnailTab, switchToVideo, switchToThumbnail, handleRemove } =
    usePreviewTab({
      onVideoRemove: handleRemoveVideo,
      onThumbnailRemove: handleThumbnailRemove,
    })

  // 드래그 핸들러 (수정 모드에서는 비활성화)
  const getDragHandlers = () => {
    const isDragDisabled = isEditMode || !isVideoTab
    if (isDragDisabled) return {}
    return {
      onDragEnter: handleDragEnter,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
    }
  }
  const dragHandlers = getDragHandlers()

  return (
    <div className="space-y-4">
      {/* 미리보기 전환 탭 */}
      <div className="flex gap-2" role="tablist" aria-label="미리보기 전환 탭">
        <button
          type="button"
          id="video-tab"
          role="tab"
          aria-selected={isVideoTab}
          onClick={switchToVideo}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            isVideoTab ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <VideoIcon className="h-4 w-4" />
          동영상<span className="text-red-600">*</span>
        </button>
        <button
          type="button"
          id="thumbnail-tab"
          role="tab"
          aria-selected={isThumbnailTab}
          onClick={switchToThumbnail}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            isThumbnailTab ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <ImageIcon className="h-4 w-4" />
          썸네일
        </button>
      </div>

      {/* 미리보기 영역 */}
      <div
        className={`flex aspect-9/16 items-center justify-center rounded-2xl border-2 border-dashed bg-white transition-all ${
          isDragging ? 'border-black bg-gray-50' : 'border-gray-300'
        }`}
        {...dragHandlers}
      >
        {isVideoTab ? (
          <ShortsFormUploadTab
            type="video"
            videoFile={videoFile}
            videoSrc={videoSrc}
            videoInputRef={videoInputRef}
            onVideoUpload={handleVideoUpload}
            onRemove={handleRemove}
            isEditMode={isEditMode}
          />
        ) : (
          <ShortsFormUploadTab
            type="thumbnail"
            thumbnail={thumbnail ?? existingThumbnailUrl ?? null}
            onChange={onFormChange}
            onDraggingChange={setIsThumbnailDragging}
            isEditMode={isEditMode}
          />
        )}
      </div>
    </div>
  )
}
