'use client'

import { ShortsFormLeftSection } from '@/features/register/components'
import ShortsVideoPreview from '@/features/register/components/ShortsFormRightSection'
import ShortsFormSubmitButtons from '@/features/register/components/ShortsFormSubmitButtons'
import useRegisterForm from '@/hook/register/useRegisterForm'

export default function ShortsFormContainer() {
  const {
    formData,
    videoData,
    isSubmitting,
    handleFormChange,
    handleVideoChange,
    handleRegister,
    handleCancel,
  } = useRegisterForm()

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
      {/* 왼쪽 - 숏츠 정보 입력 폼 */}
      <div className="w-full lg:flex-1">
        <ShortsFormLeftSection formData={formData} onChange={handleFormChange} />
      </div>

      {/* 오른쪽 - 미리보기 및 업로드 */}
      <div className="w-full space-y-6 lg:w-96">
        <ShortsVideoPreview
          videoData={videoData}
          onChange={handleVideoChange}
          thumbnail={formData.thumbnail}
          onFormChange={handleFormChange}
        />

        <ShortsFormSubmitButtons
          onRegister={handleRegister}
          onCancel={handleCancel}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  )
}
