import { useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import {
  ShortsFormData,
  VideoPreviewData,
  ShortsEditInitialData,
  INITIAL_SHORTS_FORM_DATA,
  INITIAL_VIDEO_PREVIEW_DATA,
} from '@/features/shortsform/types/shortsForm'
import {
  validateTitle,
  validateDescription,
  validateCategoryId,
  validateKeywords,
} from '@/features/shortsform/register/register.validation'
import { updateShortsAction } from '@/features/mypage/myshorts/myshorts.action'

interface UseEditShortsFormParams {
  shortsId: number
  initialData: ShortsEditInitialData
}

/**
 * 숏츠 수정 폼 상태 및 로직을 관리하는 커스텀 훅
 */
export default function useEditShortsForm({ shortsId, initialData }: UseEditShortsFormParams) {
  const router = useRouter()

  // 초기 폼 데이터 구성
  const initialFormData: ShortsFormData = useMemo(
    () => ({
      ...INITIAL_SHORTS_FORM_DATA,
      ...initialData.formData,
    }),
    [initialData.formData],
  )

  // 초기 비디오 데이터 구성 (수정 모드에서는 기존 영상 URL 사용)
  const initialVideoData: VideoPreviewData = useMemo(
    () => ({
      ...INITIAL_VIDEO_PREVIEW_DATA,
      ...initialData.videoData,
    }),
    [initialData.videoData],
  )

  // 상태 정의
  const [formData, setFormData] = useState<ShortsFormData>(initialFormData)
  const [videoData, setVideoData] = useState<VideoPreviewData>(initialVideoData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 폼 필드 변경 핸들러
  const handleFormChange = useCallback(
    <K extends keyof ShortsFormData>(field: K, value: ShortsFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
    },
    [],
  )

  // 비디오 데이터 변경 핸들러 (수정 모드에서는 영상, 썸네일 파일 변경 불가)
  const handleVideoChange = useCallback(
    <K extends keyof VideoPreviewData>(field: K, value: VideoPreviewData[K]) => {
      // 영상 파일 변경 시도 시 무시 (수정 모드에서는 영상 변경 불가)
      if (field === 'videoFile') {
        toast.warning('영상은 수정할 수 없습니다.')
        return
      }
      setVideoData((prev) => ({ ...prev, [field]: value }))
    },
    [],
  )

  // 수정 유효성 검사 (영상 파일 제외)
  const validateEditForm = useCallback(() => {
    const errors = []

    const titleError = validateTitle(formData.title)
    if (titleError) errors.push(titleError)

    const descriptionError = validateDescription(formData.description)
    if (descriptionError) errors.push(descriptionError)

    const categoryError = validateCategoryId(formData.categoryId)
    if (categoryError) errors.push(categoryError)

    const keywordsError = validateKeywords(formData.keywords)
    if (keywordsError) errors.push(keywordsError)

    return {
      isValid: errors.length === 0,
      errors,
    }
  }, [formData])

  // 숏츠 수정 핸들러
  const handleUpdate = useCallback(async () => {
    if (isSubmitting) return

    // 유효성 검사
    const validation = validateEditForm()
    if (!validation.isValid) {
      const firstError = validation.errors[0]
      if (firstError) {
        toast.error(firstError.message)
      }
      return
    }

    setIsSubmitting(true)

    try {
      // FormData 생성
      const submitFormData = new FormData()
      submitFormData.append('shortsId', shortsId.toString())
      submitFormData.append('title', formData.title)
      submitFormData.append('description', formData.description || '')
      submitFormData.append('categoryId', formData.categoryId?.toString() || '')
      submitFormData.append('status', formData.isPublic ? 'PUBLISHED' : 'DRAFT')

      // 키워드 추가
      formData.keywords.forEach((keyword) => {
        submitFormData.append('keywords', keyword)
      })

      // 썸네일 처리 (수정 모드에서는 썸네일 변경 불가)
      if (formData.thumbnail) {
        submitFormData.append('thumbnailUrl', formData.thumbnail)
      }

      const result = await updateShortsAction({ success: false, message: '' }, submitFormData)

      if (result.success) {
        toast.success(result.message || '수정이 완료되었습니다.')
        router.push('/mypage/myshorts')
      } else {
        toast.error(result.message || '수정에 실패했습니다.')
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '수정에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }, [isSubmitting, validateEditForm, shortsId, formData, router])

  // 취소 핸들러
  const handleCancel = useCallback(() => {
    router.back()
  }, [router])

  // 폼 초기화 함수
  const resetForm = useCallback(() => {
    setFormData(initialFormData)
    setVideoData(initialVideoData)
  }, [initialFormData, initialVideoData])

  return {
    // 상태
    formData,
    videoData,
    isSubmitting,

    // 핸들러
    handleFormChange,
    handleVideoChange,
    handleUpdate,
    handleCancel,
    resetForm,

    // 기존 영상/썸네일 URL (미리보기용)
    existingVideoUrl: initialData.videoUrl,
    existingThumbnailUrl: initialData.thumbnailUrl,
  }
}
