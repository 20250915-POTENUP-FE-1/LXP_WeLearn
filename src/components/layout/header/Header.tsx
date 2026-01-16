import { cookies } from 'next/headers'
import HeaderLayout from './HeaderLayout'

export const Header = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  const isLogined = !!token

  return (
    <header className="fixed top-0 z-50 w-screen border-b border-gray-100 bg-white md:sticky md:w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeaderLayout isLogined={isLogined} />
      </div>
    </header>
  )
}
