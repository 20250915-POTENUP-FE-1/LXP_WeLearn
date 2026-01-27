'use client'

import useRegisterForm from '@/hook/register/useRegisterForm'
import ShortsFormContainer from './ShortsFormContainer'
import type { CategoryOption } from '@/features/shortsform/types/shortsForm'

interface ShortsFormContainerRegisterProps {
  categories: CategoryOption[]
}

/**
 * 숏츠 등록 폼 컨테이너 (클라이언트 컴포넌트)
 */
export default function ShortsFormContainerRegister({
  categories,
}: ShortsFormContainerRegisterProps) {
  const { formData, videoData, isSubmitting, handleFormChange, handleVideoChange, handleCancel } =
    useRegisterForm()

  return (
    <ShortsFormContainer
      formData={formData}
      videoData={videoData}
      categories={categories}
      onFormChange={handleFormChange}
      onVideoChange={handleVideoChange}
      onCancel={handleCancel}
      isSubmitting={isSubmitting}
      submitText="등록하기"
    />
  )
}
