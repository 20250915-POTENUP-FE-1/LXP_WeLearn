'use client'

import { PlaylistModalExample } from '@/app/(fullscreen)/shorts/[id]/PlaylistModal'

// alias 안 쓰면: import { PlaylistModalExample } from '../../modals/PlaylistModal';

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <PlaylistModalExample />
    </div>
  )
}
