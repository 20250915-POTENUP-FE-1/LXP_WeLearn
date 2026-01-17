import CommentDropDownMenu from '@/components/ui/CommentDropdownMenu'
import { ReplyCommentType } from '@/types/comment'
import { timeAgo } from '@/utils/timeAgo'
import { AnimatePresence, motion } from 'framer-motion'
import { User } from 'lucide-react'
import { useActionState, useEffect, useState } from 'react'
import { EditTarget } from './Comment'
import { Button } from '@/components/ui/Button'
import { patchReplyCommentAction } from '@/features/comment/action'
import { toast } from 'react-toastify'
import { DeleteTarget } from './CommentsModal'

interface ReCommentProps {
  openReply: number | null
  commentId: number
  replies: ReplyCommentType[] | null | undefined
  isReplyUpdate: number
  deleteTarget: DeleteTarget
  editTarget: EditTarget
  setEditTarget: React.Dispatch<React.SetStateAction<EditTarget>>
  setIsUpdate: React.Dispatch<React.SetStateAction<number>>
  setIsReplyUpdate: React.Dispatch<React.SetStateAction<number>>
  setDeleteTarget: React.Dispatch<React.SetStateAction<DeleteTarget>>
}

export default function ReComment({
  openReply,
  commentId,
  isReplyUpdate,
  replies,
  deleteTarget,
  editTarget,
  setDeleteTarget,
  setIsUpdate,
  setEditTarget,
  setIsReplyUpdate,
}: ReCommentProps) {
  const [replyPatchState, replyPatchAction] = useActionState(patchReplyCommentAction, {
    success: false,
    message: '',
    errors: {},
  })

  useEffect(() => {
    if (!openReply || !commentId) return
  }, [openReply, commentId, isReplyUpdate])

  useEffect(() => {
    if (replyPatchState.success) {
      toast.success('답글 수정에 성공하였습니다.🚀')
      setIsReplyUpdate((prev) => prev + 1)
      setEditTarget(null)
    } else if (replyPatchState.success === false && replyPatchState.message) {
      toast.error(replyPatchState.message)
    }
  }, [replyPatchState])
  return (
    <>
      <AnimatePresence initial={false}>
        {openReply === commentId &&
          replies
            ?.filter((reply) => reply.content !== '삭제된 댓글입니다.')
            .map((reply) => (
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
                      <div className="flex flex-1 gap-3">
                        {/* 프로필 */}
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                          {reply.writer.profileUrl ? (
                            <img
                              src={reply.writer.profileUrl}
                              alt={reply.writer.nickname}
                              className="h-8 w-8 rounded-full object-cover"
                            />
                          ) : (
                            <User strokeWidth={1.5} size={20} className="text-gray-400" />
                          )}
                        </div>

                        {/* 답글 내용 */}
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">
                              {reply.writer.nickname}
                            </span>
                            <span className="text-xs text-gray-400">
                              {timeAgo(reply.createdAt)}
                            </span>
                          </div>

                          {editTarget?.mode === 'reply' && editTarget.id === reply.replyId ? (
                            <form className="my-2 flex flex-col gap-2" action={replyPatchAction}>
                              <input type="hidden" name="replyId" value={reply.replyId} />
                              <input type="hidden" name="commentId" value={commentId} />
                              <input
                                type="text"
                                name="comment"
                                defaultValue={reply.content}
                                autoComplete="off"
                                placeholder="답글을 입력하세요..."
                                className="w-full rounded-full border border-gray-300 px-3 py-2 text-sm focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
                              />
                              <div className="flex justify-end gap-1">
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="rounded-full"
                                  onClick={() => setEditTarget(null)}
                                >
                                  취소
                                </Button>
                                <Button type="submit" variant="accent" className="rounded-full">
                                  등록
                                </Button>
                              </div>
                            </form>
                          ) : (
                            <p className="mb-2 text-sm leading-relaxed text-gray-700">
                              {reply.content}
                            </p>
                          )}
                        </div>
                      </div>

                      {reply.isMine && (
                        <CommentDropDownMenu
                          setIsUpdate={setIsUpdate}
                          setIsReplyUpdate={setIsReplyUpdate}
                          setEditTarget={setEditTarget}
                          setDeleteTarget={setDeleteTarget}
                          id={reply.replyId}
                          deleteTarget={deleteTarget}
                          mode="reply"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
      </AnimatePresence>
    </>
  )
}
