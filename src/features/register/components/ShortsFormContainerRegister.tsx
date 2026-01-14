'use client'

import ShortsFormLayout from '@/features/register/components/ShortsFormLayout'
import useRegisterForm from '@/hook/register/useRegisterForm'

/**
 * 숏츠 등록 폼 컨테이너
 */
export default function ShortsFormContainerRegister() {
  const {
    formData,
    videoData,
    isSubmitting,
    handleFormChange,
    handleVideoChange,
    // handleRegister,
    handleCancel,
  } = useRegisterForm()

  return (
    <ShortsFormLayout
      formData={formData}
      videoData={videoData}
      onFormChange={handleFormChange}
      onVideoChange={handleVideoChange}
      // onSubmit={handleRegister}
      onCancel={handleCancel}
      isSubmitting={isSubmitting}
      submitText="등록하기"
    />
  )
}
