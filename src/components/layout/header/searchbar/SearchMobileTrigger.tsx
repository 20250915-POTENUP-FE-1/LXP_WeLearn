'use client'

import { Search } from 'lucide-react'

interface SearchMobileTriggerProps {
  onOpen: () => void
}

export default function SearchMobileTrigger({ onOpen }: SearchMobileTriggerProps) {
  return (
    <button
      onClick={onOpen}
      className="flex h-10 w-10 items-center justify-center text-gray-600 hover:text-gray-900 md:hidden"
      aria-label="검색 열기"
    >
      <Search className="h-6 w-6" />
    </button>
  )
}
