'use client'

import { useState } from 'react'
import MyShortsCreateButton from './MyShortsCreateButton'
import ShortsListHeader from '@/components/mypage/shorts/ShortsListHeader'
import ShortsCard from '@/components/mypage/shorts/ShortsCard'
import { ShortsResponse } from '@/types/mypage-shorts'
import ShortsPreviewContainer from '@/components/mypage/shorts/ShortsPreviewContainer'

interface MyShortsContainerProps {
  initialShorts: ShortsResponse[]
  totalCount: number
}

export default function MyShortsContainer({ initialShorts, totalCount }: MyShortsContainerProps) {
  const [selectedShorts, setSelectedShorts] = useState<ShortsResponse | null>(
    initialShorts[0] ?? null,
  )

  const handleSelectShorts = (shorts: ShortsResponse) => {
    setSelectedShorts(shorts)
  }

  return (
    <div className="h-full w-full px-4 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* 좌측 - 미리보기 */}
        <div className="order-1 w-full lg:order-1 lg:w-100 lg:flex-shrink-0">
          <div className="flex flex-col gap-6 lg:sticky lg:top-24">
            <h1 className="text-center text-2xl font-black text-gray-900 uppercase lg:text-left">
              My Created Shorts
            </h1>
            <ShortsPreviewContainer shorts={selectedShorts} loop={true} autoplay={true} />
            <div className="w-full lg:w-[360px]">
              <MyShortsCreateButton />
            </div>
          </div>
        </div>

        {/* 우측 - 리스트 */}
        <div className="order-2 flex-1 lg:order-2">
          <ShortsListHeader totalCount={totalCount} />

          {/* 숏츠 목록 */}
          <div className="space-y-6">
            {initialShorts.length > 0 ? (
              initialShorts.map((shorts) => (
                <ShortsCard
                  key={shorts.shortsId}
                  shorts={shorts}
                  isSelected={selectedShorts?.shortsId === shorts.shortsId}
                  onSelect={() => handleSelectShorts(shorts)}
                />
              ))
            ) : (
              <div className="py-12 text-center text-gray-500">아직 만든 숏츠가 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
