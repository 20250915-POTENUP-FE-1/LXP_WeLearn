import HeaderLayout from './HeaderLayout'

export const Header = async () => {
  return (
    <header className="fixed top-0 z-50 w-screen border-b border-gray-100 bg-white md:sticky md:w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeaderLayout />
      </div>
    </header>
  )
}
