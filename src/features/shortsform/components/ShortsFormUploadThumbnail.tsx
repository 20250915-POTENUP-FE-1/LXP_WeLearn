'use client'

import { useEffect, useRef } from 'react'
import { ImageIcon, Lock } from 'lucide-react'
import ShortsFormPreviewFrame from './ShortsFormUploadPreview'
import ShortsFormEmptyState from './ShortsFormEmptyState'
import useThumbnailUpload from '@/hook/register/useThumbnailUpload'
import type { ShortsFormChangeHandler } from '@/types/shorts/shortsForm'
import { Button } from '@/components/ui/Button'

interface ShortsFormUploadThumbnailProps {
  thumbnail: string | null
  onChange: ShortsFormChangeHandler
  onDraggingChange?: (isDragging: boolean) => void
  isEditMode?: boolean
}

export default function ShortsFormUploadThumbnail({
  thumbnail,
  onChange,
  onDraggingChange,
  isEditMode = false,
}: ShortsFormUploadThumbnailProps) {
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
  // 수정 모드에서는 삭제 버튼 숨김 (onRemove를 undefined로)
  if (thumbnail) {
    return (
      <ShortsFormPreviewFrame onRemove={isEditMode ? undefined : handleRemoveThumbnail}>
        <img
          src={thumbnail}
          alt="썸네일 미리보기"
          className="h-full w-full rounded-2xl object-cover"
        />
        {/* 수정 모드 안내 */}
        {isEditMode && (
          <div className="absolute top-6 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-sm whitespace-nowrap text-white">
            <Lock size={12} />
            썸네일은 수정할 수 없습니다.
          </div>
        )}
      </ShortsFormPreviewFrame>
    )
  }

  // 수정 모드인데 썸네일이 없는 경우 (비정상 상태)
  if (isEditMode) {
    return (
      <ShortsFormEmptyState
        icon={<Lock strokeWidth={0.5} size={102} color="#aaa" />}
        description={
          <>
            썸네일을 불러올 수 없습니다. <br /> 페이지를 새로고침 해주세요.
          </>
        }
      />
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
