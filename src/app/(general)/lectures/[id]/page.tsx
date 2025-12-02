'use client'

// ============================================
// Page: 강의 상세 페이지
// Route: /lectures/:lectureId
// Access: 공개 (Public)
// Description: 강의의 상세 정보, 커리큘럼, 강사 정보를 표시하는 페이지
// Tailwind: grid로 2컬럼 레이아웃, 탭 UI로 콘텐츠 구분
// ============================================

import React, { useState } from 'react'

// 탭 타입 정의
type TabType = '강의 소개' | '커리큘럼'

// 레슨 타입 정의
interface Lesson {
  id: string
  title: string
  isPreview: boolean
}

// 챕터 타입 정의
interface Chapter {
  id: string
  title: string
  lessonCount: number
  lessons: Lesson[]
  isExpanded: boolean
}

// 강의 상세 정보 타입 정의
interface LectureDetail {
  id: string
  category: string
  categoryColor: string
  title: string
  description: string
  thumbnail: string
  rating: number
  reviewCount: number
  enrollmentCount: number
  lessonCount: number
  instructor: string
  difficulty: string
  duration: string
  language: string
  hasCertificate: boolean
  fullDescription: string
  chapters: Chapter[]
}

// 샘플 강의 데이터
const sampleLecture: LectureDetail = {
  id: '1',
  category: '생성형 AI',
  categoryColor: 'bg-gray-800',
  title: 'Next.js SEO 최적화와 Sitemap 생성',
  description:
    'TypeScript와 Zod를 결합해 안전한 타입 기반 유효성 검사를 설계하고, 복잡한 폼 데이터 구조를 명확하게 관리합니다.',
  thumbnail: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop',
  rating: 3.1,
  reviewCount: 10,
  enrollmentCount: 10,
  lessonCount: 5,
  instructor: '전남',
  difficulty: '초급 ~ 중급',
  duration: '무제한',
  language: '한국어',
  hasCertificate: true,
  fullDescription:
    'React Query와 TanStack Table를 결합해 대용량 데이터를 효율적으로 구현하는 강의입니다. Pagination, Infinite Scroll, Virtual Rendering을 모두 실습하며, 서버 통신간고 상태 구조를 통합합니다. 특히 10,000건 이상의 데이터를 렌더링할 때 성능 저하를 최소화하는 테이블 구조를 설계합니다. Supabase와 연동해 실제 데이터 기반의 관리자를 대시보드를 완성합니다.',
  chapters: [
    {
      id: '1',
      title: '챕터 1 - Firebase Custom Claims 활용',
      lessonCount: 2,
      isExpanded: true,
      lessons: [
        { id: '1-1', title: '레슨 1 - Day.js로 날짜 관리하기', isPreview: true },
        { id: '1-2', title: '레슨 2 - 모달 상태 관리 패턴 이해하기', isPreview: true },
      ],
    },
    {
      id: '2',
      title: '챕터 2 - Redux Toolkit Slice 구성하기',
      lessonCount: 2,
      isExpanded: true,
      lessons: [
        { id: '2-1', title: '레슨 1 - Batch Write와 Transaction 처리', isPreview: false },
        { id: '2-2', title: '레슨 2 - 다국어(i18n) 지원 구조 설계', isPreview: false },
      ],
    },
    {
      id: '3',
      title: '챕터 3 - TanStack Table 기본 구조 익히기',
      lessonCount: 1,
      isExpanded: true,
      lessons: [{ id: '3-1', title: '레슨 1 - 스켈레톤 UI 적용하기', isPreview: false }],
    },
  ],
}

// ============================================
// StarRating Component
// Description: 별점 표시 컴포넌트
// Props: rating (숫자)
// ============================================
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center space-x-1">
      <svg className="h-4 w-4 fill-current text-yellow-400" viewBox="0 0 20 20">
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
      <span className="text-sm font-medium text-gray-900">{rating}</span>
    </div>
  )
}

// ============================================
// LectureHero Component
// Description: 강의 상단 히어로 섹션 (제목, 설명, 썸네일, 메타 정보)
// Tailwind: grid로 2컬럼 레이아웃
// ============================================
const LectureHero: React.FC<{ lecture: LectureDetail }> = ({ lecture }) => {
  return (
    <section className="border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column - 강의 정보 */}
          <div className="flex flex-col">
            {/* Category Badge */}
            <span
              className={`inline-flex w-fit px-3 py-1 text-xs font-medium text-white ${lecture.categoryColor} mb-4 rounded`}
            >
              {lecture.category}
            </span>

            {/* Title */}
            <h1 className="mb-3 text-2xl font-bold text-gray-900 lg:text-3xl">{lecture.title}</h1>

            {/* Description */}
            <p className="mb-6 text-sm leading-relaxed text-gray-600">{lecture.description}</p>

            {/* Meta Info Row */}
            {/* Tailwind: flex로 가로 배치, space-x-4로 간격 */}
            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <StarRating rating={lecture.rating} />
                <span className="text-gray-400">({lecture.reviewCount})</span>
              </div>
              <span>총 {lecture.enrollmentCount}명 수강</span>
              <div className="flex items-center space-x-1">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <span>{lecture.lessonCount}개 강의</span>
              </div>
            </div>

            {/* Instructor */}
            <p className="mb-6 text-sm text-gray-600">
              <span className="text-gray-400">강사</span>{' '}
              <span className="font-medium text-gray-900">{lecture.instructor}</span>
            </p>

            {/* Enroll Button */}
            <button
              className="w-full rounded-lg bg-gray-900 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none lg:w-auto"
              aria-label="수강 신청하기"
            >
              수강 신청
            </button>
          </div>

          {/* Right Column - 썸네일 & 강의 정보 테이블 */}
          <div className="flex flex-col space-y-4">
            {/* Thumbnail */}
            <div className="aspect-video overflow-hidden rounded-lg bg-gray-200">
              <img
                src={lecture.thumbnail}
                alt={`${lecture.title} 강의 썸네일`}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Info Table */}
            {/* Tailwind: divide-y로 구분선 추가 */}
            <div className="rounded-lg bg-gray-50 p-4">
              <dl className="divide-y divide-gray-200">
                <div className="flex justify-between py-3">
                  <dt className="text-sm text-gray-500">난이도</dt>
                  <dd className="text-sm font-medium text-gray-900">{lecture.difficulty}</dd>
                </div>
                <div className="flex justify-between py-3">
                  <dt className="text-sm text-gray-500">수강 기한</dt>
                  <dd className="text-sm font-medium text-gray-900">{lecture.duration}</dd>
                </div>
                <div className="flex justify-between py-3">
                  <dt className="text-sm text-gray-500">자막</dt>
                  <dd className="text-sm font-medium text-gray-900">{lecture.language}</dd>
                </div>
                <div className="flex justify-between py-3">
                  <dt className="text-sm text-gray-500">수료증</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {lecture.hasCertificate ? '제공' : '미제공'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// LectureTab Component
// Description: 강의 소개 / 커리큘럼 탭 UI
// Tailwind: border-b로 탭 구분선, 활성 탭에 border-b-2 적용
// ============================================
const LectureTab: React.FC<{
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}> = ({ activeTab, onTabChange }) => {
  const tabs: TabType[] = ['강의 소개', '커리큘럼']

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8" aria-label="강의 정보 탭">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`border-b-2 py-4 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
            aria-selected={activeTab === tab}
            role="tab"
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  )
}

// ============================================
// LectureIntroContent Component
// Description: 강의 소개 탭 콘텐츠
// ============================================
const LectureIntroContent: React.FC<{ description: string }> = ({ description }) => {
  return (
    <div className="py-8">
      <h2 className="mb-4 text-xl font-bold text-gray-900">강의 설명</h2>
      <p className="text-sm leading-relaxed text-gray-600">{description}</p>
    </div>
  )
}

// ============================================
// CurriculumContent Component
// Description: 커리큘럼 탭 콘텐츠 (챕터 & 레슨 아코디언)
// Tailwind: divide-y로 챕터 구분, border로 아코디언 스타일
// ============================================
const CurriculumContent: React.FC<{ chapters: Chapter[] }> = ({ chapters }) => {
  const [expandedChapters, setExpandedChapters] = useState<string[]>(chapters.map((c) => c.id))

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId],
    )
  }

  return (
    <div className="py-8">
      <h2 className="mb-6 text-xl font-bold text-gray-900">커리큘럼</h2>

      {/* Chapter List */}
      <div className="space-y-4">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="overflow-hidden rounded-lg border border-gray-200">
            {/* Chapter Header */}
            {/* Tailwind: flex로 제목과 화살표 배치, hover:bg-gray-50으로 호버 효과 */}
            <button
              onClick={() => toggleChapter(chapter.id)}
              className="flex w-full items-center justify-between bg-gray-50 px-4 py-4 text-left transition-colors hover:bg-gray-100"
              aria-expanded={expandedChapters.includes(chapter.id)}
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-gray-900">{chapter.title}</span>
                <span className="text-xs text-gray-500">({chapter.lessonCount}강)</span>
              </div>
              <svg
                className={`h-5 w-5 text-gray-400 transition-transform ${
                  expandedChapters.includes(chapter.id) ? 'rotate-180' : ''
                }`}
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
            </button>

            {/* Lesson List */}
            {/* Tailwind: divide-y로 레슨 구분선 */}
            {expandedChapters.includes(chapter.id) && (
              <div className="divide-y divide-gray-100">
                {chapter.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between bg-white px-4 py-3"
                  >
                    <span className="text-sm text-gray-700">{lesson.title}</span>
                    {lesson.isPreview && (
                      <button
                        className="text-xs text-gray-500 transition-colors hover:text-gray-700"
                        aria-label={`${lesson.title} 미리보기`}
                      >
                        미리보기
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// LectureDetailPage Component
// Description: 강의 상세 페이지 메인 컴포넌트
// ============================================
export default function LectureDetailPage() {
  const [activeTab, setActiveTab] = useState<TabType>('강의 소개')
  const lecture = sampleLecture

  return (
    <div className="min-h-screen bg-white">
      {/* ============================================ */}
      {/* Header Component */}
      {/* Description: 상단 글로벌 네비게이션 헤더 */}
      {/* ============================================ */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center">
              <a href="/lectures" className="flex items-center" aria-label="홈으로 이동">
                <span className="text-2xl font-bold tracking-tight text-gray-900">welearn</span>
              </a>
            </div>

            {/* Auth Section - 비로그인 상태 */}
            <div className="flex items-center space-x-3">
              <a
                href="/login"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                로그인
              </a>
              <a
                href="/signup"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                회원가입
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================ */}
      {/* Lecture Hero Section */}
      {/* Description: 강의 상단 히어로 영역 */}
      {/* ============================================ */}
      <LectureHero lecture={lecture} />

      {/* ============================================ */}
      {/* Main Content */}
      {/* Description: 탭 기반 콘텐츠 영역 */}
      {/* ============================================ */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <LectureTab activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        {activeTab === '강의 소개' && <LectureIntroContent description={lecture.fullDescription} />}
        {activeTab === '커리큘럼' && <CurriculumContent chapters={lecture.chapters} />}
      </main>

      {/* ============================================ */}
      {/* Footer Component */}
      {/* Description: 페이지 하단 푸터 */}
      {/* ============================================ */}
    </div>
  )
}
