'use client'

import ShortsFormLayout from '@/features/register/components/ShortsFormLayout'
import useEditShortsForm from '@/hook/register/useEditShortsForm'
import type { ShortsEditInitialData } from '@/features/register/types/shortsEdit'

interface ShortsFormContainerEditProps {
  shortsId: number
  initialData: ShortsEditInitialData
}

/**
 * 숏츠 수정 폼 컨테이너
 */
export default function ShortsFormContainerEdit({
  shortsId,
  initialData,
}: ShortsFormContainerEditProps) {
  const {
    formData,
    videoData,
    isSubmitting,
    handleFormChange,
    handleVideoChange,
    handleUpdate,
    handleCancel,
    existingVideoUrl,
    existingThumbnailUrl,
  } = useEditShortsForm({ shortsId, initialData })

  return (
    <ShortsFormLayout
      formData={formData}
      videoData={videoData}
      onFormChange={handleFormChange}
      onVideoChange={handleVideoChange}
      onSubmit={handleUpdate}
      onCancel={handleCancel}
      isSubmitting={isSubmitting}
      isEditMode={true}
      existingVideoUrl={existingVideoUrl}
      existingThumbnailUrl={existingThumbnailUrl ?? undefined}
      submitText="수정하기"
    />
  )
}
