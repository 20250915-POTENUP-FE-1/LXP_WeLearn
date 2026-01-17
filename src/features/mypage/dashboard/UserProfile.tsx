import Image from 'next/image'
import { DEFAULT_IMAGES } from '@/constants/shortsImages'

interface UserProfileProps {
  userName: string
  userEmail: string
  profileImageUrl?: string | null
}

export default function UserProfile({ userName, userEmail, profileImageUrl }: UserProfileProps) {
  return (
    <section className="mb-10 flex items-center gap-4">
      <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-200">
        <Image
          src={profileImageUrl || DEFAULT_IMAGES.AVATAR}
          alt={userName}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div>
        <h1 className="text-xl font-bold text-gray-900">{userName}</h1>
        <p className="text-sm text-gray-500">{userEmail}</p>
      </div>
    </section>
  )
}
