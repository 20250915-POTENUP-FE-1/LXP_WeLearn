'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ImageIcon, VideoIcon } from 'lucide-react'
import {
  VideoPreviewData,
  VideoPreviewChangeHandler,
  ShortsFormChangeHandler,
} from '@/features/register/types/shortsRegister'
import useVideoUpload from '@/hook/register/useVideoUpload'
import usePreviewTab from '@/hook/register/usePreviewTab'
import ShortsFormUploadTab from './ShortsFormUploadTab'

interface ShortsFormRightSectionProps {
  videoData: VideoPreviewData
  onChange: VideoPreviewChangeHandler
  thumbnail?: string | null
  onFormChange: ShortsFormChangeHandler
  // 수정 모드 전용 props
  isEditMode?: boolean
  existingVideoUrl?: string
  existingThumbnailUrl?: string
}

export default function ShortsFormRightSection({
  videoData,
  onChange,
  thumbnail,
  onFormChange,
  isEditMode = false,
  existingVideoUrl,
  existingThumbnailUrl,
}: ShortsFormRightSectionProps) {
  const { videoFile, isDragging: isVideoDragging } = videoData
  const [isThumbnailDragging, setIsThumbnailDragging] = useState(false)
  const isDragging = isVideoDragging || isThumbnailDragging
  const videoInputRef = useRef<HTMLInputElement>(null)

  // 비디오 소스 메모이제이션
  // 수정 모드: existingVideoUrl 사용
  // 등록 모드: videoFile에서 URL 생성
  const videoSrc = useMemo(() => {
    if (isEditMode && existingVideoUrl) {
      return existingVideoUrl
    }
    if (!videoFile) return null
    return URL.createObjectURL(videoFile)
  }, [isEditMode, existingVideoUrl, videoFile])

  // 메모리 누수를 방지하기 위해 URL.revokeObjectURL 호출
  // 단, existingVideoUrl은 revoke하지 않음
  useEffect(() => {
    return () => {
      if (videoSrc && !isEditMode) {
        URL.revokeObjectURL(videoSrc)
      }
    }
  }, [videoSrc, isEditMode])

  // 썸네일 소스 결정: 새로 업로드한 thumbnail 우선, 없으면 기존 URL
  const thumbnailSrc = thumbnail ?? existingThumbnailUrl ?? null

  const {
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleRemoveVideo,
    handleVideoUpload,
  } = useVideoUpload({ onChange, inputRef: videoInputRef })

  const handleThumbnailRemove = () => {
    onFormChange('thumbnail', null)
  }

  const { isVideoTab, isThumbnailTab, switchToVideo, switchToThumbnail, handleRemove } =
    usePreviewTab({
      onVideoRemove: handleRemoveVideo,
      onThumbnailRemove: handleThumbnailRemove,
    })

  // 수정 모드에서 드래그/드롭 비활성화
  const dragHandlers = isEditMode
    ? {}
    : {
        onDragEnter: isVideoTab ? handleDragEnter : undefined,
        onDragOver: isVideoTab ? handleDragOver : undefined,
        onDragLeave: isVideoTab ? handleDragLeave : undefined,
        onDrop: isVideoTab ? handleDrop : undefined,
      }

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
          동영상
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
            thumbnail={thumbnailSrc}
            onChange={onFormChange}
            onDraggingChange={setIsThumbnailDragging}
            isEditMode={isEditMode}
          />
        )}
      </div>
    </div>
  )
}
