import { Button } from '@/components/ui/Button'
import CommentDropDownMenu from '@/components/ui/CommentDropdownMenu'
import { timeAgo } from '@/utils/timeAgo'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, User } from 'lucide-react'
import ReCommentInput from './ReCommentInput'
import ReComment from './ReComment'
import { CommentType, ReplyCommentType } from '@/types/comment'
import { EditTarget } from './Comment'
import { DeleteTarget } from './CommentsModal'

interface CommentComponent {
  shortsId: string
  comment: CommentType
  openReply: number | null
  replies: ReplyCommentType[] | null | undefined
  deleteTarget: DeleteTarget
  editTarget: EditTarget | null
  openReplyInput: number | null
  isReplyUpdate: number
  commentPatchAction: (formData: FormData) => void
  handleReply: (id: number) => void
  handleReplyInput: (id: number) => void
  setEditTarget: React.Dispatch<React.SetStateAction<EditTarget | null>>
  setDeleteTarget: React.Dispatch<React.SetStateAction<DeleteTarget>>
  setIsUpdate: React.Dispatch<React.SetStateAction<number>>
  setOpenReplyInput: React.Dispatch<React.SetStateAction<number | null>>
  setIsReplyUpdate: React.Dispatch<React.SetStateAction<number>>
}
export default function CommentComponent({
  shortsId,
  comment,
  openReply,
  deleteTarget,
  editTarget,
  openReplyInput,
  replies,
  isReplyUpdate,
  commentPatchAction,
  handleReply,
  handleReplyInput,
  setEditTarget,
  setDeleteTarget,
  setIsUpdate,
  setOpenReplyInput,
  setIsReplyUpdate,
}: CommentComponent) {
  return (
    <div className="border-b border-gray-200 py-8" key={comment.commentId}>
      <div className="flex items-start justify-between">
        <div className="flex flex-1 items-start gap-3">
          {/* 프로필 이미지 */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600">
            {comment.writer.profileUrl ? (
              <img
                src={comment.writer.profileUrl}
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
              <span className="text-sm font-medium text-gray-900">{comment.writer.nickname}</span>
              <span className="text-xs text-gray-400">{timeAgo(comment.createdAt)}</span>
            </div>
            {editTarget?.mode === 'comment' ? (
              editTarget.id === comment.commentId ? (
                <form className="my-2 flex flex-col gap-2" action={commentPatchAction}>
                  <input type="hidden" name="commentId" value={comment.commentId} />
                  <input type="hidden" name="shortsId" value={shortsId} />
                  <input
                    type="text"
                    name="comment"
                    placeholder="답글을 입력하세요..."
                    autoComplete="off"
                    className="w-full flex-1 rounded-full border border-gray-300 px-3 py-2 text-sm no-underline focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
                    defaultValue={comment.content}
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
                    <Button variant="accent" className="rounded-full" type="submit">
                      등록
                    </Button>
                  </div>
                </form>
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
                      rotate: openReply === comment.commentId && comment.replyCount > 0 ? 180 : 0,
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
      <ReCommentInput
        commentId={comment.commentId}
        openReplyInput={openReplyInput}
        setOpenReplyInput={setOpenReplyInput}
        setIsReplyUpdate={setIsReplyUpdate}
        setIsUpdate={setIsUpdate}
      />
      {comment.replyCount > 0 && (
        <ReComment
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
  )
}
