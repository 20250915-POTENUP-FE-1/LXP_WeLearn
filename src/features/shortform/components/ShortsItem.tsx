import { ShortsDetail } from '@/types/shortform'
import ShortsPlayer from './ShortsPlayer'
import ShortsCreateInfo from './ShortsCreateInfo'
import ShortsActionBar from './ShortsActionBar'

interface ShortsItemProps {
  shorts: ShortsDetail
}

export default function ShortsItem({ shorts }: ShortsItemProps) {
  return (
    <div className="relative h-full w-full">
      {/* 영상 플레이어  */}
      <div className="aspect-9/16 h-full w-full">
        <ShortsPlayer videoUrl={shorts.videoUrl} thumbnailUrl={shorts.thumbnailUrl} />
      </div>

      {/* 오버레이 컨텐츠 */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end">
        {/* 업로더 정보  */}
        <div className="pointer-events-auto w-full">
          <ShortsCreateInfo
            uploader={shorts.uploader}
            title={shorts.title}
            description={shorts.description}
          />
        </div>

        {/* 액션 버튼 - 하단 우측 정렬 */}
        <div className="pointer-events-auto mr-2 self-end">
          <ShortsActionBar />
        </div>
      </div>
    </div>
  )
}
