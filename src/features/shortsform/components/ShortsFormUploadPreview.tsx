'use client'

import React from 'react'
import { X } from 'lucide-react'

export default function ShortsFormUploadPreview({
  children,
  onRemove,
}: {
  children: React.ReactNode
  onRemove?: () => void
}) {
  return (
    <div className="relative h-full w-full">
      {/* 미리보기 콘텐츠 */}
      {children}
      {/* 삭제 버튼 - onRemove가 있을 때만 표시 */}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
          aria-label="삭제"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
