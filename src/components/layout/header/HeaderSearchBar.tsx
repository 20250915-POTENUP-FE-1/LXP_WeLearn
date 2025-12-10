'use client'

import { Search, X } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/Input'

export const HeaderSearchBar = () => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

  // PC 검색바의 오른쪽 버튼 (검색 아이콘)
  const searchButton = (
    <button
      type="button"
      className="flex text-gray-400 transition-colors hover:text-gray-600"
      aria-label="검색"
    >
      <Search className="h-5 w-5" />
    </button>
  )

  // 모바일 검색바의 오른쪽 버튼 (닫기 아이콘)
  const closeButton = (
    <button
      type="button"
      onClick={() => setIsMobileSearchOpen(false)}
      className="flex text-gray-400 transition-colors hover:text-gray-600"
      aria-label="검색 닫기"
    >
      <X className="h-5 w-5" />
    </button>
  )

  return (
    <>
      {/* PC 버전 검색바 */}
      <div className="hidden max-w-xl justify-between md:block md:flex-1">
        <Input
          type="text"
          name="search-desktop"
          placeholder="검색어를 입력하세요"
          variant="search"
          rightButton={searchButton}
          aria-label="검색"
        />
      </div>

      {/* 모바일 버전 - 아이콘만 표시 */}
      <button
        onClick={() => setIsMobileSearchOpen(true)}
        className="p-2 text-left text-gray-600 hover:text-gray-900 md:hidden"
        aria-label="검색 열기"
      >
        <Search className="h-5 w-5" />
      </button>

      {/* 모바일 검색바 오버레이 */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <>
            {/* 배경 오버레이 (클릭 시 닫기) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileSearchOpen(false)}
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
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
