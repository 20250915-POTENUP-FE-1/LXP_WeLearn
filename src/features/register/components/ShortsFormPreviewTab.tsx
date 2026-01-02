'use client'

import { Button } from '@/components/ui/Button'
import { CirclePlus, ImageIcon, X } from 'lucide-react'

interface ShortsFormPreviewTabProps {
  type: 'video' | 'thumbnail'
  videoFile?: File | null
  videoInputRef?: React.RefObject<HTMLInputElement | null>
  onVideoUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void
  thumbnail?: string | null
  onRemove: () => void
}

export default function ShortsFormPreviewTab({
  type,
  videoFile,
  videoInputRef,
  onVideoUpload,
  thumbnail,
  onRemove,
}: ShortsFormPreviewTabProps) {
  // 동영상 미리보기 탭
  if (type === 'video') {
    if (videoFile) {
      return (
        <div className="relative h-full w-full">
          <video className="h-full w-full rounded-2xl object-cover" controls>
            <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
          </video>
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )
    }

    // 동영상 없을 때
    return (
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
          onChange={onVideoUpload}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => videoInputRef?.current?.click()}
          className="mt-4"
        >
          파일 선택
        </Button>
      </div>
    )
  }
  // 썸네일 미리보기 탭
  if (thumbnail) {
    return (
      <div className="relative h-full w-full">
        <img
          src={thumbnail}
          alt="썸네일 미리보기"
          className="h-full w-full rounded-2xl object-cover"
        />
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  // 썸네일 없을 때 안내 메시지
  return (
    <div className="text-center">
      <div className="mb-4 flex items-center justify-center">
        <ImageIcon strokeWidth={0.5} size={102} color="#aaa" />
      </div>
      <p className="text-sm leading-6 text-gray-500">
        썸네일이 없습니다. <br /> 썸네일을 업로드해주세요.
      </p>
    </div>
  )
}
