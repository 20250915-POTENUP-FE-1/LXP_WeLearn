import React from 'react'
import { Header } from '@/components/layout/header/Header'
import Footer from '@/components/layout/Footer'

export default function GeneralLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="mx-auto box-border flex w-full max-w-7xl flex-1 px-4 py-8 lg:px-8">
        {children}
      </main>
      <Footer />
    </>
  )
}
