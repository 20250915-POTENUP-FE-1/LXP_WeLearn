'use client'

import { startTransition, useActionState, useEffect, useMemo, useRef, useState } from 'react'
import { ImageIcon, VideoIcon } from 'lucide-react'
import ShortsFormInputs from '@/features/register/components/ShortsFormInputs'
import ShortsFormCategory from '@/features/register/components/ShortsFormCategory'
import ShortsFormKeywords from '@/features/register/components/ShortsFormKeywords'
import ShortsFormSubmitButtons from '@/features/register/components/ShortsFormSubmitButtons'
import ShortsFormUploadTab from '@/features/register/components/ShortsFormUploadTab'
import useVideoUpload from '@/hook/register/useVideoUpload'
import usePreviewTab from '@/hook/register/usePreviewTab'
import type { ShortsFormData, VideoPreviewData } from '@/features/register/types/shortsRegister'
import { uploadShortsAction, UploadShortsPayload } from '../register.action'
import { toast } from 'react-toastify'
import { extractVideoDuration } from '@/utils/extractVideoDuration'

interface ShortsFormLayoutProps {
  // 폼 데이터
  formData: ShortsFormData
  videoData: VideoPreviewData

  // 핸들러
  onFormChange: <K extends keyof ShortsFormData>(field: K, value: ShortsFormData[K]) => void
  onVideoChange: <K extends keyof VideoPreviewData>(field: K, value: VideoPreviewData[K]) => void
  // onSubmit: () => void
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
  // onSubmit,
  onCancel,
  isSubmitting,
  isEditMode = false,
  existingVideoUrl,
  existingThumbnailUrl,
  isThumbnailDeleted = false,
  submitText = '등록하기',
}: ShortsFormLayoutProps) {
  // === 오른쪽 섹션 로직 (기존 ShortsFormRightSection) ===
  const { videoFile, isDragging: isVideoDragging } = videoData
  const [isThumbnailDragging, setIsThumbnailDragging] = useState(false)
  const isDragging = isVideoDragging || isThumbnailDragging
  const videoInputRef = useRef<HTMLInputElement>(null)

  const [state, action, isPending] = useActionState(uploadShortsAction, {
    success: false,
    message: '',
    errors: {},
  })

  useEffect(() => {
    if (state.success === true) {
      toast.success('업로드가 완료되었습니다.')
    }
    if (state.success === false && state.message) {
      toast.error(state.message)
    }
  }, [state])

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // 페이지 리로드 방지

    if (!videoData.videoFile) {
      toast.error('비디오 파일이 필요합니다.')
      return
    }

    const durationSec = await extractVideoDuration(videoData.videoFile)

    const payload: UploadShortsPayload = {
      title: formData.title,
      description: formData.description || '', // undefined 방지
      categoryId: formData.categoryId || 0,
      keywords: formData.keywords,
      durationSec,
      videoFile: videoData.videoFile,
      thumbnailFile: formData.thumbnailFile ?? null,
    }

    // Server Action 호출
    startTransition(() => {
      action(payload) // 이제 isPending이 정상 작동
    })
  }

  /**
   * 썸네일 이미지 소스
   *
   * 우선순위:
   * 1. 사용자가 썸네일을 삭제한 경우 → null
   * 2. 새로 업로드한 썸네일이 있는 경우 → formData.thumbnail
   * 3. 기존 썸네일이 있는 경우 (수정 모드) → existingThumbnailUrl
   * 4. 그 외 → null
   */
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
            // onRegister={onSubmit}
            onCancel={onCancel}
            isLoading={isSubmitting}
            submitText={submitText}
          />
        </div>
      </div>
    </form>
  )
}
