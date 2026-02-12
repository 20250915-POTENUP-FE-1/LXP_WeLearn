'use client'

import { useState } from 'react'
import { ShortsBase } from '@/types/shorts/shorts'
import { clientApi } from '@/lib/utils/clientApiUtils'
import { toast } from 'react-toastify'
import ShortsPreviewContainer from '@/components/mypage/shorts/ShortsPreviewContainer'
import LikeShortsCard from '@/features/mypage/likes/LikeShortsCard'

export default function LikeShortsContainer({ initialShorts }: { initialShorts: ShortsBase[] }) {
  const [shortsList, setShortsList] = useState<ShortsBase[]>(initialShorts)
  const [selectedShorts, setSelectedShorts] = useState<ShortsBase | null>(initialShorts[0] ?? null)

  const handleDelete = async (shortsId: number) => {
    try {
      await clientApi.post(`/api/v1/shorts/${shortsId}/likes`, { shortsId })

      const filtered = shortsList.filter((s) => s.shortsId !== shortsId)
      setShortsList(filtered)

      if (selectedShorts?.shortsId === shortsId) {
        setSelectedShorts(filtered[0] ?? null)
      }
      toast.success('좋아요 목록에서 제거되었습니다.')
    } catch (e) {
      toast.error('삭제에 실패했습니다.')
    }
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <div className="order-1 w-full lg:order-1 lg:w-100 lg:shrink-0">
        <div className="lg:sticky lg:top-24">
          <h1 className="mb-6 text-2xl font-black text-gray-900 uppercase">Liked Shorts</h1>
          <ShortsPreviewContainer
            shorts={selectedShorts}
            mode="LIKE_SHORTS"
            loop={true}
            autoplay={true}
          />
        </div>
      </div>

      <div className="order-2 flex-1 lg:order-2">
        <LikeShortsCard
          shortsList={shortsList}
          selectedId={selectedShorts?.shortsId}
          onSelect={setSelectedShorts}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}
