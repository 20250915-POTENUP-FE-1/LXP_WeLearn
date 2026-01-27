'use client'

import { startTransition, useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { getPresignedUrlAction, confirmUploadAction } from '../register.action'
import { validateShortsForm } from '../register.validation'
import { extractVideoDuration } from '@/utils/extractVideoDuration'
import type { PresignedUrlResponse } from '@/services/shorts/upload.service'
import type {
  ShortsFormData,
  VideoPreviewData,
  CategoryOption,
  ShortsFormChangeHandler,
  VideoPreviewChangeHandler,
} from '@/features/shortsform/types/shortsForm'
import ShortsFormBasicInfo from './ShortsFormBasicInfo'
import ShortsFormMediaSection from './ShortsFormMediaSection'
import ShortsFormSubmitButtons from './ShortsFormSubmitButtons'
import KeywordContainer from './keyword/KeywordContainer'

interface ShortsFormContainerProps {
  // 폼 데이터
  formData: ShortsFormData
  videoData: VideoPreviewData
  categories: CategoryOption[]

  // 핸들러
  onFormChange: ShortsFormChangeHandler
  onVideoChange: VideoPreviewChangeHandler // 등록 모드: 드래그 상태 관리에 필수
  onSubmit?: () => void // 수정 모드 전용
  onCancel: () => void

  isSubmitting: boolean
  isEditMode?: boolean
  existingVideoUrl?: string
  existingThumbnailUrl?: string
  submitText?: string
}

/**
 * 숏츠 등록/수정 폼 콘텐츠
 *
 * 등록 모드: Presigned URL 발급 → S3 업로드 → 업로드 확정
 * 수정 모드: onSubmit 핸들러 호출 (useEditShortsForm에서 처리)
 */
export default function ShortsFormContainer({
  formData,
  videoData,
  categories,
  onFormChange,
  onVideoChange,
  onSubmit,
  onCancel,
  isSubmitting,
  isEditMode = false,
  existingVideoUrl,
  existingThumbnailUrl,
  submitText = '등록하기',
}: ShortsFormContainerProps) {
  const router = useRouter()

  // 등록 모드: S3 업로드 상태
  const [isUploading, setIsUploading] = useState(false)
  const [uploadData, setUploadData] = useState<{
    videoFile: File
    thumbnailFile: File | null
  } | null>(null)

  // 등록 모드: Presigned URL 발급
  const [presignedState, presignedAction, isPending] = useActionState(getPresignedUrlAction, {
    success: false,
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 수정 모드: onSubmit 핸들러 사용
    if (isEditMode && onSubmit) {
      onSubmit()
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

    // 비디오 시간 추출
    const durationSec = await extractVideoDuration(videoFile)

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

  // Presigned URL 발급 성공 시 S3 업로드 → 업로드 확정
  // router: Next.js useRouter()는 안정적인 참조를 반환하므로 불필요한 재실행 없음
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* 왼쪽 - 기본 정보 입력 */}
        <div className="w-full lg:flex-1">
          <div className="rounded-2xl bg-gray-50 p-8">
            <ShortsFormBasicInfo
              formData={formData}
              categories={categories}
              onChange={onFormChange}
            />

            {/* 키워드 - 클라이언트 */}
            <div className="pt-6">
              <KeywordContainer
                keywords={formData.keywords}
                keywordInput={formData.keywordInput}
                onChange={onFormChange}
              />
            </div>
          </div>
        </div>

        {/* 오른쪽 - 미디어 업로드 */}
        <div className="w-full space-y-6 lg:w-96">
          <ShortsFormMediaSection
            formData={formData}
            videoData={videoData}
            onFormChange={onFormChange}
            onVideoChange={onVideoChange}
            isEditMode={isEditMode}
            existingVideoUrl={existingVideoUrl}
            existingThumbnailUrl={existingThumbnailUrl}
          />

          <ShortsFormSubmitButtons
            onCancel={onCancel}
            isLoading={isSubmitting || isUploading || isPending}
            submitText={submitText}
          />
        </div>
      </div>
    </form>
  )
}
