'use client'

import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import CommentModalHeader from './CommentsModalHeader'
import CommentInput from './CommentInput'
import useIsMobile from '@/hook/useIsMobile'
import { startTransition, useActionState, useEffect, useState } from 'react'
import DeleteModal from '@/components/ui/DeleteModal'
import { getCommentAction } from './action'
import { CommentsResponse } from '@/types/comments/comments'
import CommentList from './CommentList'

export type DeleteTarget =
  | { mode: 'comment'; id: number; parentId: number | null }
  | { mode: 'reply'; id: number; parentId: number | null }
  | null

export default function CommentModalContainer() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)
  const [shortsId, setShortsId] = useState<string>('')
  const [isUpdate, setIsUpdate] = useState(0)
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>(null)
  const [isReplyUpdate, setIsReplyUpdate] = useState(0)
  const [comments, setComments] = useState<CommentsResponse[] | []>()
  const [totalCount, setTotalCount] = useState<number>(0)
  const [CommentState, CommentAction, ispending] = useActionState(getCommentAction, {
    success: false,
    message: '',
    errors: { content: '' },
  })

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

  // 컴포넌트가 마운트되었는지 체크
  // mounted가 true가 되어야 fetchComments 실행
  useEffect(() => {
    setMounted(true)
  }, [])

  // 댓글 목록을 가져오는 useEffect
  // mounted가 true이고, 모달이 열려 있으며, shortsId가 존재할 때 fetchComments 실행
  useEffect(() => {
    if (!mounted || !isOpen || !shortsId) return
    startTransition(() => {
      CommentAction(Number(shortsId))
    })
  }, [mounted, isOpen, shortsId, isUpdate])

  useEffect(() => {
    if (CommentState.success) {
      setComments(CommentState.data?.comments ?? [])
      setTotalCount(CommentState.data?.totalCommentCount || 0)
    }
  }, [CommentState.success, CommentState.data])

  // 모달 닫기 함수
  // 히스토리상 comment 삭제
  const handleClose = () => {
    window.history.replaceState(null, '', `/shorts/${shortsId}`)
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && mounted && (
        <motion.aside
          className={`fixed z-50 flex min-w-lg items-center justify-center ${isMobile ? 'top-0 right-0 box-border h-full w-screen' : 'top-27 right-24'}`}
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
              <CommentModalHeader closeHandler={handleClose} totalCount={totalCount} />
              {/* ==================== Comment List (댓글 목록 영역) ==================== */}
              <div className="flex-1 overflow-y-auto px-4 [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {/* ==================== Comment Block 1 ==================== */}
                {comments?.length !== 0 ? (
                  <CommentList
                    comments={comments ?? []}
                    shortsId={shortsId}
                    isReplyUpdate={isReplyUpdate}
                    deleteTarget={deleteTarget}
                    setIsUpdate={setIsUpdate}
                    setIsReplyUpdate={setIsReplyUpdate}
                    setDeleteTarget={setDeleteTarget}
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-lg text-gray-600">
                    등록된 댓글이 없습니다.
                  </span>
                )}
              </div>
              <CommentInput shortsId={shortsId} setIsUpdate={setIsUpdate} />
            </div>

            {deleteTarget && (
              <DeleteModal
                deleteTarget={deleteTarget}
                setIsUpdate={setIsUpdate}
                setIsReplyUpdate={setIsReplyUpdate}
                setDeleteTarget={setDeleteTarget}
              />
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
