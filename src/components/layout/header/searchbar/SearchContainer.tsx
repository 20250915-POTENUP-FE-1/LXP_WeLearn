'use client'

import { useState } from 'react'
import SearchDesktop from './SearchDesktop'
import SearchMobileTrigger from './SearchMobileTrigger'
import SearchMobileMotion from './SearchMobileMotion'

export default function HeaderSearchContainer() {
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
