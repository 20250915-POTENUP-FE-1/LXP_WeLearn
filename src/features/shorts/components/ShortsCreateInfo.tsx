import Image from 'next/image'
import { User } from 'lucide-react'
import ShortsToggleDescription from './ShortsToggleDescription'
import { ShortsUploader } from '@/types/shorts/shorts'

interface ShortsCreateInfoProps {
  uploader: ShortsUploader
  title: string
  description: string
}

export default function ShortsCreateInfo({ uploader, title, description }: ShortsCreateInfoProps) {
  return (
    <div className="w-[86%] from-black/80 to-transparent px-4 py-8 text-white">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
          {uploader.userProfileUrl ? (
            <Image
              src={uploader.userProfileUrl}
              alt={`${uploader.userNickname} 프로필`}
              width={30}
              height={30}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
              <User strokeWidth={1.5} color="white" />
            </div>
          )}
        </div>

        <p className="block font-medium text-white">{uploader.userNickname}</p>
      </div>
      <div className="pt-4">
        <p className="text-[20px] font-bold opacity-90">{title}</p>
      </div>
      <ShortsToggleDescription description={description} />
    </div>
  )
}
