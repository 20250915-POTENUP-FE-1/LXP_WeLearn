import React from 'react'
import { Lecture } from '@/features/home/types/Lecture'
import { Heart } from 'lucide-react'

export default function LectureCard({ lecture }: { lecture: Lecture }) {
  return (
    <div className="lecture-card group mb-6 cursor-pointer rounded-lg">
      <div className="relative aspect-video h-40 w-full overflow-hidden rounded-lg bg-gray-200 sm:h-52 lg:h-80">
        <img
          src={lecture.thumbnail}
          alt={`${lecture.title} 썸네일`}
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
          <Heart className="h-4 w-4 text-gray-400" />
          {/* <span className="text-sm font-medium text-gray-900">{lecture.rating}</span> */}
          <span className="text-sm text-gray-400">{lecture.reviewCount}</span>
        </div>
      </div>
    </div>
  )
}
