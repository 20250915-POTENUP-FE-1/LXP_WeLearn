import type { RefObject } from 'react'
import { toast } from 'react-toastify'

interface UseThumbnailParams {
  onChange: (value: string | null) => void
  inputRef?: RefObject<HTMLInputElement>
}

export default function useThumbnail({ onChange, inputRef }: UseThumbnailParams) {
  const resetInput = () => {
    if (inputRef?.current) {
      inputRef.current.value = ''
    }
  }

  // 썸네일 업로드 처리
  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('이미지 파일만 업로드할 수 있습니다.')
      resetInput()
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      onChange(reader.result as string)
      resetInput()
    }
    reader.readAsDataURL(file)
  }

  // 썸네일 삭제
  const handleRemoveThumbnail = () => {
    onChange(null)
    resetInput()
  }

  return {
    handleThumbnailUpload,
    handleRemoveThumbnail,
  }
}
