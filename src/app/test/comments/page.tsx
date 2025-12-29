'use client'

import CommentsModal from '@/app/(fullscreen)/shorts/[id]/CommentsModal'
import { useState } from 'react'

export default function TestCommentsPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-10">
      <button onClick={() => setOpen(true)} className="rounded-lg bg-black px-4 py-2 text-white">
        댓글 모달 열기
      </button>

      <CommentsModal isOpen={open} onClose={() => setOpen(false)} commentCount={57} />
    </div>
  )
}
