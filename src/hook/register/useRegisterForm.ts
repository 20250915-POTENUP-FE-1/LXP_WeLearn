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
import { createUploadPayload, uploadShorts } from '@/services/shortsform.service'

// 수정 페이지에서 기존 데이터를 초기값으로 사용
interface UseRegisterFormParams {
  initialFormData?: Partial<ShortsFormData>
  initialVideoData?: Partial<VideoPreviewData>
}

export default function useRegisterForm(params: UseRegisterFormParams = {}) {
  const router = useRouter()
  const { initialFormData, initialVideoData } = params

  // 초기값 병합 함수
  const buildInitialForm = () => ({
    ...INITIAL_SHORTS_FORM_DATA,
    ...initialFormData,
  })
  const buildInitialVideo = () => ({
    ...INITIAL_VIDEO_PREVIEW_DATA,
    ...initialVideoData,
  })

  // 상태 관리 ( 폼 데이터, 비디오 데이터, 제출 상태 )
  const [formData, setFormData] = useState<ShortsFormData>(buildInitialForm)
  const [videoData, setVideoData] = useState<VideoPreviewData>(buildInitialVideo)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 초기값이 변경될 때 상태 재설정 (값이 변경되면 폼 상태를 다시 초기화)
  useEffect(() => {
    setFormData(buildInitialForm())
    setVideoData(buildInitialVideo())
  }, [initialFormData, initialVideoData])

  // 폼 필드 변경 핸들러
  const handleFormChange = <K extends keyof ShortsFormData>(field: K, value: ShortsFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // 비디오 필드 변경 핸들러
  const handleVideoChange = <K extends keyof VideoPreviewData>(
    field: K,
    value: VideoPreviewData[K],
  ) => {
    setVideoData((prev) => ({ ...prev, [field]: value }))
  }

  // 숏츠 등록 처리
  const handleRegister = async () => {
    // 중복 클릭 방지
    if (isSubmitting) return

    // 유효성 검사 (실패 시 토스트 메시지)
    const validation = shortsFormValidation(formData, videoData, false)
    if (!validation.isValid) {
      toast.error(validation.message)
      return
    }

    setIsSubmitting(true)

    try {
      // 업로드 페이로드 생성
      const payload = createUploadPayload(formData, videoData)
      //등록 API 호출
      await uploadShorts(payload)

      toast.success('등록이 완료되었습니다.')
      router.push('/mypage/myshorts')
    } catch (error) {
      console.error('등록 실패:', error)
      toast.error('등록에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // 등록 취소 처리
  const handleCancel = () => router.back()

  // 폼 및 비디오 데이터 초기화
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
