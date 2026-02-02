'use client'

const PAGE_RANGE = 5

interface PaginationProps {
  totalPages: number
  currentPage: number
  isPending?: boolean
  onPageChange: (page: number) => void
  showPrevNext?: boolean
}

export default function Pagination({
  totalPages,
  currentPage,
  isPending = false,
  onPageChange,
  showPrevNext = true,
}: PaginationProps) {
  if (totalPages < 1) return null

  // 페이지네이션: 1-5, 6-10, 11-15...
  const currentGroup = Math.floor(currentPage / PAGE_RANGE)
  const totalGroups = Math.ceil(totalPages / PAGE_RANGE)

  const start = currentGroup * PAGE_RANGE
  const end = Math.min(start + PAGE_RANGE - 1, totalPages - 1)

  // start~end 범위를 페이지 번호 배열로 생성
  const pages = Array.from({ length: end - start + 1 }, (_, idx) => start + idx)

  // 이전/다음 그룹(5페이지 기준)으로 이동
  const goToPrevGroup = () => onPageChange((currentGroup - 1) * PAGE_RANGE + PAGE_RANGE - 1)
  const goToNextGroup = () => onPageChange((currentGroup + 1) * PAGE_RANGE)

  return (
    <div className="mt-8 flex items-center justify-center gap-1">
      {showPrevNext && (
        <button
          onClick={goToPrevGroup}
          disabled={isPending || currentGroup <= 0}
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
          onClick={goToNextGroup}
          disabled={isPending || currentGroup >= totalGroups - 1}
          className="flex h-8 min-w-12 items-center justify-center rounded-md px-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-50"
          aria-label="다음 페이지"
        >
          다음
        </button>
      )}
    </div>
  )
}
