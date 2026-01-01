'use client'

import { useRef, useState } from 'react'
import { CirclePlus, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoPreviewData, VideoPreviewChangeHandler } from '@/types/shortsRegister'
import useVideoUpload from '@/hook/useVideoUpload'

type PreviewType = 'video' | 'thumbnail'

interface ShortsVideoPreviewProps {
  videoData: VideoPreviewData
  onChange: VideoPreviewChangeHandler
  thumbnail?: string | null
}

export default function ShortsVideoPreview({
  videoData,
  onChange,
  thumbnail,
}: ShortsVideoPreviewProps) {
  const { videoFile, isDragging } = videoData
  const videoInputRef = useRef<HTMLInputElement>(null)

  // 미리보기 타입 상태
  const [previewType, setPreviewType] = useState<PreviewType>('video')

  const {
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleRemoveVideo,
    handleVideoUpload,
  } = useVideoUpload({ onChange, inputRef: videoInputRef })

  // 썸네일과 비디오가 모두 있을 때만 탭 표시
  const showPreviewTabs = videoFile && thumbnail

  return (
    <div className="space-y-4">
      {/* 미리보기 전환 탭 */}
      {showPreviewTabs && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPreviewType('video')}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              previewType === 'video'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            동영상
          </button>
          <button
            type="button"
            onClick={() => setPreviewType('thumbnail')}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              previewType === 'thumbnail'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            썸네일
          </button>
        </div>
      )}

      {/* 미리보기 영역 */}
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
          <div className="relative h-full w-full">
            {/* ✅ 수정: 미리보기 타입에 따라 표시 */}
            {previewType === 'video' ? (
              // 동영상 미리보기
              <video className="h-full w-full rounded-2xl object-cover" controls>
                <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
              </video>
            ) : (
              // 썸네일 미리보기
              <img
                src={thumbnail!}
                alt="썸네일 미리보기"
                className="h-full w-full rounded-2xl object-cover"
              />
            )}

            {/* 제거 버튼 */}
            <button
              type="button"
              onClick={handleRemoveVideo}
              className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          // 업로드 안내 UI
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center">
              <CirclePlus strokeWidth={0.5} size={102} color="#aaa" />
            </div>

            <p className="text-sm leading-6 text-gray-500">
              동영상 파일을 드래그하거나 <br /> 클릭하여 업로드 하세요.
            </p>

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
    </div>
  )
}
