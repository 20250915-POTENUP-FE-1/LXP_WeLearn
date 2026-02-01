'use client'

import React from 'react'

interface PaginationProps {
  totalPages: number
  currentPage: number
  isPending?: boolean
  onPageChange: (page: number) => void
  pageRange?: number
  showPrevNext?: boolean
}

export default function Pagination({
  totalPages,
  currentPage,
  isPending = false,
  onPageChange,
  pageRange = 5,
  showPrevNext = true,
}: PaginationProps) {
  if (totalPages < 1) return null

  // 페이지 표시 범위 계산
  const safeRange = Math.max(1, pageRange)
  const half = Math.floor(safeRange / 2)
  let start = Math.max(0, currentPage - half)
  let end = Math.min(totalPages - 1, start + safeRange - 1)

  // pageRange 설정 개수만큼 보여주기 위한 보정
   if (end - start + 1 < safeRange) {
     start = Math.max(0, end - safeRange + 1)
   }

  // start~end 범위를 페이지 번호 배열로 생성
  const pages = Array.from({ length: end - start + 1 }, (_, idx) => start + idx)


  return (
    <div className="mt-8 flex items-center justify-center gap-1">
      {showPrevNext && (
        <button
          onClick={() => onPageChange(Math.max(0, currentPage - 1))}
          disabled={isPending || currentPage <= 0}
          className="flex h-8 min-w-12 items-center justify-center rounded-md px-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-50"
          aria-label="이전 페이지"
        >
          이전
        </button>
      )}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={isPending}
          className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors ${
            currentPage === page
              ? 'bg-gray-900 text-white'
              : 'text-gray-600 hover:bg-gray-100 disabled:opacity-50'
          }`}
          aria-label={`${page + 1}번째 페이지`}
        >
          {page + 1}
        </button>
      ))}
      {showPrevNext && (
        <button
          onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
          disabled={isPending || currentPage >= totalPages - 1}
          className="flex h-8 min-w-12 items-center justify-center rounded-md px-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-50"
          aria-label="다음 페이지"
        >
          다음
        </button>
      )}
    </div>
  )
}
