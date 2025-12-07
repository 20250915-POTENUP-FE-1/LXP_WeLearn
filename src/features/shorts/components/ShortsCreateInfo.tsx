import { User } from 'lucide-react'
import { ShortsUploader } from '../../../types/shortform'

interface ShortsCreateInfoProps {
  uploader: ShortsUploader
  title: string
  description: string
}

function ShortsCreateInfo({ uploader, title, description }: ShortsCreateInfoProps) {
  return (
    <div className="w-full from-black/80 to-transparent px-4 py-6 text-white backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
          {uploader.profileUrl ? (
            <img
              src={uploader.profileUrl}
              alt={`${uploader.nickname} 프로필`}
              className="h-full w-full object-cover"
            />
          ) : (
            <User strokeWidth={1.5} color="#333" />
          )}
        </div>
        <div>
          <p className="font-medium">{uploader.nickname}</p>
          <p className="text-sm opacity-90">{title}</p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed opacity-90">{description}</p>
    </div>
  )
}

export default ShortsCreateInfo
