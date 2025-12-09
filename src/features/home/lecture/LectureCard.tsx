import React from 'react'
import { Lecture } from '@/features/home/types/Lecture'

export default function LectureCard({ lecture }: { lecture: Lecture }) {
  return (
    <div className="lecture-card group cursor-pointer overflow-hidden rounded-lg bg-white">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-200">
        <img
          src={lecture.thumbnail}
          alt={`${lecture.title} 강의 썸네일`}
          className="h-full w-full object-cover opacity-100 transition-transform duration-300 group-hover:opacity-80"
        />
        <span
          className={`absolute top-3 left-3 rounded bg-black px-2 py-1 text-xs font-medium text-white`}
        >
          {lecture.category}
        </span>
      </div>

      <div className="flex min-h-[120px] flex-col justify-between pt-4">
        <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900 transition-colors group-hover:text-gray-700">
          {lecture.title}
        </h3>
        <p className="mb-2 text-sm text-gray-500">{lecture.instructor}</p>

        <div className="flex items-center space-x-1">
          <svg className="h-4 w-4 fill-current text-yellow-400" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <span className="text-sm font-medium text-gray-900">{lecture.rating}</span>
          <span className="text-sm text-gray-400">({lecture.reviewCount})</span>
        </div>
      </div>
    </div>
  )
}
