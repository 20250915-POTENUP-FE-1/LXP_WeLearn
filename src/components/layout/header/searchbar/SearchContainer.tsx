'use client'

import { useState } from 'react'
import {
  SearchDesktop,
  SearchMobileTrigger,
  SearchMobileMotion,
} from '@/components/layout/header/searchbar'

export default function HeaderSearchBar() {
  // 모바일용 검색 아이콘 동적 상태 관리
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

  return (
    <>
      {/* PC 버전 검색바 */}
      <SearchDesktop />

      {/* 모바일 버전 - 아이콘만 표시 */}
      <SearchMobileTrigger onOpen={() => setIsMobileSearchOpen(true)} />

      {/* 모바일 검색바 오버레이 */}
      <SearchMobileMotion
        isOpen={isMobileSearchOpen}
        onClose={() => setIsMobileSearchOpen(false)}
      />
    </>
  )
}
