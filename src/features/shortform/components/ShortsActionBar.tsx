'use client'

import { ClosedCaption, Heart, ListPlus, MessageSquareText, Send } from 'lucide-react'
import { toast } from 'react-toastify'
import ShortsLikeButton from './ShortsLikeButton'

export default function ShortsActionBar() {
  const handleComingSoon = (feature: string) => {
    toast.info(`${feature} 서비스 준비 중입니다.`, {
      toastId: `shorts-${feature}-toast`,
    })
  }

  return (
    <aside className="absolute right-5 bottom-20 flex flex-col items-center gap-6">
      {/* 좋아요 */}
      <ShortsLikeButton initialLikeCount={127} />

      {/* 댓글 */}
      <button
        aria-label="댓글 보기"
        className="flex cursor-pointer flex-col items-center text-white hover:text-gray-300"
        type="button"
        onClick={() => handleComingSoon('댓글')}
      >
        <MessageSquareText strokeWidth={1.5} />
        <span className="mt-1 text-xs">57</span>
      </button>

      {/* 자막 */}
      <button
        aria-label="자막 보기"
        className="flex cursor-pointer flex-col items-center text-white hover:text-gray-300"
        type="button"
        onClick={() => handleComingSoon('자막')}
      >
        <ClosedCaption strokeWidth={1.5} />
        <span className="text-xs">자막</span>
      </button>

      {/* 저장 */}
      <button
        aria-label="저장"
        className="flex cursor-pointer flex-col items-center text-white hover:text-gray-300"
        type="button"
        onClick={() => handleComingSoon('저장')}
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
