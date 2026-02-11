import type { Metadata } from 'next'
import './globals.css'
import React from 'react'
import ToastProvider from '@/lib/toast/ToastProvider'
import { suit } from '@/app/font/suit/font'
import { cookies } from 'next/headers'
import AuthProvider from '@/lib/providers/AuthProviders'

export const metadata: Metadata = {
  title: 'shorTudy',
  description: '',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('refreshToken')
  const accessToken = cookieStore.get('accessToken')
  const initialLoggedIn = !!refreshToken

  return (
    <html lang="ko" className={suit.className}>
      <body className="flex min-h-screen flex-col">
        <AuthProvider initialLoggedIn={initialLoggedIn}>{children}</AuthProvider>
        <ToastProvider />
      </body>
    </html>
  )
}
