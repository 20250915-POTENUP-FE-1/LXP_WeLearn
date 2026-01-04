import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import {
  ShortsFormData,
  VideoPreviewData,
  INITIAL_SHORTS_FORM_DATA,
  INITIAL_VIDEO_PREVIEW_DATA,
} from '@/types/shortsRegister'
import { shortsFormValidation } from '@/utils/shortsFormValidation'
import { registerShorts } from '@/services/mypage/register.service'

interface UseRegisterFormParams {
  initialFormData?: Partial<ShortsFormData>
  initialVideoData?: Partial<VideoPreviewData>
  userId: number
}

export default function useRegisterForm(params: UseRegisterFormParams) {
  const router = useRouter()
  const { initialFormData, initialVideoData, userId } = params

  const buildInitialForm = () => ({
    ...INITIAL_SHORTS_FORM_DATA,
    ...initialFormData,
  })
  const buildInitialVideo = () => ({
    ...INITIAL_VIDEO_PREVIEW_DATA,
    ...initialVideoData,
  })

  const [formData, setFormData] = useState<ShortsFormData>(buildInitialForm)
  const [videoData, setVideoData] = useState<VideoPreviewData>(buildInitialVideo)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setFormData(buildInitialForm())
    setVideoData(buildInitialVideo())
  }, [initialFormData, initialVideoData])

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

    setIsSubmitting(true)

    try {
      const result = await registerShorts(formData, videoData, userId)

      if (result) {
        toast.success('등록이 완료되었습니다.')
        router.push('/mypage/myshorts')
      } else {
        toast.error('등록에 실패했습니다.')
      }
    } catch (error) {
      console.error('등록 실패:', error)
      toast.error(error instanceof Error ? error.message : '등록에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => router.back()

  const resetForm = () => {
    setFormData(buildInitialForm())
    setVideoData(buildInitialVideo())
  }

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
