import { User } from 'lucide-react'
import Image from 'next/image'

interface UserProfileProps {
  userName: string
  userEmail: string
  profileImageUrl?: string | null
}

export default function UserProfile({ userName, userEmail, profileImageUrl }: UserProfileProps) {
  return (
    <section className="mb-10 flex items-center gap-4">
      <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-200">
        {profileImageUrl ? (
          <Image src={profileImageUrl} alt={userName} fill className="object-cover" sizes="64px" />
        ) : (
          <User strokeWidth={1.5} size={24} className="text-gray-400" />
        )}
      </div>
      <div>
        <h1 className="text-xl font-bold text-gray-900">{userName}</h1>
        <p className="text-sm text-gray-500">{userEmail}</p>
      </div>
    </section>
  )
}
