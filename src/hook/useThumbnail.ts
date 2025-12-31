interface UseThumbnailParams {
  onChange: (value: string | null) => void
}

export default function useThumbnail({ onChange }: UseThumbnailParams) {
  // 썸네일 업로드 처리
  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onChange(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // 썸네일 삭제
  const handleRemoveThumbnail = () => {
    onChange(null)
  }

  return {
    handleThumbnailUpload,
    handleRemoveThumbnail,
  }
}
