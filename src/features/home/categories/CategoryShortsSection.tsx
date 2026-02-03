'use client'

import { useState, useTransition } from 'react'
import CategoryShortsCard from '@/features/home/categories/CategoryShortsCard'
import Pagination from '@/components/ui/Pagination'
import { Category } from '@/types/category/category'
import { PageResponse, ShortsBase } from '@/types/shorts/shorts'
import SortButton, { SortOption } from '@/components/ui/SortButton'
import { LucideTvMinimalPlay } from 'lucide-react'
import { getShortsAction, getShortsByCategoryAction } from '@/features/category.action'

/** 페이지당 아이템 수 */
const DEFAULT_PAGE_SIZE = 8

/** 정렬 옵션 - API sort 파라미터 변환 */
const SORT_PARAMS: Record<SortOption, string> = {
  latest: 'createdAt,desc',
  popular: 'likeCount,desc',
}

interface CategoryShortsSectionProps {
  initialShortsData: PageResponse<ShortsBase[]>
  categories: Category[]
}

export default function CategoryShortsSection({
  initialShortsData,
  categories,
}: CategoryShortsSectionProps) {
  const [isPending, startTransition] = useTransition()
  const [shortsData, setShortsData] = useState(initialShortsData)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [currentSort, setCurrentSort] = useState<SortOption>('latest')

  const displayedShorts = shortsData?.content ?? []
  const totalPages = shortsData?.totalPages ?? 0

  // 데이터 fetch 공통 함수
  const fetchShorts = async (categoryId: number | null, page: number, sort: SortOption) => {
    const params = { page, size: DEFAULT_PAGE_SIZE, sort: SORT_PARAMS[sort] }
    const response =
      categoryId === null
        ? await getShortsAction(params)
        : await getShortsByCategoryAction(categoryId, params)

    return response
  }

  // 카테고리 변경 핸들러
  const handleCategoryChange = (categoryId: number | null) => {
    startTransition(async () => {
      const data = await fetchShorts(categoryId, 0, currentSort)
      if (data) {
        setShortsData(data)
        setSelectedCategoryId(categoryId)
        setCurrentPage(0)
      }
    })
  }

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    startTransition(async () => {
      const data = await fetchShorts(selectedCategoryId, page, currentSort)
      if (data) {
        setShortsData(data)
        setCurrentPage(page)
      }
    })
  }

  // 정렬 변경 핸들러
  const handleSortChange = (sort: SortOption) => {
    startTransition(async () => {
      const data = await fetchShorts(selectedCategoryId, 0, sort)
      // 상태 업데이트
      if (data) {
        setShortsData(data)
        setCurrentSort(sort)
        setCurrentPage(0)
      }
    })
  }

  return (
    <section className="my-12 pt-10">
      <div className="mb-6 flex items-center justify-between">
        {/* 카테고리 타이틀 */}
        <div className="flex flex-row gap-2">
          <h2 className="text-xl font-extrabold text-gray-900 uppercase">All Shorts</h2>
          <span className="flex flex-row items-center justify-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
            총 {shortsData.totalElements ?? 0}개
          </span>
        </div>
        {/* 정렬 */}
        <SortButton
          currentSort={currentSort}
          onSortChange={handleSortChange}
          disabled={isPending}
        />
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
        showPrevNext
      />
    </section>
  )
}
