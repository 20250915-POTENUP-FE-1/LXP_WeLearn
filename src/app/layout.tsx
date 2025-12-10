import type { Metadata } from 'next'
import './globals.css'
import React from 'react'
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

        <ToastProvider />
      </body>
    </html>
  )
}
