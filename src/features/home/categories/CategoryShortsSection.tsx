'use client'

import React, { useState } from 'react'
import { Category } from '@/features/home/types/Category'
import { categories } from '@/dummy/data'
import { shorts } from '@/features/home/types/categoryShortsList'
import { ChevronDown } from 'lucide-react'
import CategoryShortsCard from '@/features/home/categories/CategoryShortsCard'

const ITEMS_PER_PAGE = 8

export default function CategoryShortsSection({ shorts }: { shorts: shorts[] }) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체')
  const [currentPage, setCurrentPage] = useState(0)

  const filteredLectures =
    selectedCategory === '전체' ? shorts : shorts.filter((l) => l.category === selectedCategory)

  const totalPages = Math.ceil(filteredLectures.length / ITEMS_PER_PAGE)
  const displayedShorts = filteredLectures.slice(0, ITEMS_PER_PAGE)

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category)
    setCurrentPage(0)
  }

  return (
    <section className="my-12 pt-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-gray-900 uppercase">Categories</h2>
        <button className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors hover:bg-gray-50">
          최신순
          <ChevronDown strokeWidth={1.5} size={14} />
        </button>
      </div>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-300 text-gray-600 hover:border-gray-400'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {displayedShorts.map((shorts) => (
          <CategoryShortsCard key={shorts.id} shorts={shorts} />
        ))}
      </div>

      {/* 페이지네이션 (기능은 추후 구현) */}
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
