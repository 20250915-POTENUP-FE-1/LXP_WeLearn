import { User } from 'lucide-react'
import { ShortsUploader } from '../../../types/shortform'
import ShortsToggleDescription from './ShortsToggleDescription'

interface ShortsCreateInfoProps {
  uploader: ShortsUploader
  title: string
  description: string
}

export default function ShortsCreateInfo({ uploader, title, description }: ShortsCreateInfoProps) {
  return (
    <div className="w-[86%] from-black/80 to-transparent px-4 py-8 text-white">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
          {uploader.profileUrl ? (
            <img
              src={uploader.profileUrl}
              alt={`${uploader.nickname} 프로필`}
              className="h-full w-full object-cover"
            />
          ) : (
            <>
              <div className="h-10 w-10 rounded-full bg-gray-300">
                <User strokeWidth={1.5} color="white" />
              </div>
            </>
          )}
        </div>

        <p className="block font-medium">{uploader.nickname}</p>
      </div>
      <div className="pt-4">
        <p className="text-lg font-bold opacity-90">{title}</p>
      </div>
      <ShortsToggleDescription description={description} />
    </div>
  )
}
