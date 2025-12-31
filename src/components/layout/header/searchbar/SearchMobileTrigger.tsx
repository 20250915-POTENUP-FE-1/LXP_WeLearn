'use client'

import { Search } from 'lucide-react'

interface SearchMobileTriggerProps {
  onOpen: () => void
}

export default function SearchMobileTrigger({ onOpen }: SearchMobileTriggerProps) {
  return (
    <button
      onClick={onOpen}
      className="pt-1.5 text-left text-gray-600 hover:text-gray-900 md:hidden"
      aria-label="검색 열기"
    >
      <Search className="h-5 w-5" />
    </button>
  )
}
