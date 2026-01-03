'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'

export default function MyShortsCreateButton() {
  return (
    <Link href="/mypage/myshorts/new">
      <button className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 py-5 text-lg font-medium text-white transition-colors hover:bg-green-600">
        <Plus strokeWidth={1.5} size={30} />내 숏츠 만들기
      </button>
    </Link>
  )
}
