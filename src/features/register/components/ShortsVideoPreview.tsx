'use client'

import { useRef } from 'react'
import { CirclePlus, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoPreviewData, VideoPreviewChangeHandler } from '@/types/shortsRegister'
import useVideoUpload from '@/hook/useVideoUpload'

interface ShortsVideoPreviewProps {
  videoData: VideoPreviewData
  onChange: VideoPreviewChangeHandler
}

export default function ShortsVideoPreview({ videoData, onChange }: ShortsVideoPreviewProps) {
  const { videoFile, isDragging } = videoData
  const videoInputRef = useRef<HTMLInputElement>(null)

  const {
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleRemoveVideo,
    handleVideoUpload,
  } = useVideoUpload({ onChange })

  return (
    <div
      className={`flex aspect-[9/16] items-center justify-center rounded-2xl border-2 border-dashed bg-white transition-all ${
        isDragging ? 'border-black bg-gray-50' : 'border-gray-300'
      }`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {videoFile ? (
        // 비디오가 있을 경우 미리보기 렌더
        <div className="relative h-full w-full">
          <video className="h-full w-full rounded-2xl object-cover" controls>
            <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
          </video>

          {/* 비디오 제거 버튼 */}
          <button
            type="button"
            onClick={handleRemoveVideo}
            className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        // 비디오가 없을 경우 업로드 안내 UI
        <div className="text-center">
          <div className="mb-4 flex items-center justify-center">
            <CirclePlus strokeWidth={0.5} size={102} color="#aaa" />
          </div>

          <p className="text-sm leading-6 text-gray-500">
            동영상 파일을 드래그하거나 <br /> 클릭하여 업로드 하세요.
          </p>

          {/* 숨겨진 파일 input (커스텀버튼으로 파일 업로드 트리거용) - 파일선택 버튼 클릭 후 onChange 실행 */}
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="hidden"
          />

          <Button
            type="button"
            variant="outline"
            onClick={() => videoInputRef.current?.click()}
            className="mt-4"
          >
            파일 선택
          </Button>
        </div>
      )}
    </div>
  )
}
