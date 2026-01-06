import { ChevronDown, Ellipsis, User } from 'lucide-react'
import ReComment from './ReComment'
import { useState } from 'react'
import { CommentType } from '@/types/comment'

interface CommentsProps {
  comments?: CommentType[]
}

export default function Comment(comments: CommentsProps) {
  const [openReply, setOpenReply] = useState<number | null>(null)

  console.log(comments)

  const handleReply = () => {
    // setOpenReply((prev) => (prev === Comment.id ? null : Comment.id))
  }
  return (
    <>
      {comments.comments?.map((comment) => {
        return (
          <div className="border-b border-gray-200 py-4" key={comment.id}>
            <div className="flex items-start justify-between">
              <div className="flex flex-1 items-start gap-3">
                {/* 프로필 이미지 */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                  {comment.user.profileUrl ? (
                    <img
                      src={comment.user.profileUrl}
                      alt={comment.user.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <User strokeWidth={1.5} size={24} />
                  )}
                </div>

                {/* 댓글 내용 */}
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{comment.user.name}</span>
                    <span className="text-xs text-gray-400">12시간 전</span>
                  </div>
                  <p className="mb-2 text-sm leading-relaxed text-gray-700">{comment.content}</p>

                  {/* 답글 토글 & 답글달기 */}
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-xs text-gray-500 transition-colors hover:text-black">
                      답글 {comment.replies.length}개
                      <ChevronDown size={12} />
                    </button>
                    <button className="text-xs text-gray-500 transition-colors hover:text-black">
                      답글달기
                    </button>
                  </div>
                </div>
              </div>
              {/* 더보기 버튼 */}
              <button className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100">
                <Ellipsis size={18} />
              </button>
            </div>
          </div>
        )
      })}

      <ReComment />
    </>
  )
}
