'use client'

import { useDebounce } from '@/hook/useDebounce'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { likeAction, unlikeAction } from '../like.action'

interface ShortsLikeButtonProps {
  initialLikeCount: number // 초기 좋아요 수
  initialIsLike?: boolean // 기본값은 false
  shortsId: number
}

function ShortsLikeButton({
  initialLikeCount,
  initialIsLike = true,
  shortsId,
}: ShortsLikeButtonProps) {
  const [isLike, setIsLike] = useState(initialIsLike)
  const [likeCount, setLikeCount] = useState(initialLikeCount)

  const sendLike = useDebounce(async (nextIsLike: boolean) => {
    try {
      if (nextIsLike) {
        console.log('좋아요 누름!')
        await likeAction({ success: false, message: '', data: null, code: '' }, shortsId)
      } else {
        console.log('좋아요 취소!!')
        await unlikeAction({ success: false, message: '', data: null, code: '' }, shortsId)
      }
    } catch (error) {
      // 실패 시 롤백
      console.log(error)
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
      <span className="mt-1 text-xs">{likeCount}</span>
    </button>
  )
}

export default ShortsLikeButton
