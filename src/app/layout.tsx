import type { Metadata } from 'next'
import './globals.css'
import React from 'react'
import Footer from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import ToastProvider from '@/lib/toast/ToastProvider'
import { suit } from '@/app/font/suit/font'

export const metadata: Metadata = {
  title: '35FUND',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={suit.className}>
      <body className="flex min-h-screen flex-col bg-white">
        {children}
        {/* <Header />
        <main className="mx-auto box-border flex max-w-7xl flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer /> */}
        <ToastProvider />
      </body>
    </html>
  )
}
