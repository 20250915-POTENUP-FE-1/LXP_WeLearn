'use client'

import { getCategoriesAction } from '@/features/category.action'
import type { Category } from '@/services/category/category.service'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState, type ChangeEvent } from 'react'

interface ShortsFormCategoryProps {
  value: number | null
  onChange: (value: number | null) => void
}

export default function ShortsFormCategory({ value, onChange }: ShortsFormCategoryProps) {
  const [categories, setCategories] = useState<CategoryResponse[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategoriesAction()
      console.log(data)
      setCategories(data)
    }

    fetchCategories()
  }, [])

  // select value는 string이어야 함
  const selectValue = value?.toString() ?? ''

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    onChange(selectedValue ? Number(selectedValue) : null)
  }

  return (
    <div>
      <label htmlFor="category" className="mb-2 block text-sm font-medium text-gray-700">
        카테고리 <span className="text-red-600">*</span>
      </label>

      <div className="relative">
        <select
          id="category"
          value={selectValue}
          onChange={handleChange}
          className={`w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm transition-all focus:ring-2 focus:ring-black focus:outline-none ${
            selectValue ? 'text-black' : 'text-gray-400'
          }`}
        >
          <option value="">카테고리를 선택하세요.</option>

          {categories?.map((category) => (
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
