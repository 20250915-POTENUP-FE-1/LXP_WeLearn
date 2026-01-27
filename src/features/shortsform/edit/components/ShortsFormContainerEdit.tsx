'use client'

import useEditShortsForm from '@/hook/register/useEditShortsForm'
import ShortsFormContainer from '@/features/shortsform/register/components/ShortsFormContainer'
import type { ShortsEditInitialData, CategoryOption } from '@/features/shortsform/types/shortsForm'

interface ShortsFormContainerEditProps {
  shortsId: number
  initialData: ShortsEditInitialData
  categories: CategoryOption[]
}

/**
 * 숏츠 수정 폼 컨테이너 (클라이언트 컴포넌트)
 */
export default function ShortsFormContainerEdit({
  shortsId,
  initialData,
  categories,
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
    <ShortsFormContainer
      formData={formData}
      videoData={videoData}
      categories={categories}
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
