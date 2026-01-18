'use client'

import { useDebounce } from '@/hook/useDebounce'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { likeAction, unlikeAction } from '../like.action'
import { toast } from 'react-toastify'

interface ShortsLikeButtonProps {
  initialLikeCount: number // 초기 좋아요 수
  initialIsLike?: boolean // 기본값은 false
  shortsId: number
}

function ShortsLikeButton({ initialLikeCount, initialIsLike, shortsId }: ShortsLikeButtonProps) {
  const [isLike, setIsLike] = useState(initialIsLike)
  const [likeCount, setLikeCount] = useState(initialLikeCount)

  const userData = localStorage.getItem('user')
  const sendLike = useDebounce(async (nextIsLike: boolean) => {
    if (!userData) {
      toast.info('로그인 이후 이용 바랍니다.')
      return
    }
    try {
      if (nextIsLike) {
        await likeAction({ success: false, message: '', data: null, code: '' }, shortsId)
      } else {
        await unlikeAction({ success: false, message: '', data: null, code: '' }, shortsId)
      }
    } catch (error) {
      toast.error('좋아요 기능 사용 중 오류가 발생했습니다.')
    }
  }, 300)

  const handleLike = () => {
    if (!userData) {
      toast.info('로그인 이후 이용 바랍니다.')
      return
    }
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
