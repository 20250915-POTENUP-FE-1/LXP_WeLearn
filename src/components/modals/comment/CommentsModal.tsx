'use client'

import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import CommentModalHeader from './CommentsModalHeader'
import Comment from './Comment'
import CommentInput from './CommentInput'
import useIsMobile from '@/hook/useIsMobile'
import { useActionState, useEffect, useState } from 'react'
import { commentApi } from '@/services/comments/comments.service'
import { CommentsResponse } from '@/types/comment'
import {
  deleteCommentAction,
  patchCommentAction,
  postCommentAction,
  postReplyAction,
} from '@/features/comment/action'
import { toast } from 'react-toastify'
import DeleteModal from '@/components/ui/DeleteModal'

export default function CommentModal() {
  const router = useRouter()
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)
  const [shortsId, setShortsId] = useState<string>('')
  const [isDelete, setIsDelete] = useState(false)

  const [comments, setComments] = useState<CommentsResponse | null>(null)
  const [loading, setLoading] = useState(false)

  // 댓글 등록 Action
  const [commentPostState, commentPostAction] = useActionState(postCommentAction, {
    success: false,
    message: '',
    errors: {},
    timestamp: 0,
  })

  // 댓글 수정 Action
  const [commentPatchState, commentPatchAction] = useActionState(patchCommentAction, {
    success: false,
    message: '',
    errors: {},
  })

  // 댓글 삭제 Action
  const [commentDeleteState, commentDeleteAction] = useActionState(deleteCommentAction, {
    success: false,
    message: '',
    errors: {},
  })

  // 대댓글 Action
  const [replyPostState, replyPostAction] = useActionState(postReplyAction, {
    success: false,
    message: '',
    errors: {},
  })

  console.log(commentDeleteState)

  // pathname에서 shortsId 추출
  // 스와이프로 shortsId가 변화하는것을 감지하여 shortsId에 넣어준다.
  // URL이 /shorts/{shortsId}/comments 형식일 때, {shortsId} 부분을 state에 저장
  useEffect(() => {
    const match = pathname.match(/\/shorts\/([^\/]+)/)
    if (match?.[1]) {
      setShortsId(match[1])
    }
  }, [pathname])

  // 현재 모달이 열려 있는지 판단
  const isOpen = pathname.endsWith('/comments')

  // 댓글 목록 불러오기
  const fetchComments = async () => {
    if (!shortsId) return
    setLoading(true)

    try {
      const res = await commentApi.getComment(Number(shortsId))
      setComments(res)
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      toast.error('댓글 조회를 실패하였습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 컴포넌트가 마운트되었는지 체크
  // mounted가 true가 되어야 fetchComments 실행
  useEffect(() => {
    setMounted(true)
  }, [])

  // 댓글 목록을 가져오는 useEffect
  // mounted가 true이고, 모달이 열려 있으며, shortsId가 존재할 때 fetchComments 실행
  useEffect(() => {
    if (!mounted || !isOpen || !shortsId) return

    fetchComments()
  }, [mounted, isOpen, shortsId])

  // 모달 닫기 함수
  // 모달을 닫으면 /shorts/{shortsId} 경로로 이동
  const handleClose = () => {
    router.push(`/shorts/${shortsId}`)
  }

  // 댓글 등록 성공시 토스트 ui
  useEffect(() => {
    if (commentPostState.success && shortsId) {
      toast.success('댓글 등록에 성공하였습니다.🚀')
      fetchComments()
    } else if (commentPostState.success === false && commentPostState.message) {
      toast.error(commentPostState.message)
    }
  }, [commentPostState.timestamp])

  // 댓글 수정 성공시 토스트 ui
  useEffect(() => {
    if (commentPatchState.success) {
      toast.success('댓글 수정에 성공하였습니다.🚀')
      fetchComments()
    } else if (commentPatchState.success === false && commentPatchState.message) {
      toast.error(commentPatchState.message)
    }
  }, [commentPatchState])

  // 댓글 삭제 성공 시 토스트 ui
  useEffect(() => {
    if (commentDeleteState.success) {
      toast.success('댓글 삭제에 성공하였습니다.🚀')
      fetchComments()
      setIsDelete(false)
    } else if (commentDeleteState.success === false && commentDeleteState.message) {
      toast.error(commentDeleteState.message)
    }
  }, [commentDeleteState])

  const handleDeleteMode = () => {
    setIsDelete(true)
  }

  // 대댓글 성공시 토스트 ui
  useEffect(() => {
    if (replyPostState.success) {
      toast.success('댓글 등록에 성공하였습니다.🚀')
      fetchComments()
    } else if (replyPostState.success === false && replyPostState.message) {
      toast.error(replyPostState.message)
    }
  }, [replyPostState])

  return (
    <AnimatePresence mode="wait">
      {isOpen && mounted && (
        <motion.aside
          className={`fixed z-50 flex min-w-lg items-center justify-center ${isMobile ? 'top-0 right-0 box-border h-full w-screen' : 'top-32 right-32'}`}
          initial={isMobile ? { y: '100%' } : { x: '130%' }}
          animate={isMobile ? { y: 0 } : { x: '0%' }}
          exit={isMobile ? { y: '100%' } : { x: '130%' }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
        >
          <div>
            {/* ==================== Modal Container ==================== */}
            <div
              className={`flex flex-col overflow-hidden border bg-white shadow-lg ${
                isMobile
                  ? 'absolute right-0 bottom-0 h-[74vh] w-screen rounded-t-2xl'
                  : 'h-[84vh] max-w-lg min-w-lg rounded-xl'
              } `}
            >
              {/* ==================== Modal Header ==================== */}
              <CommentModalHeader closeHandler={handleClose} totalCount={comments?.data?.length} />
              {/* ==================== Comment List (댓글 목록 영역) ==================== */}
              <div className="flex-1 overflow-y-auto px-4">
                {/* ==================== Comment Block 1 ==================== */}
                {comments?.data?.length !== 0 ? (
                  <Comment
                    comments={comments?.data ?? []}
                    replyPostState={replyPostState}
                    replyPostAction={replyPostAction}
                    shortsId={shortsId}
                    commentPatchAction={commentPatchAction}
                    commentPatchState={commentPatchState}
                    handleDeleteMode={handleDeleteMode}
                    isDelete={isDelete}
                    setIsDelete={setIsDelete}
                    commentDeleteAction={commentDeleteAction}
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-lg text-gray-600">
                    등록된 댓글이 없습니다.
                  </span>
                )}
              </div>
              <CommentInput commentPostAction={commentPostAction} shortsId={shortsId} />
            </div>

            {/* ==================== Confirm Modal (삭제 확인 모달) - hidden 제거하여 표시 ==================== */}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
