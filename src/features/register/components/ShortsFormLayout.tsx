'use client'

import { startTransition, useActionState, useEffect, useMemo, useRef, useState } from 'react'
import { ImageIcon, VideoIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ShortsFormInputs from '@/features/register/components/ShortsFormInputs'
import ShortsFormCategory from '@/features/register/components/ShortsFormCategory'
import ShortsFormKeywords from '@/features/register/components/ShortsFormKeywords'
import ShortsFormSubmitButtons from '@/features/register/components/ShortsFormSubmitButtons'
import ShortsFormUploadTab from '@/features/register/components/ShortsFormUploadTab'
import useVideoUpload from '@/hook/register/useVideoUpload'
import usePreviewTab from '@/hook/register/usePreviewTab'
import type { ShortsFormData, VideoPreviewData } from '@/features/register/types/shortsRegister'
import { getPresignedUrlAction, confirmUploadAction } from '../register.action'
import { toast } from 'react-toastify'
import { extractVideoDuration } from '@/utils/extractVideoDuration'
import { validateShortsForm } from '../register.validation'
import { PresignedUrlResponse } from '@/types/shorts/shorts'

interface ShortsFormLayoutProps {
  // 폼 데이터
  formData: ShortsFormData
  videoData: VideoPreviewData

  // 핸들러
  onFormChange: <K extends keyof ShortsFormData>(field: K, value: ShortsFormData[K]) => void
  onVideoChange: <K extends keyof VideoPreviewData>(field: K, value: VideoPreviewData[K]) => void
  onSubmit?: () => void
  onCancel: () => void

  // 상태
  isSubmitting: boolean

  // 수정 모드
  isEditMode?: boolean
  existingVideoUrl?: string
  existingThumbnailUrl?: string
  isThumbnailDeleted?: boolean

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
  isThumbnailDeleted = false,
  submitText = '등록하기',
}: ShortsFormLayoutProps) {
  const router = useRouter()

  // === 오른쪽 섹션 로직 (기존 ShortsFormRightSection) ===

  const { videoFile, isDragging: isVideoDragging } = videoData
  const [isThumbnailDragging, setIsThumbnailDragging] = useState(false)
  const isDragging = isVideoDragging || isThumbnailDragging
  const videoInputRef = useRef<HTMLInputElement>(null)

  // S3 업로드용 상태
  const [isUploading, setIsUploading] = useState(false)
  const [uploadData, setUploadData] = useState<{
    videoFile: File
    thumbnailFile: File | null
  } | null>(null)

  // 1단계: Presigned URL 발급 (useActionState)
  const [presignedState, presignedAction, isPending] = useActionState(getPresignedUrlAction, {
    success: false,
    message: '',
  })

  /**
   * 썸네일 이미지 소스
   *
   * 우선순위:
   * 1. 사용자가 썸네일을 삭제한 경우 → null
   * 2. 새로 업로드한 썸네일이 있는 경우 → formData.thumbnail
   * 3. 기존 썸네일이 있는 경우 (수정 모드) → existingThumbnailUrl
   * 4. 그 외 → null
   */
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

    // 유효성 검증 통과 시 videoFile은 null이 아님
    const videoFile = videoData.videoFile!

    setIsUploading(true)

    const durationSec = await extractVideoDuration(videoFile)

    // 업로드할 파일 저장 (useEffect에서 사용)
    setUploadData({
      videoFile,
      thumbnailFile: formData.thumbnailFile ?? null,
    })

    // 1️⃣ Presigned URL 발급 요청 (useActionState)
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

  // 2단계: Presigned URL 발급 성공 시 S3 업로드 + 3단계 확정
  useEffect(() => {
    if (presignedState.success && presignedState.data && uploadData) {
      const handleS3UploadAndConfirm = async () => {
        const presigned = presignedState.data as PresignedUrlResponse

        try {
          // 2️⃣ S3 업로드 (클라이언트 직접)
          const uploadToS3 = async (presignedUrl: string, file: File) => {
            const res = await fetch(presignedUrl, {
              method: 'PUT',
              body: file,
              headers: { 'Content-Type': file.type },
            })
            if (!res.ok) throw new Error('S3 업로드 실패')
          }

          await uploadToS3(presigned.videoPresignedUrl, uploadData.videoFile)

          if (uploadData.thumbnailFile && presigned.thumbnailPresignedUrl) {
            await uploadToS3(presigned.thumbnailPresignedUrl, uploadData.thumbnailFile)
          }

          // 3️⃣ 업로드 확정 (Server Action 직접 호출)
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
    } else if (presignedState.success === false && presignedState.message) {
      toast.error(presignedState.message)
      setIsUploading(false)
      setUploadData(null)
    }
  }, [presignedState, uploadData])

  // 비디오 소스 메모이제이션
  const videoSrc = useMemo(() => {
    if (isEditMode && existingVideoUrl) {
      return existingVideoUrl
    }
    if (!videoFile) return null
    return URL.createObjectURL(videoFile)
  }, [isEditMode, existingVideoUrl, videoFile])

  // 메모리 누수 방지
  useEffect(() => {
    return () => {
      if (videoSrc && !isEditMode) {
        URL.revokeObjectURL(videoSrc)
      }
    }
  }, [videoSrc, isEditMode])

  const getThumbnailSource = (): string | null => {
    if (isThumbnailDeleted) {
      return null
    }
    if (formData.thumbnail) {
      return formData.thumbnail
    }
    if (existingThumbnailUrl) {
      return existingThumbnailUrl
    }
    return null
  }
  const thumbnailSrc = getThumbnailSource()

  const {
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleRemoveVideo,
    handleVideoUpload,
  } = useVideoUpload({ onChange: onVideoChange, inputRef: videoInputRef })

  const handleThumbnailRemove = () => {
    onFormChange('thumbnail', null)
  }

  const { isVideoTab, isThumbnailTab, switchToVideo, switchToThumbnail, handleRemove } =
    usePreviewTab({
      onVideoRemove: handleRemoveVideo,
      onThumbnailRemove: handleThumbnailRemove,
    })

  /**
   * 드래그 앤 드롭 이벤트 핸들러를 생성
   *
   * - 수정 모드에서는 비디오 교체가 불가능하므로 드래그/드롭 비활성화
   * - 비디오 탭에서만 드래그/드롭 활성화 (썸네일 탭은 별도 처리)
   */
  const getDragHandlers = () => {
    const isDragDisabled = isEditMode || !isVideoTab

    if (isDragDisabled) {
      return {}
    }

    return {
      onDragEnter: handleDragEnter,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
    }
  }
  const dragHandlers = getDragHandlers()

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* 왼쪽 - 숏츠 정보 입력 폼  */}
        <div className="w-full lg:flex-1">
          <div className="rounded-2xl bg-gray-50 p-8">
            <div className="space-y-6">
              {/* 제목, 설명, 공개여부 */}
              <ShortsFormInputs formData={formData} onChange={onFormChange} />

              {/* 카테고리 */}
              <ShortsFormCategory
                value={formData.categoryId}
                onChange={(value) => onFormChange('categoryId', value)}
              />

              {/* 키워드 */}
              <ShortsFormKeywords
                keywords={formData.keywords}
                keywordInput={formData.keywordInput}
                onChange={onFormChange}
              />
            </div>
          </div>
        </div>

        {/* 오른쪽 - 미리보기 및 업로드 */}
        <div className="w-full space-y-6 lg:w-96">
          <div className="space-y-4">
            {/* 미리보기 전환 탭 */}
            <div className="flex gap-2" role="tablist" aria-label="미리보기 전환 탭">
              <button
                type="button"
                id="video-tab"
                role="tab"
                aria-selected={isVideoTab}
                onClick={switchToVideo}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isVideoTab ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <VideoIcon className="h-4 w-4" />
                동영상
              </button>
              <button
                type="button"
                id="thumbnail-tab"
                role="tab"
                aria-selected={isThumbnailTab}
                onClick={switchToThumbnail}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isThumbnailTab
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ImageIcon className="h-4 w-4" />
                썸네일
              </button>
            </div>

            {/* 미리보기 영역 */}
            <div
              className={`flex aspect-9/16 items-center justify-center rounded-2xl border-2 border-dashed bg-white transition-all ${
                isDragging ? 'border-black bg-gray-50' : 'border-gray-300'
              }`}
              {...dragHandlers}
            >
              {isVideoTab ? (
                <ShortsFormUploadTab
                  type="video"
                  videoFile={videoFile}
                  videoSrc={videoSrc}
                  videoInputRef={videoInputRef}
                  onVideoUpload={handleVideoUpload}
                  onRemove={handleRemove}
                  isEditMode={isEditMode}
                />
              ) : (
                <ShortsFormUploadTab
                  type="thumbnail"
                  thumbnail={thumbnailSrc}
                  onChange={onFormChange}
                  onDraggingChange={setIsThumbnailDragging}
                  isEditMode={isEditMode}
                />
              )}
            </div>
          </div>

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
