import React from 'react'
import Link from 'next/link'

interface PlaylistButtonProps {
  children: React.ReactNode
  itemId: number
}
export default function PlaylistButton({ children, itemId }: PlaylistButtonProps) {
  return (
    <Link href={`/playlists/${itemId}`} className="group cursor-pointer">
      {children}
    </Link>
  )
}
