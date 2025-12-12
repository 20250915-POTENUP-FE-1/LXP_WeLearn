import React from 'react'
import type { components } from '@/types/api-schema'
import PageNation from '@/features/home/ShortFormCarousel/PageNation'

type ShortsItem = components['schemas']['ShortsResponse']

export default function ShortFormCarousel({ data }: { data?: ShortsItem[] }) {
  const items = data ?? []

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          인기 숏폼 <span className="text-2xl">🔥</span>
        </h2>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
          오늘의 추천 {items.length ? items.length : 0}개
        </span>
      </div>

      {!items.length ? <p>오늘의 인기 숏폼 없습니다.</p> : <PageNation items={items} />}
    </section>
  )
}
