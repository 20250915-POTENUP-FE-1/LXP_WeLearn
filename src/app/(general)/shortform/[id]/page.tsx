import React from 'react'
import ShortsActionBar from '@/features/shorts/components/ShortsActionBar'
import ShortsCreateInfo from '@/features/shorts/components/ShortsCreateInfo'
import ShortsPlayer from '@/features/shorts/components/ShortsPlayer'

export default function ShortformDetailPage() {
  return (
    <div className="relative h-dvh w-full bg-black md:h-auto md:bg-transparent">
      <section aria-labelledby="shortform-content" className="flex h-full w-full justify-center">
        {/* 메인 콘텐츠: 비디오 또는 이미지 */}
        <div className="relative h-full w-full overflow-hidden bg-black md:aspect-[9/16] md:max-w-[400px] md:rounded-xl">
          <ShortsPlayer />

          {/* Creator Info: 영상 위 오버레이 */}
          <ShortsCreateInfo />

          {/* 우측 액션 버튼 그룹 */}
          <ShortsActionBar />
        </div>
      </section>
    </div>
  )
}
