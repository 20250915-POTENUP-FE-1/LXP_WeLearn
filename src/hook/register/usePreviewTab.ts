import { useState } from 'react'

type PreviewType = 'video' | 'thumbnail'

interface UsePreviewTabParams {
  onVideoRemove: () => void
  onThumbnailRemove: () => void
}

export default function usePreviewTab({ onVideoRemove, onThumbnailRemove }: UsePreviewTabParams) {
  const [previewType, setPreviewType] = useState<PreviewType>('video')

  // 탭 전환
  const switchToVideo = () => setPreviewType('video')
  const switchToThumbnail = () => setPreviewType('thumbnail')

  // 탭에 따른 삭제 핸들러
  const handleRemove = () => {
    if (previewType === 'video') {
      onVideoRemove()
    } else {
      onThumbnailRemove()
    }
  }

  // 미리보기 탭 상태
  const isVideoTab = previewType === 'video'
  const isThumbnailTab = previewType === 'thumbnail'

  return {
    previewType,
    isVideoTab,
    isThumbnailTab,
    switchToVideo,
    switchToThumbnail,
    handleRemove,
  }
}
