'use client'

import { RefObject } from 'react'
import { Button } from '@/components/ui/Button'
import { CirclePlus, Lock } from 'lucide-react'
import ShortsFormPreviewFrame from './ShortsFormPreviewFrame'
import ShortsFormEmptyState from './ShortsFormEmptyState'

interface ShortsFormVideoPreviewTabProps {
  videoFile?: File | null
  videoSrc: string | null
  videoInputRef: RefObject<HTMLInputElement | null>
  onVideoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemove: () => void
  isEditMode?: boolean
}

export default function ShortsFormVideoPreviewTab({
  videoFile,
  videoSrc,
  videoInputRef,
  onVideoUpload,
  onRemove,
  isEditMode = false,
}: ShortsFormVideoPreviewTabProps) {
  // 비디오 소스가 있으면 미리보기 렌더링
  // 수정 모드: videoSrc만 있으면 표시 (existingVideoUrl 사용)
  // 등록 모드: videoFile과 videoSrc 둘 다 필요
  const hasVideo = isEditMode ? !!videoSrc : !!(videoFile && videoSrc)

  if (hasVideo) {
    return (
      // 비디오 미리보기 프레임
      // 수정 모드에서는 삭제 버튼 숨김 (onRemove를 undefined로)
      <ShortsFormPreviewFrame onRemove={isEditMode ? undefined : onRemove}>
        <video className="h-full w-full rounded-2xl object-cover" controls>
          <source src={videoSrc!} type={videoFile?.type || 'video/mp4'} />
        </video>
        {/* 수정 모드 안내 */}
        {isEditMode && (
          <div className="absolute top-6 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-sm text-white">
            <Lock size={12} />
            영상은 수정할 수 없습니다
          </div>
        )}
      </ShortsFormPreviewFrame>
    )
  }

  // 수정 모드인데 영상이 없는 경우 (비정상 상태)
  if (isEditMode) {
    return (
      <ShortsFormEmptyState
        icon={<Lock strokeWidth={0.5} size={102} color="#aaa" />}
        description={
          <>
            영상을 불러올 수 없습니다. <br /> 페이지를 새로고침 해주세요.
          </>
        }
      />
    )
  }

  return (
    // 빈 상태 렌더링 (등록 전용)
    <ShortsFormEmptyState
      icon={<CirclePlus strokeWidth={0.5} size={102} color="#aaa" />}
      description={
        <>
          동영상 파일을 드래그하거나 <br /> 클릭하여 업로드 하세요.
        </>
      }
      // 액션 렌더링
      action={
        <>
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            onChange={onVideoUpload}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => videoInputRef.current?.click()}
            className="mt-4"
          >
            파일 선택
          </Button>
        </>
      }
    />
  )
}
