'use client'

import React, { useState } from 'react'
import { Category } from '@/features/home/types/Category'
import { categories } from '@/dummy/data'
import LectureCard from '@/features/home/lecture/LectureCard'
import Link from 'next/link'
import { Lecture } from '@/features/home/types/Lecture'
import { toast } from 'react-toastify'

export default function CategoryLectureSection({ lectures }: { lectures: Lecture[] }) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체')

  const filteredLectures =
    selectedCategory === '전체' ? lectures : lectures.filter((l) => l.category === selectedCategory)

  const handleComingSoon = () => {
    toast.info('전체보기는 준비 중입니다.', {
      toastId: 'coming-soon-info',
    })
  }

  return (
    <section className="mb-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-gray-900 uppercase">Categories</h2>
        <Link
          href="/"
          className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
          onClick={handleComingSoon}
        >
          All Shorts &rarr;
        </Link>
      </div>
      <div className="mb-6 flex items-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-300 text-gray-600 hover:border-gray-400'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {filteredLectures.slice(0, 10).map((lecture) => (
          <LectureCard key={lecture.id} lecture={lecture} />
        ))}
      </div>
    </section>
  )
}
