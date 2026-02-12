'use client'

import { Heart } from 'lucide-react'
import { useAuth } from '@/shared/store/auth/auth.store'
import { toast } from 'react-toastify'

interface ShortsLikeButtonProps {
  shortsId: number
  isLiked: boolean
  likeCount: number
  handleToggleLike: (shortsId: number) => void
}

export function ShortsLikeButton({
  shortsId,
  isLiked,
  likeCount,
  handleToggleLike,
}: ShortsLikeButtonProps) {
  const isLoggedIn = useAuth((state) => state.isLogin)

  const handleLike = () => {
    if (!isLoggedIn) {
      toast.info('로그인 이후 이용 바랍니다.')
      return
    }

    handleToggleLike(shortsId)
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
        fill={isLiked ? 'currentColor' : 'none'}
        className={isLiked ? 'text-red-500' : ''}
      />
      <span className="mt-1 text-xs">{likeCount}</span>
    </button>
  )
}
