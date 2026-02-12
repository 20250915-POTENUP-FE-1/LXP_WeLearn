'use client'

import ShortsCard from '@/components/mypage/shorts/ShortsCard'
import { ShortsBase } from '@/types/shorts/shorts'
import EmptyState from '@/features/mypage/EmptyState'

interface LikeShortsCardProps {
  shortsList: ShortsBase[]
  selectedId?: number | null
  onSelect: (shorts: ShortsBase) => void
  onDelete: (shortsId: number) => void
}

export default function LikeShortsCard({
  shortsList,
  selectedId,
  onSelect,
  onDelete,
}: LikeShortsCardProps) {
  return (
    <div className="space-y-6">
      {shortsList.length === 0 ? (
        <EmptyState type="likes" />
      ) : (
        shortsList.map((shorts) => (
          <ShortsCard
            key={shorts.shortsId}
            shorts={shorts}
            isSelected={selectedId === shorts.shortsId}
            onSelect={() => onSelect(shorts)}
            onLikeDelete={() => onDelete(shorts.shortsId)}
            mode="LIKE_SHORTS"
          />
        ))
      )}
    </div>
  )
}
