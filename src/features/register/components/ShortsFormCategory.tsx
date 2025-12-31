'use client'

import { ChevronDown } from 'lucide-react'

interface ShortsFormCategoryProps {
  value: string
  onChange: (value: string) => void
}

export default function ShortsFormCategory({ value, onChange }: ShortsFormCategoryProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">카테고리</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm transition-all focus:ring-2 focus:ring-black focus:outline-none"
        >
          <option value="">카테고리를 선택하세요.</option>
          <option value="frontend">프론트엔드</option>
          <option value="backend">백엔드</option>
          <option value="design">디자인</option>
          <option value="data">데이터</option>
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  )
}
