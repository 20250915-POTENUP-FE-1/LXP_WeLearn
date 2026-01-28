'use client'

import { startTransition, useActionState, useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { validateShortsForm, validateEditShortsForm } from '../shortsform.validation'
import { extractVideoDuration } from '@/utils/extractVideoDuration'
import { updateShortsAction } from '@/features/mypage/myshorts/myshorts.action'
import type { PresignedUrlResponse } from '@/services/shorts/upload.service'
import {
  type ShortsFormData,
  type VideoPreviewData,
  type CategoryOption,
  type ShortsEditInitialData,
  INITIAL_SHORTS_FORM_DATA,
  INITIAL_VIDEO_PREVIEW_DATA,
} from '@/features/shortsform/types/shortsForm'
import ShortsFormBasicInfo from './ShortsFormBasicInfo'
import ShortsFormMediaSection from './ShortsFormMediaSection'
import ShortsFormSubmitButtons from './ShortsFormSubmitButtons'
import KeywordContainer from './keyword/KeywordContainer'
import { confirmUploadAction, getPresignedUrlAction } from '../register.action'

interface ShortsFormContainerProps {
  categories: CategoryOption[]
  mode: 'create' | 'edit'
  initialData?: ShortsEditInitialData
  shortsId?: number
}

/**
 * 숏츠 등록/수정 폼 컨테이너
 *
 * - formData 상태 관리 (initialData로 초기화)
 * - 하위 컴포넌트 이벤트/상태 중앙 관리
 * - create: Presigned URL 발급 → S3 업로드 → 업로드 확정
 * - edit: updateShortsAction 호출
 */
export default function ShortsFormContainer({
  categories,
  mode,
  initialData,
  shortsId,
}: ShortsFormContainerProps) {
  // ========== 라우터 & 모드 ==========
  const router = useRouter()
  const isEditMode = mode === 'edit'

  // ========== 초기값 계산 (useMemo) ==========
  const buildInitialFormData = useMemo(
    (): ShortsFormData => ({
      ...INITIAL_SHORTS_FORM_DATA,
      ...(initialData?.formData ?? {}),
    }),
    [initialData?.formData],
  )

  const buildInitialVideoData = useMemo(
    (): VideoPreviewData => ({
      ...INITIAL_VIDEO_PREVIEW_DATA,
      ...(initialData?.videoData ?? {}),
    }),
    [initialData?.videoData],
  )

  // ========== 상태 정의 (useState) ==========
  const [formData, setFormData] = useState<ShortsFormData>(buildInitialFormData)
  const [videoData, setVideoData] = useState<VideoPreviewData>(buildInitialVideoData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadData, setUploadData] = useState<{
    videoFile: File
    thumbnailFile: File | null
  } | null>(null)

  // ========== 등록 모드 : 서버 액션 상태 ==========
  const [presignedState, presignedAction, isPending] = useActionState(getPresignedUrlAction, {
    success: false,
    message: '',
  })

  // ========== 사이드 이펙트 (useEffect) ==========
  // Presigned URL 발급 성공 시 S3 업로드 → 업로드 확정
  useEffect(() => {
    // Presigned URL 발급 실패
    if (presignedState.success === false && presignedState.message) {
      toast.error(presignedState.message)
      setIsUploading(false)
      setUploadData(null)
      return
    }

    // Presigned URL 발급 성공 → S3 업로드 진행
    if (!presignedState.success || !presignedState.data || !uploadData) return

    const handleS3UploadAndConfirm = async () => {
      const presigned = presignedState.data as PresignedUrlResponse

      try {
        // S3 업로드 헬퍼
        const uploadToS3 = async (presignedUrl: string, file: File) => {
          const res = await fetch(presignedUrl, {
            method: 'PUT',
            body: file,
            headers: { 'Content-Type': file.type },
          })
          if (!res.ok) throw new Error('S3 업로드 실패')
        }

        // 영상 업로드
        await uploadToS3(presigned.videoPresignedUrl, uploadData.videoFile)

        // 썸네일 업로드
        if (uploadData.thumbnailFile && presigned.thumbnailPresignedUrl) {
          await uploadToS3(presigned.thumbnailPresignedUrl, uploadData.thumbnailFile)
        }

        // 업로드 확정 요청
        const confirmResult = await confirmUploadAction({
          shortId: presigned.shortId,
          uploadId: presigned.uploadId,
          videoUrl: presigned.videoPresignedUrl.split('?')[0],
          thumbnailUrl: presigned.thumbnailPresignedUrl?.split('?')[0] || '',
        })

        if (confirmResult.success) {
          toast.success('업로드가 완료되었습니다.')
          router.push('/mypage/myshorts')
        } else {
          toast.error(confirmResult.message || '업로드 확정 실패')
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : '업로드 중 오류 발생')
      } finally {
        setIsUploading(false)
        setUploadData(null)
      }
    }

    handleS3UploadAndConfirm()
  }, [presignedState, uploadData, router])

  // ========== 핸들러 ==========
  // 폼 필드 변경
  const handleFormChange = useCallback(
    <K extends keyof ShortsFormData>(field: K, value: ShortsFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
    },
    [],
  )

  // 비디오 데이터 변경 불가
  const handleVideoChange = useCallback(
    <K extends keyof VideoPreviewData>(field: K, value: VideoPreviewData[K]) => {
      if (isEditMode && field === 'videoFile') {
        toast.warning('영상은 수정할 수 없습니다.')
        return
      }
      setVideoData((prev) => ({ ...prev, [field]: value }))
    },
    [isEditMode],
  )

  // 취소 버튼
  const handleCancel = useCallback(() => {
    router.back()
  }, [router])

  // 수정 모드: 숏츠 수정
  const handleUpdate = useCallback(async () => {
    if (isSubmitting || !shortsId) return

    const validation = validateEditShortsForm(formData)
    if (!validation.isValid) {
      const firstError = validation.errors[0]
      if (firstError) {
        toast.error(firstError.message)
      }
      return
    }

    setIsSubmitting(true)

    try {
      // 수정 요청에 사용할 FormData 생성
      const submitFormData = new FormData()
      submitFormData.append('shortsId', shortsId.toString())
      submitFormData.append('title', formData.title)
      submitFormData.append('description', formData.description || '')
      submitFormData.append('status', formData.isPublic ? 'PUBLISHED' : 'DRAFT')

      // 카테고리는 선택된 경우에만 전송 (빈 값 방지)
      if (formData.categoryId) {
        submitFormData.append('categoryId', formData.categoryId.toString())
      }

      // 키워드 목록 (배열 형태로 서버에 전달)
      formData.keywords.forEach((keyword) => {
        submitFormData.append('keywords', keyword)
      })

      // 숏츠 수정 요청
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
  }, [isSubmitting, shortsId, formData, router])

  // 폼 제출 (등록/수정 공통)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 수정 모드
    if (isEditMode) {
      handleUpdate()
      return
    }

    // 등록 모드: 유효성 검증
    const validationResult = validateShortsForm(formData, videoData)
    if (!validationResult.isValid) {
      const firstError = validationResult.errors[0]
      toast.error(firstError.message)
      return
    }

    const videoFile = videoData.videoFile!
    setIsUploading(true)

    // 등록 모드 : 비디오 시간 추출
    const durationSec = await extractVideoDuration(videoFile)

    // S3 업로드에 사용할 파일 정보 저장
    setUploadData({
      videoFile,
      thumbnailFile: formData.thumbnailFile ?? null,
    })

    // Presigned URL 발급 요청
    startTransition(() => {
      presignedAction({
        title: formData.title,
        description: formData.description || '',
        categoryId: formData.categoryId || 0,
        keywords: formData.keywords,
        durationSec,
        fileName: videoFile.name,
        fileSize: videoFile.size,
        contentType: videoFile.type,
      })
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* 왼쪽 - 기본 정보 입력 */}
        <div className="w-full lg:flex-1">
          <div className="rounded-2xl bg-gray-50 p-8">
            <ShortsFormBasicInfo
              formData={formData}
              categories={categories}
              onChange={handleFormChange}
            />

            {/* 키워드 - 클라이언트 */}
            <div className="pt-6">
              <KeywordContainer
                keywords={formData.keywords}
                keywordInput={formData.keywordInput}
                onChange={handleFormChange}
              />
            </div>
          </div>
        </div>

        {/* 오른쪽 - 미디어 업로드 */}
        <div className="w-full space-y-6 lg:w-96">
          <ShortsFormMediaSection
            formData={formData}
            videoData={videoData}
            onFormChange={handleFormChange}
            onVideoChange={handleVideoChange}
            isEditMode={isEditMode}
            existingVideoUrl={initialData?.videoUrl}
            existingThumbnailUrl={initialData?.thumbnailUrl ?? undefined}
          />

          {/* 제출 버튼 */}
          <ShortsFormSubmitButtons
            onCancel={handleCancel}
            isLoading={isSubmitting || isUploading || isPending}
            submitText={isEditMode ? '수정하기' : '등록하기'}
          />
        </div>
      </div>
    </form>
  )
}
