import React from 'react'
import { ShortFormItem } from '@/features/home/types/ShortFormItem'
import PageNation from '@/features/home/ShortFormCarousel/PageNation'

export default function ShortFormCarousel({ items }: { items: ShortFormItem[] }) {
  return (
    <section className="mb-12">
      <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-900">
        인기 숏폼 <span className="text-2xl">🔥</span>
      </h2>

      <PageNation items={items}>
        <div className="flex gap-4 overflow-hidden">
          {items.map((item) => (
            <div key={item.id} className="group w-36 flex-shrink-0 cursor-pointer">
              <div className="relative mb-3 aspect-[9/16] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-300 to-gray-400 transition-all group-hover:ring-2 group-hover:ring-gray-900">
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full" />
                )}
                <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="mb-1 line-clamp-2 text-xs font-medium text-white">{item.title}</p>
                  <p className="text-xs text-gray-300">
                    조회수 {item.viewCount} • {item.duration}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PageNation>
    </section>
  )
}
