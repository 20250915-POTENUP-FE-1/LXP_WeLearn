'use client'

import { useEffect, useMemo, RefObject } from 'react'
import { Button } from '@/components/ui/Button'
import { CirclePlus } from 'lucide-react'
import ShortsFormPreviewFrame from './ShortsFormPreviewFrame'
import ShortsFormEmptyState from './ShortsFormEmptyState'

interface ShortsFormVideoPreviewTabProps {
  videoFile?: File | null
  videoInputRef: RefObject<HTMLInputElement | null>
  onVideoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemove: () => void
}

export default function ShortsFormVideoPreviewTab({
  videoFile,
  videoInputRef,
  onVideoUpload,
  onRemove,
}: ShortsFormVideoPreviewTabProps) {
  const videoSrc = useMemo(() => {
    if (!videoFile) return null
    return URL.createObjectURL(videoFile)
  }, [videoFile])

  // 메모리 누수를 방지하기 위해 URL.revokeObjectURL 호출
  useEffect(() => {
    if (!videoSrc) return
    return () => URL.revokeObjectURL(videoSrc)
  }, [videoSrc])

  // 비디오 파일이 있으면 미리보기 렌더링
  if (videoFile && videoSrc) {
    return (
      // 비디오 미리보기 프레임
      <ShortsFormPreviewFrame onRemove={onRemove}>
        <video className="h-full w-full rounded-2xl object-cover" controls>
          <source src={videoSrc} type={videoFile.type} />
        </video>
      </ShortsFormPreviewFrame>
    )
  }

  return (
    // 빈 상태 렌더링
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
