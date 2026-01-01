import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import {
  ShortsFormData,
  VideoPreviewData,
  INITIAL_SHORTS_FORM_DATA,
  INITIAL_VIDEO_PREVIEW_DATA,
} from '@/types/shortsRegister'

export default function useRegisterForm() {
  const router = useRouter()

  // 폼 데이터 상태
  const [formData, setFormData] = useState<ShortsFormData>(INITIAL_SHORTS_FORM_DATA)

  // 비디오 프리뷰 상태
  const [videoData, setVideoData] = useState<VideoPreviewData>(INITIAL_VIDEO_PREVIEW_DATA)

  // 로딩 상태
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 폼 데이터 변경 핸들러
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

  // 유효성 검사
  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      toast.error('제목을 입력해주세요.')
      return false
    }
    if (formData.categoryId === null) {
      toast.error('카테고리를 선택해주세요.')
      return false
    }
    if (!videoData.videoFile) {
      toast.error('영상을 업로드해주세요.')
      return false
    }
    return true
  }

  // 숏츠 등록
  const handleRegister = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // TODO: API 연동 시 실제 업로드 로직으로 교체
      const payload = {
        title: formData.title,
        description: formData.description,
        isPublic: formData.isPublic,
        categoryId: formData.categoryId,
        keywords: formData.keywords,
        thumbnail: formData.thumbnail,
        videoFile: videoData.videoFile?.name,
        durationSec: videoData.durationSec,
      }

      console.log('📤 등록 요청 데이터:', payload)

      // TODO: API 호출
      // await uploadShorts(payload)

      toast.success('등록이 완료되었습니다.')
      router.push('/mypage/myshorts')
    } catch (error) {
      console.error('등록 실패:', error)
      toast.error('등록에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // 등록 취소
  const handleCancel = () => {
    router.back()
  }

  // 폼 초기화
  const resetForm = () => {
    setFormData(INITIAL_SHORTS_FORM_DATA)
    setVideoData(INITIAL_VIDEO_PREVIEW_DATA)
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
