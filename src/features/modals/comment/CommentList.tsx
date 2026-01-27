import { useActionState, useEffect, useState } from 'react'
import { ReplyCommentType } from '@/types/comment'
import { toast } from 'react-toastify'
import { getReplyAction, patchCommentAction } from './action'
import { CommentsResponse } from '@/types/comments/comments'
import { DeleteTarget } from './CommentsModalContainer'
import { ChevronDown, User } from 'lucide-react'
import { timeAgo } from '@/utils/timeAgo'
import { AnimatePresence, motion } from 'framer-motion'
import CommentDropDownMenu from '@/components/ui/CommentDropdownMenu'
import ReplyListInput from './ReplyListInput'
import ReplyList from './ReplyList'
import EditCommentForm from './EditCommentForm'

interface CommentsListProps {
  comments: CommentsResponse[]
  shortsId: string
  deleteTarget: DeleteTarget
  isReplyUpdate: number
  setIsUpdate: React.Dispatch<React.SetStateAction<number>>
  setDeleteTarget: React.Dispatch<React.SetStateAction<DeleteTarget>>
  setIsReplyUpdate: React.Dispatch<React.SetStateAction<number>>
}

export type EditTarget = { mode: 'comment'; id: number } | { mode: 'reply'; id: number } | null

export default function CommentList({
  comments,
  shortsId,
  deleteTarget,
  isReplyUpdate,
  setIsUpdate,
  setDeleteTarget,
  setIsReplyUpdate,
}: CommentsListProps) {
  const [openReply, setOpenReply] = useState<number | null>(null)
  const [openReplyInput, setOpenReplyInput] = useState<number | null>(null)
  const [editTarget, setEditTarget] = useState<EditTarget>(null)
  const [replies, setReplies] = useState<ReplyCommentType[] | null | undefined>(null)

  // 댓글 수정 Action
  const [commentPatchState, commentPatchAction] = useActionState(patchCommentAction, {
    success: false,
    message: '',
    errors: {},
  })

  // 댓글 수정 성공시 토스트 ui
  useEffect(() => {
    if (commentPatchState.success) {
      toast.success('댓글 수정에 성공하였습니다.🚀')
      setIsUpdate((prev: number) => prev + 1)
    } else if (commentPatchState.success === false && commentPatchState.message) {
      toast.error(commentPatchState.message)
    }
  }, [commentPatchState])

  // 대댓글 작성 완료시 새로 대댓글 가져오는 함수
  useEffect(() => {
    if (openReply !== null) {
      fetchReplies(openReply)
    }
  }, [openReply, isReplyUpdate])

  // 수정 완료 되면 수정하려던 타겟 null로 변경
  useEffect(() => {
    setEditTarget(null)
  }, [commentPatchState])

  // 대댓글 불러오는 함수
  const fetchReplies = async (commentId: number) => {
    try {
      setReplies(null) // 로딩 상태
      const data = await getReplyAction({ success: false, data: [] }, commentId)
      setReplies(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  // 대댓글 열고 닫는 함수
  const handleReply = (commentId: number) => {
    setOpenReply((prev) => (prev === commentId ? null : commentId))
  }

  // 대댓글 인풋 열고 닫는 함수
  const handleReplyInput = (id: number) => {
    setOpenReplyInput(openReplyInput === id ? null : id)
    setOpenReply(id)
  }

  return (
    <>
      {comments
        ?.filter((comment) => {
          return comment.content !== '삭제된 댓글입니다.'
        })
        .map((comment) => (
          <div className="border-b border-gray-200 py-8" key={comment.commentId}>
            <div className="flex items-start justify-between">
              <div className="flex flex-1 items-start gap-3">
                {/* 프로필 이미지 */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                  {comment.writer.profileImageUrl !== null ? (
                    <img
                      src={comment.writer.profileImageUrl}
                      alt={comment.writer.nickname}
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
                  {editTarget?.mode === 'comment' ? (
                    editTarget.id === comment.commentId ? (
                      <EditCommentForm
                        action={commentPatchAction}
                        defaultValue={comment.content}
                        onCancel={() => setEditTarget(null)}
                      >
                        <input type="hidden" name="commentId" value={comment.commentId} />
                        <input type="hidden" name="shortsId" value={shortsId} />
                      </EditCommentForm>
                    ) : (
                      ''
                    )
                  ) : (
                    <p className="mb-2 text-sm leading-relaxed text-gray-700">{comment.content}</p>
                  )}

                  {/* 답글 토글 & 답글달기 */}
                  <div className="flex items-center gap-4">
                    <button
                      className="flex items-center gap-1 text-xs text-gray-500 transition-colors hover:text-black"
                      onClick={() => {
                        handleReply(comment.commentId)
                      }}
                    >
                      답글 {comment.replyCount}개
                      <AnimatePresence>
                        <motion.div
                          animate={{
                            rotate:
                              openReply === comment.commentId && comment.replyCount > 0 ? 180 : 0,
                          }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <ChevronDown size={12} />
                        </motion.div>
                      </AnimatePresence>
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
              {comment.isMine && (
                <CommentDropDownMenu
                  deleteTarget={deleteTarget}
                  id={comment.commentId}
                  setEditTarget={setEditTarget}
                  setIsUpdate={setIsUpdate}
                  mode="comment"
                  setDeleteTarget={setDeleteTarget}
                />
              )}
            </div>
            <ReplyListInput
              commentId={comment.commentId}
              openReplyInput={openReplyInput}
              setOpenReplyInput={setOpenReplyInput}
              setIsReplyUpdate={setIsReplyUpdate}
              setIsUpdate={setIsUpdate}
            />
            {comment.replyCount > 0 && (
              <ReplyList
                editTarget={editTarget}
                openReply={openReply}
                replies={replies}
                commentId={comment.commentId}
                isReplyUpdate={isReplyUpdate}
                deleteTarget={deleteTarget}
                setDeleteTarget={setDeleteTarget}
                setEditTarget={setEditTarget}
                setIsUpdate={setIsUpdate}
                setIsReplyUpdate={setIsReplyUpdate}
              />
            )}
          </div>
        ))}
    </>
  )
}
