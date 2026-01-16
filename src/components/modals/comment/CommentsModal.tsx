'use client'

import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import CommentModalHeader from './CommentsModalHeader'
import Comment from './Comment'
import CommentInput from './CommentInput'
import useIsMobile from '@/hook/useIsMobile'
import { useEffect, useState } from 'react'
import { commentApi } from '@/services/comments/comments.service'
import { CommentsResponse, CommentType } from '@/types/comment'
import { toast } from 'react-toastify'
import DeleteModal from '@/components/ui/DeleteModal'

export type DeleteTarget = { mode: 'comment'; id: number } | { mode: 'reply'; id: number } | null

export default function CommentModal() {
  const router = useRouter()
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)
  const [shortsId, setShortsId] = useState<string>('')
  const [isUpdate, setIsUpdate] = useState(0)
  const [comments, setComments] = useState<CommentType[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>(null)
  const [isReplyUpdate, setIsReplyUpdate] = useState(0)

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
      setComments(res.data)
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
  }, [mounted, isOpen, shortsId, isUpdate])

  // 모달 닫기 함수
  // 모달을 닫으면 /shorts/{shortsId} 경로로 이동
  const handleClose = () => {
    router.push(`/shorts/${shortsId}`)
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
              <CommentModalHeader closeHandler={handleClose} totalCount={comments?.length} />
              {/* ==================== Comment List (댓글 목록 영역) ==================== */}
              <div className="flex-1 overflow-y-auto px-4">
                {/* ==================== Comment Block 1 ==================== */}
                {comments?.length !== 0 ? (
                  <Comment
                    comments={comments ?? []}
                    shortsId={shortsId}
                    setIsUpdate={setIsUpdate}
                    isReplyUpdate={isReplyUpdate}
                    setIsReplyUpdate={setIsReplyUpdate}
                    deleteTarget={deleteTarget}
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
