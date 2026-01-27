'use client'

import React, { useState, useTransition } from 'react'
import CategoryShortsCard from '@/features/home/categories/CategoryShortsCard'
import { getShortsAction, getShortsByCategoryAction } from '@/features/category.action'
import { Youtube } from 'lucide-react'
import { Category } from '@/types/category/category'
import { PageResponse, ShortsBase } from '@/types/shorts/shorts'
import SortButton from '@/components/ui/SortButton'

const ITEMS_PER_PAGE = 8

interface CategoryShortsSectionProps {
  initialShorts: PageResponse<ShortsBase[]>
  categories: Category[]
}

export default function CategoryShortsSection({
  initialShorts,
  categories,
}: CategoryShortsSectionProps) {
  // 선택된 카테고리 ID (null = 전체)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  // 현재 페이지 번호
  const [currentPage, setCurrentPage] = useState(0)
  // 숏츠 데이터
  const [shortsData, setShortsData] = useState<PageResponse<ShortsBase[]>>(initialShorts)
  // 로딩 상태
  const [isPending, startTransition] = useTransition()

  const displayedShorts = shortsData.content ?? []
  const totalPages = shortsData.totalPages ?? 0

  // 데이터 fetch 함수 (Server Action 사용)
  const fetchShorts = (categoryId: number | null, page: number) => {
    startTransition(async () => {
      try {
        let response: PageResponse<ShortsBase[]> | null

        if (categoryId === null) {
          // 전체 숏츠 조회
          response = await getShortsAction({ page, size: ITEMS_PER_PAGE })
        } else {
          // 카테고리별 숏츠 조회
          response = await getShortsByCategoryAction(categoryId, {
            page,
            size: ITEMS_PER_PAGE,
          })
        }

        if (response) {
          setShortsData(response)
        }
      } catch (error) {
        console.error('숏츠 목록 조회 실패:', error)
      }
    })
  }

  // 카테고리 변경 핸들러
  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategoryId(categoryId)
    setCurrentPage(0)
    fetchShorts(categoryId, 0)
  }

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    fetchShorts(selectedCategoryId, page)
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
        <button
          onClick={() => handleCategoryChange(null)}
          className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            selectedCategoryId === null
              ? 'border-gray-900 bg-gray-900 text-white'
              : 'border-gray-300 text-gray-600 hover:border-gray-400'
          }`}
        >
          전체
        </button>

        {/*  카테고리 선택 버튼 */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategoryId === category.id
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-300 text-gray-600 hover:border-gray-400'
            }`}
          >
            {category.name}
          </button>
        ))}
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
            <Youtube strokeWidth={1.5} className="mb-4 h-12 w-12 text-gray-300" />
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

      {/* 페이지네이션 */}
      {totalPages >= 1 && (
        <div className="mt-8 flex items-center justify-center gap-1">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => handlePageChange(idx)}
              disabled={isPending}
              className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors ${
                currentPage === idx
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100 disabled:opacity-50'
              }`}
              aria-label={`${idx + 1}번째 페이지`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
