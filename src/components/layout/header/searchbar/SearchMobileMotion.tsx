'use client'

import { Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/Input'
import { toast } from 'react-toastify'

interface SearchMobileMotionProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchMobileMotion({ isOpen, onClose }: SearchMobileMotionProps) {
  const handleComingSoon = () => {
    toast.info('검색 기능은 준비 중입니다.', {
      toastId: 'header-search-toast',
    })
  }

  const closeButton = (
    <button
      type="button"
      onClick={onClose}
      className="flex text-gray-400 transition-colors hover:text-gray-600"
      aria-label="검색 닫기"
    >
      <X className="h-4 w-4" />
    </button>
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 (클릭 시 닫기) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-60 bg-black/20 md:hidden"
          />

          {/* 검색바 영역 */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 35,
              stiffness: 300,
            }}
            className="fixed top-0 right-0 left-0 z-70 border-b border-gray-200 bg-white md:hidden"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center gap-4">
                {/* 검색 아이콘 (title 표시) */}
                <div className="p-2 text-gray-600">
                  <Search className="h-5 w-5" />
                </div>

                {/* 모바일 검색바 */}
                <div className="flex-1">
                  <Input
                    type="text"
                    name="search-mobile"
                    placeholder="검색어를 입력하세요"
                    variant="search"
                    rightButton={closeButton}
                    autoFocus
                    aria-label="검색"
                    onClick={handleComingSoon}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
