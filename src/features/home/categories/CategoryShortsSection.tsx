'use client'

import React, { useState } from 'react'
import { ShortsResponse } from '@/types/mypage-shorts'
import CategoryShortsCard from '@/features/home/categories/CategoryShortsCard'
import SortSection from './sort/Sort'

const ITEMS_PER_PAGE = 8

interface CategoryShortsSectionProps {
  shorts: ShortsResponse[]
  categories: { id: number; name: string }[]
}

export default function CategoryShortsSection({ shorts, categories }: CategoryShortsSectionProps) {
  // 선택된 카테고리 ID (null = 전체)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  // 현재 페이지 번호
  const [currentPage, setCurrentPage] = useState(0)

  // 카테고리 필터링
  const filteredShorts =
    selectedCategoryId === null ? shorts : shorts.filter((s) => s.categoryId === selectedCategoryId)

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredShorts.length / ITEMS_PER_PAGE)
  const startIndex = currentPage * ITEMS_PER_PAGE
  const displayedShorts = filteredShorts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // 카테고리 변경 시 페이지 초기화
  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategoryId(categoryId)
    setCurrentPage(0)
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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {displayedShorts.map((shorts) => (
          <CategoryShortsCard key={shorts.shortsId} shorts={shorts} />
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-1">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors ${
                currentPage === idx ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
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
