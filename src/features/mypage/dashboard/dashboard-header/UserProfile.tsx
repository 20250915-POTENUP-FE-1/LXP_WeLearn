'use client'

import Image from 'next/image'
import { DEFAULT_IMAGES } from '@/constants/shortsImages'
import { useAuth } from '@/shared/store/auth/auth.store'

export default function UserProfile() {
  const auth = useAuth((state) => state.auth)

  if (!auth) {
    return null
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <div
        className="relative h-14 w-14 overflow-hidden rounded-full border-gray-100 transition-colors hover:border-gray-600"
        aria-label="프로필 이미지"
      >
        <Image
          src={auth.profileUrl || DEFAULT_IMAGES.AVATAR}
          alt={auth.nickName}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>

      <div className="flex flex-col justify-center">
        <div className="text-md pb-1 font-bold">{auth.nickName}</div>
        <div className="text-md text-gray-600">{auth.email}</div>
      </div>
    </div>
  )
}
