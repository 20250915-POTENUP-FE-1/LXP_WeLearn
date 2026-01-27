import { AnimatePresence, motion } from 'framer-motion'
import { Button } from './Button'
import { useActionState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { deleteCommentAction, deleteReplyCommentAction } from '@/features/modals/comment/action'
import { DeleteTarget } from '@/features/modals/comment/CommentsModalContainer'

interface DeleteModalProps {
  deleteTarget: DeleteTarget
  setIsUpdate: React.Dispatch<React.SetStateAction<number>>
  setIsReplyUpdate?: React.Dispatch<React.SetStateAction<number>>
  setDeleteTarget: React.Dispatch<React.SetStateAction<DeleteTarget>>
}

export default function DeleteModal({
  deleteTarget,
  setIsUpdate,
  setIsReplyUpdate,
  setDeleteTarget,
}: DeleteModalProps) {
  // 댓글 삭제 Action
  const [commentDeleteState, commentDeleteAction] = useActionState(deleteCommentAction, {
    success: false,
    message: '',
    errors: {},
  })

  const [replyCommentDeleteState, replyCommentDeleteAction] = useActionState(
    deleteReplyCommentAction,
    {
      success: false,
      message: '',
      errors: {},
    },
  )

  // 댓글 삭제 성공 시 토스트 ui
  useEffect(() => {
    if (commentDeleteState.success) {
      toast.success('댓글 삭제에 성공하였습니다.🚀')
      setIsUpdate((prev) => prev + 1)
      setDeleteTarget(null)
    } else if (replyCommentDeleteState.success) {
      toast.success('답글 삭제에 성공하였습니다.🚀')
      setIsUpdate((prev) => prev + 1)
      if (setIsReplyUpdate) {
        setIsReplyUpdate((prev) => prev + 1)
      }
      setDeleteTarget(null)
    } else if (commentDeleteState.success === false && commentDeleteState.errors?.content) {
      toast.error(commentDeleteState.errors.content)
    } else if (
      replyCommentDeleteState.success === false &&
      replyCommentDeleteState.errors?.content
    ) {
      toast.error(replyCommentDeleteState.errors.content)
    }
  }, [commentDeleteState, replyCommentDeleteState])

  return (
    <AnimatePresence>
      {deleteTarget && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
        >
          <div className="absolute inset-0 z-60 flex items-center justify-center rounded-xl bg-black/50">
            <div className="w-[280px] rounded-lg bg-white p-6 shadow-xl">
              <p className="mb-6 text-center text-gray-800">
                {deleteTarget.mode === 'comment' ? '댓글' : '답글'}을 완전히 삭제할까요?
              </p>
              <div className="flex justify-center gap-3">
                <Button variant="outline" onClick={() => setDeleteTarget(null)}>
                  취소
                </Button>
                <form
                  action={
                    deleteTarget.mode === 'comment' ? commentDeleteAction : replyCommentDeleteAction
                  }
                >
                  {deleteTarget.parentId !== null && (
                    <input type="hidden" name="commentId" value={deleteTarget.parentId} />
                  )}
                  <input
                    type="hidden"
                    name={deleteTarget.mode === 'comment' ? 'commentId' : 'replyId'}
                    value={deleteTarget.id}
                  />
                  <Button variant="default">삭제</Button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
