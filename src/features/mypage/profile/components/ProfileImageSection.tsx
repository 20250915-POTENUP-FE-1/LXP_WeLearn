'use client'

import { User } from 'lucide-react'
import { ChangeEvent, useRef, useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { clientApi } from '@/lib/utils/clientApiUtils'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/shared/store/auth/auth.store'
import { ApiResponse } from '@/types/api/api'
import { PresignedUrlData } from '@/types/auth/auth'
import { DEFAULT_IMAGES } from '@/constants/shortsImages';

interface ProfileImageSectionProps {
  initialProfileUrl?: string | null
}

export default function ProfileImageSection({ initialProfileUrl }: ProfileImageSectionProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const auth = useAuth((state) => state.auth)
  const setAuthUser = useAuth((state) => state.setUser)
  const S3_BASE_URL = "https://minji-test-3rd-lxp1.s3.ap-northeast-2.amazonaws.com/"

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const MAX_SIZE = 5 * 1024 * 1024 // 5MB
    if (file.size > MAX_SIZE) {
      return toast.error('파일 용량이 큽니다. 5MB 이하의 사진만 업로드 가능합니다.')
    }

    const fileName = file.name
    const url = URL.createObjectURL(file)
    setPreview(url)

    try {
      const res = await clientApi.get<ApiResponse<PresignedUrlData>>(`/api/v1/users/me/profile/presigned-url`, {
        params: { fileName: fileName },
      })
      const presignedUrl = res.data.url
      const imageKey = res.data.key
      const response = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type }
      })
      if (!response.ok) {
        return toast.error('프로필 사진 변경에 실패했습니다.')
      }
      if (response.ok && response.status === 200) {
        try {
          await clientApi.patch(`/api/v1/users/me/profile/image`, {
            newImageKey: imageKey
          })
          if (auth) {
            const newProfileUrl = `${S3_BASE_URL}${imageKey}`
            setAuthUser({
              ...auth,
              profileUrl: newProfileUrl
            })
            setPreview(null)
            toast.success('프로필 사진이 변경되었습니다.')
          }
        } catch (e) { }
      }
    } catch (e) {
      toast.error("업로드 실패")
    }
  }

  return (
    <div className="mb-12 flex flex-col items-center">
      <div className="relative mb-4 h-32 w-32 overflow-hidden flex items-center justify-center rounded-full bg-gray-200">
          <Image src={preview || auth?.profileUrl || initialProfileUrl || DEFAULT_IMAGES.AVATAR} alt="preview" width="200" height="200" className="rounded-full" unoptimized object-cover="true" />
      </div>
      <Button variant="accent" onClick={handleFileClick}>프로필 사진 변경</Button>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/png, image/jpeg" className="hidden" />
    </div>
  )
}