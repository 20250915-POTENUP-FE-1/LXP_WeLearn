'use client'

import { Search } from 'lucide-react'
import SearchInput from './SearchInput'

export default function SearchDesktop() {
  const searchIcon = (
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
      <SearchInput name="search-desktop" rightButton={searchIcon} />
    </div>
  )
}
