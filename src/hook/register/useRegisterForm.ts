import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import {
  ShortsFormData,
  VideoPreviewData,
  INITIAL_SHORTS_FORM_DATA,
  INITIAL_VIDEO_PREVIEW_DATA,
} from '@/features/register/types/shortsRegister'
import { validateShortsForm } from '@/features/register/register.validation'
import { shortsUploadApi } from '@/services/shorts/upload.service'

interface UseRegisterFormParams {
  initialFormData?: Partial<ShortsFormData>
  initialVideoData?: Partial<VideoPreviewData>
}

/**
 * 숏츠 등록 폼 상태 및 로직을 관리하는 커스텀 훅
 */
export default function useRegisterForm(params: UseRegisterFormParams = {}) {
  const router = useRouter()
  const { initialFormData, initialVideoData } = params

  // 초기 폼 데이터 생성 함수
  const buildInitialForm = useCallback(
    () => ({
      ...INITIAL_SHORTS_FORM_DATA,
      ...initialFormData,
    }),
    [initialFormData],
  )

  // 초기 비디오 데이터 생성 함수
  const buildInitialVideo = useCallback(
    () => ({
      ...INITIAL_VIDEO_PREVIEW_DATA,
      ...initialVideoData,
    }),
    [initialVideoData],
  )

  // 상태 정의
  const [formData, setFormData] = useState<ShortsFormData>(buildInitialForm)
  const [videoData, setVideoData] = useState<VideoPreviewData>(buildInitialVideo)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 초기 데이터 변경 시 폼 초기화
  useEffect(() => {
    setFormData(buildInitialForm())
    setVideoData(buildInitialVideo())
  }, [buildInitialForm, buildInitialVideo])

  // 폼 필드 변경 핸들러
  const handleFormChange = <K extends keyof ShortsFormData>(field: K, value: ShortsFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // 비디오 데이터 변경 핸들러
  const handleVideoChange = <K extends keyof VideoPreviewData>(
    field: K,
    value: VideoPreviewData[K],
  ) => {
    setVideoData((prev) => ({ ...prev, [field]: value }))
  }

  // 취소 핸들러
  const handleCancel = () => router.back()

  // 폼 초기화 함수
  const resetForm = useCallback(() => {
    setFormData(buildInitialForm())
    setVideoData(buildInitialVideo())
  }, [buildInitialForm, buildInitialVideo])

  return {
    formData,
    videoData,
    isSubmitting,
    handleFormChange,
    handleVideoChange,
    // handleRegister,
    handleCancel,
    resetForm,
  }
}
