import { cookies } from 'next/headers'
import Link from 'next/link'
import HeaderRightSection from './HeaderRightSection'
import { Search } from 'lucide-react'
import { HeaderSearchBar } from './HeaderSearchBar'

export const Header = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  const isLogined = !!token

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="홈으로 이동">
            <img src="/shortudy.svg" alt="Shortudy_Logo" className="h-8 w-auto" />
          </Link>

          <div className="ml-auto md:mx-auto md:max-w-xl md:flex-1">
            <HeaderSearchBar />
          </div>
          <HeaderRightSection isLogined={isLogined} />
        </div>
      </div>
    </header>
  )
}
