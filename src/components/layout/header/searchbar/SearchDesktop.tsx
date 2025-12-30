'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { toast } from 'react-toastify'

export default function SearchDesktop() {
  const handleComingSoon = () => {
    toast.info('검색 기능은 준비 중입니다.', {
      toastId: 'header-search-toast',
    })
  }

  const searchButton = (
    <button
      type="button"
      className="flex text-gray-400 transition-colors hover:text-gray-600"
      aria-label="검색"
    >
      <Search className="h-5 w-5" />
    </button>
  )

  return (
    <div className="hidden max-w-xl justify-between md:block md:flex-1">
      <Input
        type="text"
        name="search-desktop"
        placeholder="검색어를 입력하세요"
        variant="search"
        rightButton={searchButton}
        aria-label="검색"
        onClick={handleComingSoon}
      />
    </div>
  )
}
