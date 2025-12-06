import { ClosedCaption, Heart, ListPlus, MessageSquareText, Send } from 'lucide-react'

function ShortsActionBar() {
  return (
    <aside className="absolute right-5 bottom-18 flex flex-col items-center gap-6">
      {/* 좋아요 */}
      <button
        aria-label="좋아요"
        className="flex cursor-pointer flex-col items-center text-white hover:text-gray-300 focus:ring-1 focus:ring-gray-600 focus:outline-none"
        type="button"
      >
        <Heart strokeWidth={1.5} />
        <span className="mt-1 text-sm">892</span>
      </button>

      {/* 댓글 */}
      <button
        aria-label="댓글 보기"
        className="flex cursor-pointer flex-col items-center text-white hover:text-gray-300 focus:ring-1 focus:ring-gray-600 focus:outline-none"
        type="button"
      >
        <MessageSquareText strokeWidth={1.5} />
        <span className="mt-1 text-sm">57</span>
      </button>

      {/* 자막 */}
      <button
        aria-label="자막 보기"
        className="flex cursor-pointer flex-col items-center text-white hover:text-gray-300 focus:ring-1 focus:ring-gray-600 focus:outline-none"
        type="button"
      >
        <ClosedCaption strokeWidth={1.5} />
        <span className="text-sm">자막</span>
      </button>

      {/* 저장 */}
      <button
        aria-label="저장"
        className="flex cursor-pointer flex-col items-center text-white hover:text-gray-300 focus:ring-1 focus:ring-gray-600 focus:outline-none"
        type="button"
      >
        <ListPlus strokeWidth={1.5} />
        <span className="mt-1 text-sm">저장</span>
      </button>

      {/* 공유 */}
      <button
        aria-label="공유"
        className="flex cursor-pointer flex-col items-center text-white hover:text-gray-300 focus:ring-1 focus:ring-gray-600 focus:outline-none"
        type="button"
      >
        <Send strokeWidth={1.5} />
        <span className="mt-1 text-sm">공유</span>
      </button>
    </aside>
  )
}

export default ShortsActionBar
