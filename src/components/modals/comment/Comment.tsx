import { startTransition, useActionState, useEffect, useState } from 'react'
import { CommentType, ReplyCommentType } from '@/types/comment'
import { getReplyAction, patchCommentAction } from '@/features/comment/action'
import { toast } from 'react-toastify'
import { DeleteTarget } from './CommentsModal'

import CommentComponent from './CommentComponents'

interface CommentsProps {
  comments: CommentType[]
  shortsId: string
  deleteTarget: DeleteTarget
  isReplyUpdate: number
  setIsUpdate: React.Dispatch<React.SetStateAction<number>>
  setDeleteTarget: React.Dispatch<React.SetStateAction<DeleteTarget>>
  setIsReplyUpdate: React.Dispatch<React.SetStateAction<number>>
}

export type EditTarget = { mode: 'comment'; id: number } | { mode: 'reply'; id: number } | null

export default function Comment({
  comments,
  shortsId,
  deleteTarget,
  isReplyUpdate,
  setIsUpdate,
  setDeleteTarget,
  setIsReplyUpdate,
}: CommentsProps) {
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

  // 대댓글 조회 action
  const [getReplyCommentState, getReplyCommentAction] = useActionState(getReplyAction, {
    success: false,
    data: [],
    message: '',
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

  useEffect(() => {
    if (getReplyCommentState.success === true) {
      setReplies(getReplyCommentState.data)
    }
  }, [getReplyCommentState])

  useEffect(() => {
    if (openReply !== null) {
      startTransition(() => {
        getReplyCommentAction(openReply)
      })
    }
  }, [openReply, isReplyUpdate])

  useEffect(() => {
    setEditTarget(null)
  }, [commentPatchState])

  const handleReply = async (id: number) => {
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
          <CommentComponent
            key={comment.commentId}
            shortsId={shortsId}
            comment={comment}
            openReply={openReply}
            deleteTarget={deleteTarget}
            editTarget={editTarget}
            openReplyInput={openReplyInput}
            replies={replies}
            isReplyUpdate={isReplyUpdate}
            commentPatchAction={commentPatchAction}
            handleReply={handleReply}
            handleReplyInput={handleReplyInput}
            setEditTarget={setEditTarget}
            setDeleteTarget={setDeleteTarget}
            setIsUpdate={setIsUpdate}
            setOpenReplyInput={setOpenReplyInput}
            setIsReplyUpdate={setIsReplyUpdate}
          />
        )
      })}
    </>
  )
}
