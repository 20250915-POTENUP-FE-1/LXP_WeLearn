'use client'

import { Heart } from 'lucide-react'
import { useState } from 'react'

interface ShortsLikeButtonProps {
  initialLikeCount: number // 초기 좋아요 수
  initialIsLike?: boolean // 기본값은 false
}

function ShortsLikeButton({ initialLikeCount, initialIsLike = false }: ShortsLikeButtonProps) {
  const [isLike, setIsLike] = useState(initialIsLike)
  const [likeCount, setLikeCount] = useState(initialLikeCount)

  // 좋아요 토글 핸들러
  const handleLike = () => {
    setIsLike((prev) => !prev)
    // 좋아요 상태에 따라 숫자 증가/감소
    // isLike가 현재 true라면 감소
    setLikeCount((prev) => (isLike ? prev - 1 : prev + 1))
  }

  return (
    <button
      aria-label="좋아요"
      className="flex cursor-pointer flex-col items-center text-white hover:text-gray-300"
      type="button"
      onClick={handleLike}
    >
      <Heart
        strokeWidth={1.5}
        fill={isLike ? 'currentColor' : 'none'}
        className={isLike ? 'text-red-500' : ''}
      />
      <span className="mt-1 text-xs">{likeCount.toLocaleString()}</span>
    </button>
  )
}

export default ShortsLikeButton
