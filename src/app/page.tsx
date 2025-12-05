'use client'

import { Header } from '@/components/layout/Header'
// ============================================
// Page: WeLearn 메인 페이지
// Route: /
// Access: 공개 (Public)
// Description: 인기 숏폼 캐러셀, 숏폼 플레이리스트, 카테고리별 강의 목록
// ============================================

import React, { useState } from 'react'

// ============================================
// Type Definitions
// ============================================

interface ShortFormItem {
  id: string
  thumbnail: string
  title: string
  viewCount: string
  duration: string
}

interface PlaylistItem {
  id: string
  thumbnail: string
  title: string
  videoCount: number
}

interface Lecture {
  id: string
  thumbnail: string
  category: string
  categoryColor: string
  title: string
  price: string
  rating: number
  studentCount: string
}

type Category = '전체' | '개발' | '디자인' | '비즈니스'

// ============================================
// Sample Data
// ============================================

const shortFormItems: ShortFormItem[] = [
  {
    id: '1',
    thumbnail: '',
    title: '9:16 :: 10이라는 계산법하는 열리',
    viewCount: '250k',
    duration: '1분',
  },
  {
    id: '2',
    thumbnail: '',
    title: '9:16 :: 펜타르는 줄인이오 소입',
    viewCount: '250k',
    duration: '1분',
  },
  {
    id: '3',
    thumbnail: '',
    title: '그인의 알벡트 모다딘 알하는 갈의',
    viewCount: '250k',
    duration: '1분',
  },
  {
    id: '4',
    thumbnail: '',
    title: '9:16 ≒ 리고 밀켜드 적으로 쁘로 위가 하...',
    viewCount: '250k',
    duration: '1분',
  },
  {
    id: '5',
    thumbnail: '',
    title: '9:16 :: 킬니다·웅얄 앨처트 서굿앤 갈의',
    viewCount: '250k',
    duration: '1분',
  },
]

const playlists: PlaylistItem[] = [
  { id: '1', thumbnail: '', title: '어자의 플레이리스트', videoCount: 5 },
  { id: '2', thumbnail: '', title: '개발 가발 플레이리스트', videoCount: 5 },
  { id: '3', thumbnail: '', title: '디자인 플레이리스트', videoCount: 5 },
  { id: '4', thumbnail: '', title: '디자인 플레이리스트', videoCount: 5 },
]

const lectures: Lecture[] = [
  {
    id: '1',
    thumbnail: '',
    category: '개발',
    categoryColor: 'bg-blue-500',
    title: '고억 그양은 개와 다이고 갈의 모되한 갈의',
    price: '#6B7280',
    rating: 4.5,
    studentCount: '10억 개인',
  },
  {
    id: '2',
    thumbnail: '',
    category: '개O',
    categoryColor: 'bg-blue-500',
    title: '고억 그양은 개와 다이고 갈의 보되런 갈의',
    price: '#8B7280',
    rating: 4.5,
    studentCount: '10억 73인',
  },
  {
    id: '3',
    thumbnail: '',
    category: '디자인',
    categoryColor: 'bg-purple-500',
    title: '고억 그양은 개와 다이고 갈의 보되한 갈의',
    price: '#6B7280',
    rating: 4.5,
    studentCount: '10억 73인',
  },
  {
    id: '4',
    thumbnail: '',
    category: '비즈니스',
    categoryColor: 'bg-yellow-500',
    title: '고억 그양은 개와 다이고 갈의 보되힌 갈의',
    price: '#6B7280',
    rating: 4.5,
    studentCount: '10억 개인',
  },
  {
    id: '5',
    thumbnail: '',
    category: '비즈니스',
    categoryColor: 'bg-yellow-500',
    title: '고억 그양은 개와 다이고 갈의 보좌앤 딩의',
    price: '#6B7280',
    rating: 4.5,
    studentCount: '10억 75인',
  },
  {
    id: '6',
    thumbnail: '',
    category: '개발',
    categoryColor: 'bg-blue-500',
    title: '고억 그양은 개와 다이고 갈의 보되한 갈의',
    price: '#6B7280',
    rating: 4.5,
    studentCount: '20억 개인',
  },
  {
    id: '7',
    thumbnail: '',
    category: '디자인',
    categoryColor: 'bg-purple-500',
    title: '고억 그양은 개와 다이고 갈의 보되런 갈의',
    price: '#6B7280',
    rating: 4.5,
    studentCount: '20억 /3인',
  },
  {
    id: '8',
    thumbnail: '',
    category: '디자인',
    categoryColor: 'bg-purple-500',
    title: '고억 그양은 개와 다이고 갈의 보되한 갈의',
    price: '#6B7280',
    rating: 4.5,
    studentCount: '20억 /25',
  },
  {
    id: '9',
    thumbnail: '',
    category: '비즈니스',
    categoryColor: 'bg-yellow-500',
    title: '고의 그양은 개와 다이고 갈의 보되한 갈의',
    price: '#6B7280',
    rating: 4.0,
    studentCount: '30억 개인',
  },
  {
    id: '10',
    thumbnail: '',
    category: '개발',
    categoryColor: 'bg-blue-500',
    title: '고억 그양은 개와 다이고 갈의 보되한 갈의',
    price: '#6B7280',
    rating: 4.5,
    studentCount: '20억 개인',
  },
]

const categories: Category[] = ['전체', '개발', '디자인', '비즈니스']

// ============================================
// Header Component
// ============================================

// ============================================
// ShortFormCarousel Component (인기 숏폼)
// ============================================
const ShortFormCarousel: React.FC<{ items: ShortFormItem[] }> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(items.length - 1, prev + 1))
  }

  return (
    <section className="mb-12">
      {/* Section Title */}
      <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-900">
        인기 숏폼 <span className="text-2xl">🔥</span>
      </h2>

      {/* Carousel Container */}
      <div className="relative">
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 -left-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-600 shadow-lg transition-colors hover:text-gray-900"
          aria-label="이전"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Cards */}
        <div className="flex gap-4 overflow-hidden">
          {items.map((item) => (
            <div key={item.id} className="group w-36 flex-shrink-0 cursor-pointer">
              {/* Thumbnail (9:16) */}
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
                {/* Info Overlay */}
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

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute top-1/2 -right-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-600 shadow-lg transition-colors hover:text-gray-900"
          aria-label="다음"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="mt-6 flex justify-center gap-2">
        {[0, 1, 2, 3, 4].map((idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 w-2 rounded-full transition-colors ${
              currentIndex === idx ? 'bg-gray-900' : 'bg-gray-300'
            }`}
            aria-label={`${idx + 1}번째 페이지`}
          />
        ))}
      </div>
    </section>
  )
}

// ============================================
// PlaylistSection Component (숏폼 플레이리스트)
// ============================================
const PlaylistSection: React.FC<{ items: PlaylistItem[] }> = ({ items }) => {
  return (
    <section className="mb-12">
      {/* Section Title */}
      <h2 className="mb-6 text-2xl font-bold text-gray-900">숏폼 플레이리스트</h2>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            {/* Thumbnail */}
            <div className="relative mb-3 aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 transition-all group-hover:ring-2 group-hover:ring-gray-900">
              {item.thumbnail ? (
                <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full" />
              )}
              {/* Video Count Badge */}
              <div className="absolute right-3 bottom-3 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1">
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm5 2l6 4-6 4V8z" />
                </svg>
                <span className="text-xs font-medium text-white">{item.videoCount}개</span>
              </div>
            </div>
            {/* Title */}
            <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}

// ============================================
// LectureCard Component
// ============================================
const LectureCard: React.FC<{ lecture: Lecture }> = ({ lecture }) => {
  return (
    <div className="group cursor-pointer">
      {/* Thumbnail */}
      <div className="relative mb-3 aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 transition-all group-hover:ring-2 group-hover:ring-gray-900">
        {lecture.thumbnail ? (
          <img src={lecture.thumbnail} alt={lecture.title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full" />
        )}
        {/* Category Badge */}
        <span
          className={`absolute top-2 left-2 px-2 py-1 text-xs font-medium text-white ${lecture.categoryColor} rounded`}
        >
          {lecture.category}
        </span>
      </div>

      {/* Content */}
      <div>
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-gray-700">
          {lecture.title}
        </h3>
        <p className="mb-2 text-xs text-gray-500">{lecture.price}</p>
        <div className="flex items-center gap-2">
          {/* Rating */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`h-3.5 w-3.5 ${star <= Math.floor(lecture.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500">{lecture.studentCount}</span>
        </div>
      </div>
    </div>
  )
}

// ============================================
// CategoryLectureSection Component (카테고리별 강의)
// ============================================
const CategoryLectureSection: React.FC<{ lectures: Lecture[] }> = ({ lectures }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체')

  const filteredLectures =
    selectedCategory === '전체' ? lectures : lectures.filter((l) => l.category === selectedCategory)

  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">카테고리별 강의</h2>
        <a
          href="/lectures"
          className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          전체보기
        </a>
      </div>

      {/* Category Tabs */}
      <div className="mb-6 flex items-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Lecture Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {filteredLectures.slice(0, 10).map((lecture) => (
          <LectureCard key={lecture.id} lecture={lecture} />
        ))}
      </div>
    </section>
  )
}

// ============================================
// MainPage Component
// ============================================
const MainPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 인기 숏폼 */}
      <ShortFormCarousel items={shortFormItems} />

      {/* 숏폼 플레이리스트 */}
      <PlaylistSection items={playlists} />

      {/* 카테고리별 강의 */}
      <CategoryLectureSection lectures={lectures} />
    </div>
  )
}

export default MainPage
