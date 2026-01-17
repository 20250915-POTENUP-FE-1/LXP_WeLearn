'use client'

import React, { useState, useTransition } from 'react'
import { PageShortsResponse } from '@/types/mypage-shorts'
import CategoryShortsCard from '@/features/home/categories/CategoryShortsCard'
import SortSection from './sort/Sort'
import { getShortsAction, getShortsByCategoryAction } from '@/features/category.action'

const ITEMS_PER_PAGE = 8

interface CategoryShortsSectionProps {
  initialShorts: PageShortsResponse
  categories: { id: number; name: string }[]
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
  const [shortsData, setShortsData] = useState<PageShortsResponse>(initialShorts)
  // 로딩 상태
  const [isPending, startTransition] = useTransition()

  const displayedShorts = shortsData.content ?? []
  const totalPages = shortsData.totalPages ?? 0

  // 데이터 fetch 함수 (Server Action 사용)
  const fetchShorts = (categoryId: number | null, page: number) => {
    startTransition(async () => {
      try {
        let response: PageShortsResponse | null

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
        <SortSection />
      </div>

      {/* 카테고리별 필터 */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button
          onClick={() => handleCategoryChange(null)}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
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
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
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
      <div className="relative">
        {isPending && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {displayedShorts.map((shorts) => (
            <CategoryShortsCard key={shorts.shortsId} shorts={shorts} />
          ))}
        </div>
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
