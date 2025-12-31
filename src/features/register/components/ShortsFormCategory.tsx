'use client'

import { DUMMY_CATEGORIES } from '@/dummy/categories'
import { ChevronDown } from 'lucide-react'

interface ShortsFormCategoryProps {
  value: number | null
  onChange: (value: number | null) => void
}

export default function ShortsFormCategory({ value, onChange }: ShortsFormCategoryProps) {
  // TODO: API 연동 시 useEffect로 카테고리 목록 fetch
  const categories = DUMMY_CATEGORIES

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">카테고리</label>
      <div className="relative">
        <select
          value={value ?? ''}
          onChange={(e) => {
            const selectedValue = e.target.value
            onChange(selectedValue ? Number(selectedValue) : null)
          }}
          className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm transition-all focus:ring-2 focus:ring-black focus:outline-none"
        >
          <option value="">카테고리를 선택하세요.</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  )
}
