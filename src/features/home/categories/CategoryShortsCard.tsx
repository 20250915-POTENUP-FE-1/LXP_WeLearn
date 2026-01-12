import React from 'react'
import { shorts } from '@/features/home/types/categoryShortsList'
import { Eye, Heart } from 'lucide-react'

export default function CategoryShortsCard({ shorts }: { shorts: shorts }) {
  return (
    <div className="group block cursor-pointer">
      <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white/90 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-100 hover:shadow-lg">
        <div className="relative aspect-9/16 w-full overflow-hidden rounded-2xl bg-linear-to-br from-gray-200 to-gray-300">
          <img
            src={shorts.thumbnail}
            alt={`${shorts.title} 썸네일`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* 상단 배지 */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 pt-1.5 pl-4">
            <span className="rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">
              {shorts.category}
            </span>
          </div>

          {/* 하단 그라데이션 + 텍스트 */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex h-[60%] flex-col justify-end bg-linear-to-t from-black/95 via-black/70 to-transparent p-4">
            <p className="mb-1 line-clamp-1 text-xs font-semibold text-white">{shorts.title}</p>
            <p className="my-1 line-clamp-2 text-[11px] leading-relaxed text-gray-300">
              {shorts.description}
            </p>
            <div className="flex items-center justify-between pt-2 text-[11px] text-gray-300">
              <span className="font-medium">{shorts.nickname}</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  <span>{shorts.likeCount}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{shorts.viewCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
