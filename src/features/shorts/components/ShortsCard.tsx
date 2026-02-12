import ShortsPlayer from './ShortsPlayer'
import ShortsCreateInfo from './ShortsCreateInfo'
import ShortsActionBar from './ShortsActionBar'
import { DEFAULT_IMAGES } from '@/constants/shortsImages'
import { ShortsBase } from '@/types/shorts/shorts'

interface ShortsCardProps {
  shorts: ShortsBase
  userProfileUrl?: string | null
  handleToggleLike: (shortsId: number) => void
}

export default function ShortsCard({ shorts, userProfileUrl, handleToggleLike }: ShortsCardProps) {
  const profileUrl = userProfileUrl || shorts.userProfileUrl || DEFAULT_IMAGES.AVATAR

  return (
    <div className="relative h-dvh w-full overflow-hidden md:h-full">
      <div className="absolute inset-0">
        <ShortsPlayer videoUrl={shorts.videoUrl} thumbnailUrl={shorts.thumbnailUrl} />
      </div>

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end">
        <div className="pointer-events-auto w-full bg-linear-to-t from-black/80 to-transparent">
          <ShortsCreateInfo
            uploader={{
              userId: shorts.userId,
              userNickname: shorts.userNickname,
              userProfileUrl: profileUrl,
            }}
            title={shorts.title}
            description={shorts.description}
          />
        </div>

        <div className="pointer-events-auto mr-2 self-end">
          <ShortsActionBar
            shortsId={shorts.shortsId}
            likeCount={shorts.likeCount}
            commentCount={shorts.commentCount}
            isLiked={shorts.isLiked}
            handleToggleLike={handleToggleLike}
          />
        </div>
      </div>
    </div>
  )
}
