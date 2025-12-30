'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/Button'

interface ShortsFormThumbnailProps {
  thumbnail: string | null
  setThumbnail: (value: string | null) => void
}

export default function ShortsFormThumbnail({ thumbnail, setThumbnail }: ShortsFormThumbnailProps) {
  const thumbnailInputRef = useRef<HTMLInputElement>(null)

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnail(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveThumbnail = () => {
    setThumbnail(null)
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">썸네일</label>
      <input
        ref={thumbnailInputRef}
        type="file"
        accept="image/*"
        onChange={handleThumbnailUpload}
        className="hidden"
      />
      <Button
        type="button"
        variant="secondary"
        onClick={() => thumbnailInputRef.current?.click()}
        className="w-full"
      >
        썸네일 업로드
      </Button>

      {/* 썸네일 미리보기 */}
      {thumbnail && (
        <div className="relative mt-3 inline-block">
          <div className="h-44 w-32 overflow-hidden rounded-lg bg-gray-200">
            <img src={thumbnail} alt="썸네일 미리보기" className="h-full w-full object-cover" />
          </div>
          <button
            type="button"
            onClick={handleRemoveThumbnail}
            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
