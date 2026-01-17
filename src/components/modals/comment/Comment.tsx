import { useActionState, useEffect, useState } from 'react'
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
    if (openReply !== null) {
      fetchReplies(openReply)
    }
  }, [openReply, isReplyUpdate])

  useEffect(() => {
    setEditTarget(null)
  }, [commentPatchState])

  const fetchReplies = async (commentId: number) => {
    try {
      setReplies(null) // 로딩 상태
      const data = await getReplyAction({ success: false, data: [] }, commentId)
      setReplies(data.data)
    } catch (error) {
      console.error(error)
    }
  }
  const handleReply = (commentId: number) => {
    setOpenReply((prev) => (prev === commentId ? null : commentId))
  }

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
        ))}
    </>
  )
}
