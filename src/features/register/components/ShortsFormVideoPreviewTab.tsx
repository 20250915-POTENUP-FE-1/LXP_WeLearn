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
  const hasVideo = isEditMode ? !!videoSrc : !!(videoFile && videoSrc)
  return (
    <>
      <input
        name="video"
        ref={videoInputRef}
        type="file"
        accept="video/*"
        onChange={onVideoUpload}
        className="hidden"
      />

      {hasVideo ? (
        /* 2. 영상이 있을 때 보여줄 UI */
        <ShortsFormPreviewFrame onRemove={isEditMode ? undefined : onRemove}>
          <video className="h-full w-full rounded-2xl object-cover" controls>
            <source src={videoSrc!} type={videoFile?.type || 'video/mp4'} />
          </video>
          {isEditMode && (
            <div className="absolute top-6 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-sm text-white">
              <Lock size={12} />
              영상은 수정할 수 없습니다
            </div>
          )}
        </ShortsFormPreviewFrame>
      ) : isEditMode ? (
        /* 3. 수정 모드인데 영상이 없는 비정상 케이스 */
        <ShortsFormEmptyState
          icon={<Lock strokeWidth={0.5} size={102} color="#aaa" />}
          description={
            <>
              영상을 불러올 수 없습니다. <br /> 페이지를 새로고침 해주세요.
            </>
          }
        />
      ) : (
        /* 4. 등록 모드에서 아직 영상이 업로드되지 않은 상태 */
        <ShortsFormEmptyState
          icon={<CirclePlus strokeWidth={0.5} size={102} color="#aaa" />}
          description={
            <>
              동영상 파일을 드래그하거나 <br /> 클릭하여 업로드 하세요.
            </>
          }
          action={
            <Button
              type="button"
              variant="outline"
              onClick={() => videoInputRef.current?.click()}
              className="mt-4"
            >
              파일 선택
            </Button>
          }
        />
      )}
    </>
  )
}
