'use client'

import { useEffect, useMemo, useRef } from 'react'
import { ImageIcon, VideoIcon } from 'lucide-react'
import {
  VideoPreviewData,
  VideoPreviewChangeHandler,
} from '@/features/register/types/shortsRegister'
import useVideoUpload from '@/hook/register/useVideoUpload'
import usePreviewTab from '@/hook/register/usePreviewTab'
import ShortsFormPreviewTab from './ShortsFormPreviewTab'

interface ShortsVideoPreviewProps {
  videoData: VideoPreviewData
  onChange: VideoPreviewChangeHandler
  thumbnail?: string | null
  onThumbnailRemove: () => void
}

export default function ShortsVideoPreview({
  videoData,
  onChange,
  thumbnail,
  onThumbnailRemove,
}: ShortsVideoPreviewProps) {
  const { videoFile, isDragging } = videoData
  const videoInputRef = useRef<HTMLInputElement>(null)

  // 비디오 소스 메모이제이션 : 상위에서 videoFile이 변경될 때만 새로 생성
  const videoSrc = useMemo(() => {
    if (!videoFile) return null
    return URL.createObjectURL(videoFile)
  }, [videoFile])

  // 메모리 누수를 방지하기 위해 URL.revokeObjectURL 호출
  useEffect(() => {
    return () => {
      if (videoSrc) {
        URL.revokeObjectURL(videoSrc)
      }
    }
  }, [videoSrc])

  const {
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleRemoveVideo,
    handleVideoUpload,
  } = useVideoUpload({ onChange, inputRef: videoInputRef })

  const { isVideoTab, isThumbnailTab, switchToVideo, switchToThumbnail, handleRemove } =
    usePreviewTab({
      onVideoRemove: handleRemoveVideo,
      onThumbnailRemove,
    })

  return (
    <div className="space-y-4">
      {/* 미리보기 전환 탭 */}

      <div className="flex gap-2" role="tablist" aria-label="미리보기 전환 탭">
        <button
          type="button"
          id="video-tab"
          role="tabMenu"
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
        className={`flex aspect-[9/16] items-center justify-center rounded-2xl border-2 border-dashed bg-white transition-all ${
          isDragging ? 'border-black bg-gray-50' : 'border-gray-300'
        }`}
        onDragEnter={isVideoTab ? handleDragEnter : undefined}
        onDragOver={isVideoTab ? handleDragOver : undefined}
        onDragLeave={isVideoTab ? handleDragLeave : undefined}
        onDrop={isVideoTab ? handleDrop : undefined}
      >
        <ShortsFormPreviewTab
          type={isVideoTab ? 'video' : 'thumbnail'}
          videoFile={videoFile}
          videoSrc={videoSrc}
          videoInputRef={videoInputRef}
          onVideoUpload={handleVideoUpload}
          thumbnail={thumbnail}
          onRemove={handleRemove}
        />
      </div>
    </div>
  )
}
