'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'

export default function MyShortsCreateButton() {
  return (
    <Link href="/mypage/myshorts/new" className="group">
      <button className="flex w-full items-center justify-center gap-2 rounded-full bg-green-500 py-5 text-lg font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-100 hover:shadow-lg md:w-[360px]">
        <Plus
          strokeWidth={1.5}
          size={30}
          className="transition-transform duration-500 group-hover:rotate-180"
        />
        숏츠 만들기
      </button>
    </Link>
  )
}
