import { RecommentApi } from '@/services/comments/recomments.service'
import { ReplyCommentResponse } from '@/types/comment'
import { timeAgo } from '@/utils/timeAgo'
import { AnimatePresence, motion } from 'framer-motion'
import { Ellipsis, User } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ReCommentProps {
  openReply: number | null
  commentId: number
  isReplyUpdate: number
}

export default function ReComment({ openReply, commentId, isReplyUpdate }: ReCommentProps) {
  const [replyComment, setReplyComment] = useState<ReplyCommentResponse | null>(null)

  const fetchReplyComment = async () => {
    const res = await RecommentApi.getReplyComment(Number(commentId))
    setReplyComment(res)
  }

  useEffect(() => {
    if (!openReply || !commentId) return

    fetchReplyComment()
  }, [openReply, commentId, isReplyUpdate])

  return (
    <>
      <AnimatePresence initial={false}>
        {openReply === commentId &&
          replyComment?.data.map((reply) => (
            <motion.div
              key={reply.replyId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-3">
                <div className="border-gray-100 pt-3 pl-12">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                      {reply.writer.profileUrl ? (
                        <img
                          src={reply.writer.profileUrl}
                          alt={reply.writer.name}
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
                          {reply.writer.nickname}
                        </span>
                        <span className="text-xs text-gray-400">{timeAgo(reply.createdAt)}</span>
                      </div>
                      <p className="mb-2 text-sm leading-relaxed text-gray-700">{reply.content}</p>
                    </div>
                    <button className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100">
                      <Ellipsis size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
    </>
  )
}
