'use client'

import ShortsCard from '@/components/mypage/shorts/ShortsCard'
import { ShortsBase } from '@/types/shorts/shorts'
import { clientApi } from '@/lib/utils/clientApiUtils'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface LikeShortsCardProps {
  likeShortsList: ShortsBase[]
}
export default function LikeShortsCard({ likeShortsList }: LikeShortsCardProps) {
  const [shortsList, setShortsList] = useState<ShortsBase[]>(likeShortsList)

  const handleSelect = () => {}
  const handleDelete = async (shortsId: number) => {
    try {
      await clientApi.post(`/api/v1/shorts/${shortsId}/likes`, {
        shortsId: shortsId,
      })
      const filtered = shortsList.filter((item: ShortsBase) => item.shortsId !== shortsId)
      setShortsList(filtered)
      toast.success('좋아요 목록에서 제거되었습니다.')
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div>
      <div className="space-y-6">
        {shortsList.map((shorts) => (
          <ShortsCard
            shorts={shorts}
            isSelected={false}
            onSelect={handleSelect}
            onLikeDelete={() => handleDelete(shorts.shortsId)}
            key={shorts.shortsId}
            mode="LIKE_SHORTS"
          />
        ))}
      </div>
    </div>
  )
}
