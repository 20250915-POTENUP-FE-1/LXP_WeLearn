import ShortsPlayer from './ShortsPlayer'
import ShortsCreateInfo from './ShortsCreateInfo'
import ShortsActionBar from './ShortsActionBar'
import { ShortsItemType } from '@/types/shorts'
import { DEFAULT_IMAGES } from '@/constants/shortsImages'

interface ShortsItemProps {
  shorts: ShortsItemType
  userProfileUrl?: string | null
}

export default function ShortsItem({ shorts, userProfileUrl }: ShortsItemProps) {
  const profileUrl = userProfileUrl || shorts.userProfileUrl || DEFAULT_IMAGES.AVATAR

  return (
    <div className="relative h-dvh w-full overflow-hidden md:h-full">
      {/* 영상 플레이어  */}
      <div className="absolute inset-0">
        <ShortsPlayer videoUrl={shorts.videoUrl} thumbnailUrl={shorts.thumbnailUrl} />
      </div>

      {/* 오버레이 컨텐츠 */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end">
        {/* 업로더 정보  */}
        <div className="pointer-events-auto w-full">
          <ShortsCreateInfo
            uploader={{
              userId: shorts.userId,
              userNickName: shorts.userNickName,
              userProfileUrl: profileUrl,
            }}
            title={shorts.title}
            description={shorts.description}
          />
        </div>

        {/* 액션 버튼 - 하단 우측 정렬 */}
        <div className="pointer-events-auto mr-2 self-end">
          <ShortsActionBar id={shorts.shortsId} />
        </div>
      </div>
    </div>
  )
}
