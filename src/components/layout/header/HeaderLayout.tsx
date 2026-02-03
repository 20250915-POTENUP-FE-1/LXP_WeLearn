'use client'
import Link from 'next/link'
import HeaderRightSection from './HeaderRightSection'
import HeaderSearchContainer from './searchbar/SearchContainer'

export default function HeaderLayout() {
  return (
    <div className="flex h-16 items-center gap-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 border-none" aria-label="홈으로 이동">
        <img src="/shortudy.svg" alt="Shortudy_Logo" className="h-10 w-auto" />
      </Link>

      <div className="ml-auto md:mx-auto md:max-w-xl md:flex-1">
        <HeaderSearchContainer />
      </div>
      <HeaderRightSection />
    </div>
  )
}
