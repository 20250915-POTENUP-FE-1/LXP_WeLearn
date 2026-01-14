'use client'

import { useDebounce } from '@/hook/useDebounce'
import { likeApi } from '@/services/shorts/likes.service'
import { Heart } from 'lucide-react'
import { useState } from 'react'

interface ShortsLikeButtonProps {
  initialLikeCount: number // 초기 좋아요 수
  initialIsLike?: boolean // 기본값은 false
  shortsId: number
}

function ShortsLikeButton({
  initialLikeCount,
  initialIsLike = false,
  shortsId,
}: ShortsLikeButtonProps) {
  const [isLike, setIsLike] = useState(initialIsLike)
  const [likeCount, setLikeCount] = useState(initialLikeCount)

  const sendLike = useDebounce(async (nextIsLike: boolean) => {
    try {
      if (nextIsLike) {
        await likeApi.like(shortsId)
      } else {
        await likeApi.unlike(shortsId)
      }
    } catch (error) {
      // 실패 시 롤백
      setIsLike((prev) => !prev)
      setLikeCount((prev) => (nextIsLike ? prev - 1 : prev + 1))
    }
  }, 300)

  const handleLike = () => {
    const nextIsLike = !isLike

    // optimistic update
    setIsLike(nextIsLike)
    setLikeCount((prev) => (nextIsLike ? prev + 1 : prev - 1))

    // 서버에는 "최종 상태" 전달
    sendLike(nextIsLike)
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
