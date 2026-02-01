'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import CategoryShortsCard from '@/features/home/categories/CategoryShortsCard'
import Pagination from '@/components/ui/Pagination'
import { Category } from '@/types/category/category'
import { PageResponse, ShortsBase } from '@/types/shorts/shorts'
import SortButton from '@/components/ui/SortButton'
import { LucideTvMinimalPlay } from 'lucide-react'

interface CategoryShortsSectionProps {
  shortsData: PageResponse<ShortsBase[]>
  categories: Category[]
  selectedCategoryId: number | null
  currentPage: number
}

export default function CategoryShortsSection({
  shortsData,
  categories,
  selectedCategoryId,
  currentPage,
}: CategoryShortsSectionProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const displayedShorts = shortsData.content ?? []
  const totalPages = shortsData.totalPages ?? 0

  // URL 업데이트 (서버 컴포넌트 재렌더링 트리거)
  const updateQuery = (categoryId: number | null, page: number) => {
    const params = new URLSearchParams()
    if (categoryId !== null) {
      params.set('category', String(categoryId))
    }
    if (page > 0) {
      params.set('page', String(page))
    }
    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false })
    })
  }

  // 카테고리 변경 핸들러
  const handleCategoryChange = (categoryId: number | null) => {
    updateQuery(categoryId, 0)
  }

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    updateQuery(selectedCategoryId, page)
  }

  return (
    <section className="my-12 pt-10">
      <div className="mb-6 flex items-center justify-between">
        {/* 카테고리 타이틀 */}
        <h2 className="text-xl font-extrabold text-gray-900 uppercase">Categories</h2>
        {/* 정렬 */}
        <SortButton />
      </div>

      {/* 카테고리별 필터 */}
      <div className="scrollbar-hide mb-6 flex items-center gap-2 overflow-x-auto md:flex-wrap md:overflow-x-visible">
        {categories.map((category) => {
          // "전체" 카테고리는 categoryId를 null로 처리
          const categoryId = category.name === '전체' ? null : category.id
          const isSelected = selectedCategoryId === categoryId

          return (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(categoryId)}
              disabled={isPending}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isSelected
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-300 text-gray-600 hover:border-gray-400'
              }`}
            >
              {category.name}
            </button>
          )
        })}
      </div>

      {/* 숏츠 목록 */}
      <div className="relative min-h-[400px]">
        {isPending && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />
          </div>
        )}
        {displayedShorts.length === 0 && !isPending ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center py-16 text-center">
            <LucideTvMinimalPlay strokeWidth={1.5} className="mb-4 h-12 w-12 text-gray-400" />

            <p className="text-gray-500">
              {selectedCategoryId !== null
                ? `${categories.find((c) => c.id === selectedCategoryId)?.name ?? '해당 카테고리'}에 대한 숏츠가 없습니다.`
                : '등록된 숏츠가 없습니다.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {displayedShorts.map((shorts) => (
              <CategoryShortsCard key={shorts.shortsId} shorts={shorts} />
            ))}
          </div>
        )}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        isPending={isPending}
        onPageChange={handlePageChange}
        pageRange={5}
        showPrevNext
      />
    </section>
  )
}
