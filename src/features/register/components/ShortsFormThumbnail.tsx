'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { X } from 'lucide-react'
import useThumbnail from '@/hook/useThumbnail'

interface ShortsFormThumbnailProps {
  value: string | null
  onChange: (value: string | null) => void
}

export default function ShortsFormThumbnail({ value, onChange }: ShortsFormThumbnailProps) {
  const thumbnailInputRef = useRef<HTMLInputElement>(null)
  const { handleThumbnailUpload, handleRemoveThumbnail } = useThumbnail({ onChange })

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
        variant="outline"
        onClick={() => thumbnailInputRef.current?.click()}
        className="mb-10 w-full"
      >
        썸네일 업로드
      </Button>

      {/* 썸네일 미리보기 */}
      {value && (
        <div className="relative mt-3 inline-block">
          <div className="h-44 w-32 overflow-hidden rounded-lg bg-gray-200">
            <img src={value} alt="썸네일 미리보기" className="h-full w-full object-cover" />
          </div>
          <button
            type="button"
            onClick={handleRemoveThumbnail}
            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}
