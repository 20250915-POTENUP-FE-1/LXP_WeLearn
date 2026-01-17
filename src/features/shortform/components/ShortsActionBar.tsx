'use client'

import { ListPlus, MessageSquareText, Send } from 'lucide-react'
import { toast } from 'react-toastify'
import ShortsLikeButton from './ShortsLikeButton'
import { usePathname, useRouter } from 'next/navigation'
interface ShortsActionBarProps {
  id: number
  likeCount: number
  commentCount: number
}

export default function ShortsActionBar({ id, likeCount, commentCount }: ShortsActionBarProps) {
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
      router.push(`/shorts/${id}`, { scroll: false })
    } else {
      router.push(`/shorts/${id}/comments?commentCount=${commentCount}`, { scroll: false })
    }
  }

  const handlePlaylist = () => {
    if (isPlaylistOpen) {
      router.push(`/shorts/${id}`, { scroll: false })
    } else {
      router.push(`/shorts/${id}/playlist`, { scroll: false })
    }
  }

  return (
    <aside className="absolute right-5 bottom-20 flex flex-col items-center gap-6">
      {/* 좋아요 */}
      <ShortsLikeButton initialLikeCount={likeCount} shortsId={id} />

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
        <Send strokeWidth={1.5} />
        <span className="mt-1 text-xs">공유</span>
      </button>
    </aside>
  )
}
