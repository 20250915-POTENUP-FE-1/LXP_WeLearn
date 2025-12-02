'use client'

// ============================================
// Page: 강의 목록 페이지
// Route: /lectures
// Access: 공개 (Public)
// Description: 모든 강의를 카드 형태로 표시하며 카테고리 필터링과 정렬 기능 제공
// Tailwind: grid로 반응형 레이아웃, gap으로 간격 조절
// ============================================

import React, { useState } from 'react'

// 카테고리 타입 정의
type Category =
  | '전체'
  | '프론트엔드'
  | '백엔드'
  | '모바일'
  | '생성형 AI'
  | '데브옵스'
  | '데이터'
  | '머신러닝'

// 강의 데이터 타입 정의
interface Lecture {
  id: string
  title: string
  instructor: string
  category: Category
  categoryColor: string
  thumbnail: string
  rating: number
  reviewCount: number
}

// 카테고리별 배지 색상 매핑
const categoryColors: Record<string, string> = {
  프론트엔드: 'bg-blue-600',
  백엔드: 'bg-green-600',
  모바일: 'bg-orange-500',
  '생성형 AI': 'bg-indigo-600',
  데브옵스: 'bg-teal-600',
  데이터: 'bg-green-600',
  머신러닝: 'bg-purple-600',
}

// 샘플 강의 데이터
const sampleLectures: Lecture[] = [
  {
    id: '1',
    title: '프론트엔드 빌드 과정 완전 분석',
    instructor: '오노석',
    category: '머신러닝',
    categoryColor: 'bg-purple-600',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
    rating: 4.8,
    reviewCount: 120,
  },
  {
    id: '2',
    title: 'Next.js와 Firebase로 실시간 채팅 구현',
    instructor: '전남',
    category: '프론트엔드',
    categoryColor: 'bg-blue-600',
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=225&fit=crop',
    rating: 4.8,
    reviewCount: 120,
  },
  {
    id: '3',
    title: 'REST API와 GraphQL 완전 비교',
    instructor: '황민지',
    category: '데이터',
    categoryColor: 'bg-green-600',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop',
    rating: 4.8,
    reviewCount: 120,
  },
  {
    id: '4',
    title: 'REST API와 GraphQL 완전 비교',
    instructor: '김요재',
    category: '모바일',
    categoryColor: 'bg-orange-500',
    thumbnail: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=400&h=225&fit=crop',
    rating: 4.8,
    reviewCount: 120,
  },
  {
    id: '5',
    title: 'JavaScript 비동기 프로그래밍 이해',
    instructor: '도도',
    category: '데브옵스',
    categoryColor: 'bg-teal-600',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop',
    rating: 4.8,
    reviewCount: 120,
  },
  {
    id: '6',
    title: 'Supabase Functions로 데이터 백업 자동화',
    instructor: '노용',
    category: '머신러닝',
    categoryColor: 'bg-pink-500',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=225&fit=crop',
    rating: 4.8,
    reviewCount: 120,
  },
  {
    id: '7',
    title: '웹소켓으로 실시간 채팅 구현',
    instructor: '전남',
    category: '데브옵스',
    categoryColor: 'bg-teal-600',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop',
    rating: 4.8,
    reviewCount: 120,
  },
  {
    id: '8',
    title: 'Next.js SEO 최적화와 Sitemap 생성',
    instructor: '전남',
    category: '생성형 AI',
    categoryColor: 'bg-indigo-600',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=225&fit=crop',
    rating: 4.8,
    reviewCount: 120,
  },
]

const categories: Category[] = [
  '전체',
  '프론트엔드',
  '백엔드',
  '모바일',
  '생성형 AI',
  '데브옵스',
  '데이터',
  '머신러닝',
]

// ============================================
// LectureCard Component
// Description: 개별 강의 정보를 표시하는 카드 컴포넌트
// Tailwind: rounded-lg로 모서리 둥글게, group으로 호버 효과 그룹화
// Props: lecture (Lecture 타입)
// ============================================
const LectureCard: React.FC<{ lecture: Lecture }> = ({ lecture }) => {
  return (
    <div className="lecture-card group cursor-pointer overflow-hidden rounded-lg bg-white">
      {/* Thumbnail */}
      {/* Tailwind: aspect-video로 16:9 비율, relative로 배지 위치 기준 */}
      <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-200">
        <img
          src={lecture.thumbnail}
          alt={`${lecture.title} 강의 썸네일`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Category Badge */}
        {/* Tailwind: absolute로 절대 위치, top-3 left-3으로 좌상단 배치 */}
        <span
          className={`absolute top-3 left-3 px-2 py-1 text-xs font-medium text-white ${lecture.categoryColor} rounded`}
        >
          {lecture.category}
        </span>
      </div>

      {/* Card Content */}
      {/* Tailwind: pt-4로 상단 패딩 */}
      <div className="pt-4">
        {/* Title */}
        {/* Tailwind: line-clamp-2로 2줄 제한, font-semibold로 굵기 */}
        <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900 transition-colors group-hover:text-gray-700">
          {lecture.title}
        </h3>

        {/* Instructor */}
        <p className="mb-2 text-sm text-gray-500">{lecture.instructor}</p>

        {/* Rating */}
        {/* Tailwind: flex items-center로 아이콘과 텍스트 수직 정렬 */}
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

// ============================================
// Pagination Component
// Description: 페이지 네비게이션 컴포넌트
// Tailwind: flex justify-center로 중앙 정렬
// Props: currentPage, totalPages, onPageChange
// ============================================
const Pagination: React.FC<{
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <nav className="flex items-center justify-center space-x-1" aria-label="페이지네이션">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="이전 페이지"
      >
        이전
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`h-8 w-8 rounded text-sm font-medium transition-colors ${
            currentPage === page ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label={`${page} 페이지${currentPage === page ? ', 현재 페이지' : ''}`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="다음 페이지"
      >
        다음
      </button>
    </nav>
  )
}

// ============================================
// LectureListPage Component
// Description: 강의 목록 페이지 메인 컴포넌트
// ============================================
export default function LectureListPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체')
  const [sortOption, setSortOption] = useState<string>('latest')
  const [currentPage, setCurrentPage] = useState<number>(2)

  // 필터링된 강의 목록 (실제 구현 시 API 호출로 대체)
  const filteredLectures =
    selectedCategory === '전체'
      ? sampleLectures
      : sampleLectures.filter((lecture) => lecture.category === selectedCategory)

  return (
    <>
      {/* ============================================ */}
      {/* Main Content */}
      {/* Description: 강의 목록 메인 컨텐츠 영역 */}
      {/* ============================================ */}
      {/* Page Title Section */}
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">전체 강의</h1>
        <p className="text-sm text-gray-500">원하는 강의를 찾아보세요</p>
      </div>

      {/* ============================================ */}
      {/* Category Filter Section */}
      {/* Description: 카테고리 필터 버튼 그룹과 정렬 드롭다운 */}
      {/* Tailwind: flex로 가로 배치, gap-2로 버튼 간격 */}
      {/* ============================================ */}
      <section className="mb-6" aria-label="카테고리 필터">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Category Buttons */}
          {/* Tailwind: flex flex-wrap으로 버튼들 가로 배치, 줄바꿈 허용 */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-pressed={selectedCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          {/* Tailwind: relative로 드롭다운 위치 기준, border로 테두리 */}
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:border-transparent focus:ring-2 focus:ring-gray-500 focus:outline-none"
              aria-label="정렬 방식 선택"
            >
              <option value="latest">최신순</option>
              <option value="popular">인기순</option>
              <option value="rating">평점순</option>
            </select>
            {/* Dropdown Arrow Icon */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg
                className="h-4 w-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* Lecture Count */}
      {/* Description: 총 강의 수 표시 */}
      {/* ============================================ */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          총 <span className="font-semibold text-gray-900">{filteredLectures.length}</span>개의 강의
        </p>
      </div>

      {/* ============================================ */}
      {/* Lecture List Section */}
      {/* Description: 강의 카드 그리드 레이아웃 */}
      {/* Tailwind: grid로 반응형 그리드, gap-6으로 카드 간격 */}
      {/* ============================================ */}
      <section aria-label="강의 목록">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredLectures.map((lecture) => (
            <LectureCard key={lecture.id} lecture={lecture} />
          ))}
        </div>
      </section>

      {/* ============================================ */}
      {/* Pagination Section */}
      {/* Description: 페이지 네비게이션 */}
      {/* ============================================ */}
      <section className="mt-12 mb-8" aria-label="페이지 네비게이션">
        <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />
      </section>
    </>
  )
}
