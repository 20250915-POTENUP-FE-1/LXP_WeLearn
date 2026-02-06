import React from 'react'
import Link from 'next/link'

export default function PlaylistButton({ children }: { children: React.ReactNode }) {
  return (
    <Link href="/playlists" className="group cursor-pointer">
      {children}
    </Link>
  )
}
