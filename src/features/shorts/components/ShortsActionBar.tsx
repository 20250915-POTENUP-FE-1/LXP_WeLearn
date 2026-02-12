'use client'

import { ListPlus, MessageSquareText, Share2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { usePathname, useRouter } from 'next/navigation'
import { ShortsLikeButton } from './ShortsLikeButton'

interface ShortsActionBarProps {
  shortsId: number
  likeCount: number
  commentCount?: number
  isLiked?: boolean
  handleToggleLike: (shortsId: number) => void
}

export default function ShortsActionBar({
  shortsId,
  likeCount,
  commentCount,
  isLiked,
  handleToggleLike,
}: ShortsActionBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const isCommentOpen = pathname.endsWith('/comments')
  const isPlaylistOpen = pathname.endsWith('/playlist')

  const handleComingSoon = (feature: string) => {
    toast.info(`${feature} 서비스 준비 중입니다.`, {
      toastId: `shorts-${feature}-toast`,
    })
  }

  const handleComment = () => {
    if (isCommentOpen) {
      window.history.replaceState(null, '', `/shorts/${shortsId}`)
    } else {
      router.replace(`/shorts/${shortsId}/comments`, { scroll: false })
    }
  }

  const handlePlaylist = () => {
    if (isPlaylistOpen) {
      window.history.replaceState(null, '', `/shorts/${shortsId}`)
    } else {
      router.replace(`/shorts/${shortsId}/playlist`, { scroll: false })
    }
  }

  return (
    <aside className="absolute right-5 bottom-20 flex flex-col items-center gap-6">
      {/* 좋아요 */}
      <ShortsLikeButton
        shortsId={shortsId}
        isLiked={isLiked ?? false}
        likeCount={likeCount}
        handleToggleLike={handleToggleLike}
      />

      {/* 댓글 */}
      <button
        aria-label="댓글 보기"
        className="flex cursor-pointer flex-col items-center text-white hover:text-gray-300"
        type="button"
        onClick={handleComment}
      >
        <MessageSquareText strokeWidth={1.5} />
        <span className="mt-1 text-xs">{commentCount}</span>
      </button>

      {/* 저장 */}
      <button
        aria-label="저장"
        className="flex cursor-pointer flex-col items-center text-white hover:text-gray-300"
        type="button"
        onClick={handlePlaylist}
      >
        <ListPlus strokeWidth={1.5} />
        <span className="mt-1 text-xs">저장</span>
      </button>

      {/* 공유 */}
      <button
        aria-label="공유"
        className="flex cursor-pointer flex-col items-center text-white hover:text-gray-300"
        type="button"
        onClick={() => handleComingSoon('공유')}
      >
        <Share2 strokeWidth={1.5} />
        <span className="mt-1 text-xs">공유</span>
      </button>
    </aside>
  )
}
