import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'III',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="">
        <div className="flex min-h-screen w-full flex-col items-center justify-between bg-gray-100/70">
          <Header />
          <main className="flex size-full shrink grow flex-col items-center justify-center">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
