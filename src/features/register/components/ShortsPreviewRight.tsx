'use client'

import { useRef } from 'react'
import { Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ShortsPreviewRightProps {
  thumbnail: string | null
  videoFile: File | null
  setVideoFile: (value: File | null) => void
  isDragging: boolean
  setIsDragging: (value: boolean) => void
  onSubmit: () => void
  onCancel: () => void
}

export default function ShortsPreviewRight({
  thumbnail,
  videoFile,
  setVideoFile,
  isDragging,
  setIsDragging,
  onSubmit,
  onCancel,
}: ShortsPreviewRightProps) {
  const videoInputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0 && files[0].type.startsWith('video/')) {
      setVideoFile(files[0])
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file)
    }
  }

  const handleRemoveVideo = () => {
    setVideoFile(null)
  }

  return (
    <div className="space-y-6">
      {/* 숏츠 업로드 버튼 */}
      <Button type="button" variant="secondary" className="w-full">
        숏츠 업로드
      </Button>

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
        {thumbnail || videoFile ? (
          <div className="relative h-full w-full">
            {videoFile ? (
              <div className="relative h-full w-full">
                <video className="h-full w-full rounded-2xl object-cover" controls>
                  <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
                </video>
                <button
                  type="button"
                  onClick={handleRemoveVideo}
                  className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : thumbnail ? (
              <img
                src={thumbnail}
                alt="Thumbnail preview"
                className="h-full w-full rounded-2xl object-cover"
              />
            ) : null}
          </div>
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-black">
              <Plus className="h-12 w-12 text-black" />
            </div>
            <p className="text-sm text-gray-500">동영상을 드래그하거나 클릭하여 업로드</p>
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="hidden"
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => videoInputRef.current?.click()}
              className="mt-4"
            >
              파일 선택
            </Button>
          </div>
        )}
      </div>

      {/* 등록하기 버튼 */}
      <Button type="button" variant="primary" onClick={onSubmit} className="w-full py-4">
        등록하기
      </Button>

      {/* 취소 버튼 */}
      <Button type="button" variant="secondary" onClick={onCancel} className="w-full py-4">
        취소
      </Button>
    </div>
  )
}
