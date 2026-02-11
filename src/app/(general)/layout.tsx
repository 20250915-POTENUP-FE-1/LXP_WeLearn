import React from 'react'
import Footer from '@/components/layout/Footer'
import { HeaderContainer } from '@/components/layout/header/HeaderContainer'

export default async function GeneralLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <HeaderContainer />
      <main className="mx-auto box-border flex w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </>
  )
}
