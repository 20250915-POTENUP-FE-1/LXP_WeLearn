'use client'

import { ChevronDown } from 'lucide-react'
import { toast } from 'react-toastify'

export default function SortSection() {
  const handleSortClick = () => {
    toast.info('현재 서비스 준비중입니다')
  }

  return (
    <button
      onClick={handleSortClick}
      className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors hover:bg-gray-50"
    >
      최신순
      <ChevronDown strokeWidth={1.5} size={14} />
    </button>
  )
}
