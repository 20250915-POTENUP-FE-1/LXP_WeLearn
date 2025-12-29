import Footer from '@/components/layout/Footer'
import { Header } from '@/components/layout/header/Header'

export default function FullscreenLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto box-border flex h-screen max-w-7xl flex-1 items-center justify-center overflow-hidden px-0 py-0 sm:px-6 lg:px-8">
        {children}
      </main>
    </>
  )
}
