import Link from 'next/link'
import { HeaderSearchContainer } from './searchbar'
import HeaderRightSection from './HeaderRightSection'

export const HeaderContainer = () => {
  return (
    <header className="fixed top-0 z-50 w-screen border-b border-gray-100 bg-white md:sticky md:w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
      </div>
    </header>
  )
}
