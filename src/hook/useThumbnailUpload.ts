import { isValidImageFile } from '@/utils/shortsFormValidation'
import type { RefObject } from 'react'
import { toast } from 'react-toastify'

interface UseThumbnailParams {
  onChange: (value: string | null) => void
  inputRef?: RefObject<HTMLInputElement>
}

export default function useThumbnailUpload({ onChange, inputRef }: UseThumbnailParams) {
  const resetInput = () => {
    if (inputRef?.current) {
      inputRef.current.value = ''
    }
  }

  // 썸네일 업로드 처리
  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    if (!isValidImageFile(file)) {
      toast.error('지원하지 않는 이미지 형식입니다. (jpg, png, gif, webp만 허용)')
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
