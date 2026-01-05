import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import {
  ShortsFormData,
  VideoPreviewData,
  INITIAL_SHORTS_FORM_DATA,
  INITIAL_VIDEO_PREVIEW_DATA,
} from '@/types/shortsRegister'
import { shortsFormValidation } from '@/utils/shortsFormValidation'
import { registerShortsAction } from '@/features/register/register.action'

interface UseRegisterFormParams {
  initialFormData?: Partial<ShortsFormData>
  initialVideoData?: Partial<VideoPreviewData>
  userId: number
}

export default function useRegisterForm(params: UseRegisterFormParams) {
  const router = useRouter()
  const { initialFormData, initialVideoData, userId } = params

  const buildInitialForm = useCallback(
    () => ({
      ...INITIAL_SHORTS_FORM_DATA,
      ...initialFormData,
    }),
    [initialFormData],
  )

  const buildInitialVideo = useCallback(
    () => ({
      ...INITIAL_VIDEO_PREVIEW_DATA,
      ...initialVideoData,
    }),
    [initialVideoData],
  )

  const [formData, setFormData] = useState<ShortsFormData>(buildInitialForm)
  const [videoData, setVideoData] = useState<VideoPreviewData>(buildInitialVideo)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setFormData(buildInitialForm())
    setVideoData(buildInitialVideo())
  }, [buildInitialForm, buildInitialVideo])

  const handleFormChange = <K extends keyof ShortsFormData>(field: K, value: ShortsFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleVideoChange = <K extends keyof VideoPreviewData>(
    field: K,
    value: VideoPreviewData[K],
  ) => {
    setVideoData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRegister = async () => {
    if (isSubmitting) return

    const validation = shortsFormValidation(formData, videoData, true)
    if (!validation.isValid) {
      return
    }

    if (!videoData.videoFile) {
      toast.error('비디오 파일이 없습니다.')
      return
    }

    if (!formData.categoryId) {
      toast.error('카테고리를 선택해주세요.')
      return
    }

    setIsSubmitting(true)

    try {
      // 서버 액션 호출
      const result = await registerShortsAction(
        {
          userId,
          categoryId: formData.categoryId,
          title: formData.title,
          description: formData.description || undefined,
          keywords: formData.keywords.length > 0 ? formData.keywords : undefined,
          thumbnail: formData.thumbnail,
        },
        videoData.videoFile,
        videoData.durationSec ?? undefined,
      )

      //  ActionState 기반 응답 처리
      if (result.success) {
        toast.success(result.message || '등록이 완료되었습니다.')
        router.push('/mypage/myshorts')
      } else {
        toast.error(result.message || '등록에 실패했습니다.')
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '등록에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => router.back()

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
    handleRegister,
    handleCancel,
    resetForm,
  }
}
