'use client'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import CommentModalHeader from './CommentsModalHeader'
import Comment from './Comment'
import CommentInput from './CommentInput'

export default function CommentModal() {
  const router = useRouter()
  const params = useParams()
  const pathname = usePathname()

  const id = params.id as string
  const isOpen = pathname.endsWith('/comments')

  const handleClose = () => {
    router.replace(`/shorts/${id}`, { scroll: false })
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.aside
          className="fixed top-32 right-32 z-50 flex min-w-lg items-center justify-center"
          initial={{ x: '130%' }}
          animate={{ x: '0%' }}
          exit={{ x: '130%' }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
        >
          <div>
            {/* ==================== Modal Container ==================== */}
            <div className="flex h-[84vh] w-full max-w-lg flex-col overflow-hidden rounded-xl border bg-white shadow-lg">
              {/* ==================== Modal Header ==================== */}
              <CommentModalHeader closeHandler={handleClose} />

              {/* ==================== Comment List (댓글 목록 영역) ==================== */}
              <div className="flex-1 overflow-y-auto px-4">
                {/* ==================== Comment Block 1 ==================== */}
                <Comment />

                {/* ==================== Empty State (댓글 없을 때) ==================== */}
                {/* 
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p>아직 댓글이 없습니다.</p>
            <p className="text-sm mt-1">첫 번째 댓글을 남겨보세요!</p>
          </div>
          */}
              </div>

              {/* ==================== Comment Input Section Fixed (하단 고정 입력창) ==================== */}
              <CommentInput />
            </div>

            {/* ==================== Dropdown Menu (더보기 드롭다운) - hidden 제거하여 표시 ==================== */}
            {/* 
      <div className="absolute bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[100px] z-50">
        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          수정
        </button>
        <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          삭제
        </button>
      </div>
      */}

            {/* ==================== Confirm Modal (삭제 확인 모달) - hidden 제거하여 표시 ==================== */}
            {/* 
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg p-6 w-[280px] shadow-xl">
          <p className="text-center text-gray-800 mb-6">댓글을 완전히 삭제할까요?</p>
          <div className="flex gap-3 justify-center">
            <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">취소</button>
            <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">삭제</button>
          </div>
        </div>
      </div>
      */}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
