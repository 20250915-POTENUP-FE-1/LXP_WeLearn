'use client'

import { useEffect, useRef } from 'react'
import { ImageIcon } from 'lucide-react'
import ShortsFormPreviewFrame from './ShortsFormPreviewFrame'
import ShortsFormEmptyState from './ShortsFormEmptyState'
import useThumbnailUpload from '@/hook/register/useThumbnailUpload'
import { ShortsFormChangeHandler } from '@/features/register/types/shortsRegister'
import { Button } from '@/components/ui/Button'

interface ShortsFormThumbPreviewTabProps {
  thumbnail: string | null
  onChange: ShortsFormChangeHandler
  onDraggingChange?: (isDragging: boolean) => void
  isEditMode?: boolean
}

export default function ShortsFormThumbPreviewTab({
  thumbnail,
  onChange,
  onDraggingChange,
  isEditMode = false,
}: ShortsFormThumbPreviewTabProps) {
  const thumbnailInputRef = useRef<HTMLInputElement>(null)
  const {
    isDragging,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleThumbnailUpload,
    handleRemoveThumbnail,
  } = useThumbnailUpload({
    onChange,
    inputRef: thumbnailInputRef,
  })

  // 드래그 상태 변경 시 상위 컴포넌트에 알림
  useEffect(() => {
    onDraggingChange?.(isDragging)
  }, [isDragging, onDraggingChange])

  // 썸네일이 있으면 미리보기 렌더링
  // 수정 모드에서도 썸네일 변경/삭제 가능
  if (thumbnail) {
    return (
      <ShortsFormPreviewFrame onRemove={handleRemoveThumbnail}>
        <img
          src={thumbnail}
          alt="썸네일 미리보기"
          className="h-full w-full rounded-2xl object-cover"
        />
      </ShortsFormPreviewFrame>
    )
  }

  return (
    <div
      className="flex h-full w-full items-center justify-center"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <ShortsFormEmptyState
        icon={<ImageIcon strokeWidth={0.5} size={102} color="#aaa" />}
        description={
          <>
            썸네일이 없습니다. <br /> 썸네일을 업로드해주세요.
          </>
        }
        action={
          <>
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
              className="my-4"
            >
              파일 선택
            </Button>
          </>
        }
      />
    </div>
  )
}
