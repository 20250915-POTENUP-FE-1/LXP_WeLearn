'use client'

import { toast } from 'react-toastify'

export default function SavedShortsTitleEditBtn() {
  const handleClick = () => {
    toast.info('서비스 준비중입니다.')
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center gap-2 rounded bg-black px-3 py-1.5 text-sm text-white transition-colors hover:bg-black/80"
    >
      수정
    </button>
  )
}
