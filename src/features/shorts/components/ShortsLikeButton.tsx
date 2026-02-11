'use client'

import { useThrottle } from '@/hook/useThrottle'
import { clientApi } from '@/lib/utils/clientApiUtils'
import { useAuth } from '@/shared/store/auth/auth.store'
import { ApiResponse } from '@/types/api/api'
import { ResponseLike } from '@/types/shorts/like'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface ShortsLikeButtonProps {
  initialLikeCount: number // 초기 좋아요 수
  initialIsLike?: boolean // 기본값은 false
  shortsId: number
}

export function ShortsLikeButton({
  initialLikeCount,
  initialIsLike,
  shortsId,
}: ShortsLikeButtonProps) {
  const [isLike, setIsLike] = useState(initialIsLike)
  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const isLoggedIn = useAuth((state) => state.isLogin)

  const sendLike = useThrottle(async () => {
    try {
      const response = await clientApi.post<ApiResponse<ResponseLike>>(
        `/api/v1/shorts/${shortsId}/likes`,
        {
          shortsId: shortsId,
        },
      )

      toast.success(`좋아요 ${response.data.isLiked === false ? '취소' : ''} 성공`)
      setIsLike(response.data.isLiked)
      setLikeCount(response.data.likeCount)
    } catch (error) {
      toast.error('좋아요 기능 사용 중 오류가 발생했습니다.')
    }
  }, 300)

  const handleLike = () => {
    if (!isLoggedIn) {
      toast.info('로그인 이후 이용 바랍니다.')
      return
    }

    sendLike()
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
