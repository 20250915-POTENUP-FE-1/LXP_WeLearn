import { ChevronDown, Ellipsis, User } from 'lucide-react'
import { useState } from 'react'
import { CommentType } from '@/types/comment'
import ReCommentInput from './ReCommentInput'
import ReComment from './ReComment'
import { timeAgo } from '@/utils/timeAgo'
import { ReplyActionState } from '@/features/comment/action'

interface CommentsProps {
  comments: CommentType[]
  Replystate: ReplyActionState
  ReplyAction: (formData: FormData) => void
}

export default function Comment({ comments, Replystate, ReplyAction }: CommentsProps) {
  const [openReply, setOpenReply] = useState<number | null>(null)
  const [openReplyInput, setOpenReplyInput] = useState<number | null>(null)

  const handleReply = (id: number) => {
    setOpenReply(openReply === id ? null : id)
  }

  const handleReplyInput = (id: number) => {
    setOpenReplyInput(openReplyInput === id ? null : id)
    setOpenReply(id)
  }

  return (
    <>
      {comments?.map((comment) => {
        return (
          <div className="border-b border-gray-200 py-8" key={comment.commentId}>
            <div className="flex items-start justify-between">
              <div className="flex flex-1 items-start gap-3">
                {/* 프로필 이미지 */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                  {comment.writer.profileUrl ? (
                    <img
                      src={comment.writer.profileUrl}
                      alt={comment.writer.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <User strokeWidth={1.5} size={20} className="text-gray-400" />
                  )}
                </div>

                {/* 댓글 내용 */}
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      {comment.writer.nickname}
                    </span>
                    <span className="text-xs text-gray-400">{timeAgo(comment.createdAt)}</span>
                  </div>
                  <p className="mb-2 text-sm leading-relaxed text-gray-700">{comment.content}</p>

                  {/* 답글 토글 & 답글달기 */}
                  <div className="flex items-center gap-4">
                    <button
                      className="flex items-center gap-1 text-xs text-gray-500 transition-colors hover:text-black"
                      onClick={() => {
                        handleReply(comment.commentId)
                      }}
                    >
                      답글 {comment.replyCount}개
                      <ChevronDown size={12} />
                    </button>
                    <button
                      className="text-xs text-gray-500 transition-colors hover:text-black"
                      onClick={() => {
                        handleReplyInput(comment.commentId)
                      }}
                    >
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
            <ReCommentInput
              commentId={comment.commentId}
              openReplyInput={openReplyInput}
              setOpenReplyInput={setOpenReplyInput}
              ReplyAction={ReplyAction}
            />
            {comment.replyCount > 0 && (
              <ReComment
                openReply={openReply}
                commentId={comment.commentId}
                Replystate={Replystate}
              />
            )}
          </div>
        )
      })}
    </>
  )
}
