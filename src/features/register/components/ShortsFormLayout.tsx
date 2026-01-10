'use client'

import { ShortsFormLeftSection } from '@/features/register/components'
import ShortsVideoPreview from '@/features/register/components/ShortsFormRightSection'
import ShortsFormSubmitButtons from '@/features/register/components/ShortsFormSubmitButtons'
import type { ShortsFormData, VideoPreviewData } from '@/features/register/types/shortsRegister'

interface ShortsFormLayoutProps {
  // 폼 데이터
  formData: ShortsFormData
  videoData: VideoPreviewData

  // 핸들러
  onFormChange: <K extends keyof ShortsFormData>(field: K, value: ShortsFormData[K]) => void
  onVideoChange: <K extends keyof VideoPreviewData>(field: K, value: VideoPreviewData[K]) => void
  onSubmit: () => void
  onCancel: () => void

  // 상태
  isSubmitting: boolean

  // 수정 모드
  isEditMode?: boolean
  existingVideoUrl?: string
  existingThumbnailUrl?: string

  // 버튼 텍스트
  submitText?: string
}

/**
 * 숏츠 등록/수정 폼 공통 레이아웃
 */
export default function ShortsFormLayout({
  formData,
  videoData,
  onFormChange,
  onVideoChange,
  onSubmit,
  onCancel,
  isSubmitting,
  isEditMode = false,
  existingVideoUrl,
  existingThumbnailUrl,
  submitText = '등록하기',
}: ShortsFormLayoutProps) {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
      {/* 왼쪽 - 숏츠 정보 입력 폼 */}
      <div className="w-full lg:flex-1">
        <ShortsFormLeftSection formData={formData} onChange={onFormChange} />
      </div>

      {/* 오른쪽 - 미리보기 및 업로드 */}
      <div className="w-full space-y-6 lg:w-96">
        <ShortsVideoPreview
          videoData={videoData}
          onChange={onVideoChange}
          thumbnail={formData.thumbnail}
          onFormChange={onFormChange}
          existingVideoUrl={existingVideoUrl}
          existingThumbnailUrl={existingThumbnailUrl}
          isEditMode={isEditMode}
        />

        <ShortsFormSubmitButtons
          onRegister={onSubmit}
          onCancel={onCancel}
          isLoading={isSubmitting}
          submitText={submitText}
        />
      </div>
    </div>
  )
}
