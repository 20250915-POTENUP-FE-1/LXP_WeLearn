'use client'

// ============================================
// Page: 학생 마이페이지 - 수강 중인 강의
// Route: /mypage/my-lectures
// Access: 로그인 필수 (학생)
// Description: 수강 중인 강의 목록을 진행률과 함께 표시하는 페이지
// Tailwind: grid로 사이드바/메인 레이아웃, flex로 카드 구성
// ============================================

import React, { useState } from 'react'

// 사이드바 메뉴 타입 정의
type SidebarMenu = '수강 중인 강의' | '내가 등록한 강의' | '찜목록'

// 수강 중인 강의 타입 정의
interface EnrolledLecture {
  id: string
  thumbnail: string
  category: string
  level: string
  title: string
  instructor: string
  enrolledDate: string
  progress: number
  completedLessons: number
  totalLessons: number
  isFavorite: boolean
}

// 사용자 정보 타입 정의
interface UserInfo {
  name: string
  email: string
  profileImage?: string
}

// 샘플 사용자 데이터
const sampleUser: UserInfo = {
  name: '홍길동',
  email: 'student@lxp.com',
}

// 샘플 수강 중인 강의 데이터
const sampleEnrolledLectures: EnrolledLecture[] = [
  {
    id: '1',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
    category: '개발',
    level: '초급',
    title: 'React와 TypeScript로 만드는 현대적인 웹 애플리케이션',
    instructor: '윤강사',
    enrolledDate: '2024.01.15',
    progress: 35,
    completedLessons: 8,
    totalLessons: 24,
    isFavorite: true,
  },
  {
    id: '2',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop',
    category: '디자인',
    level: '중급',
    title: 'UI/UX 디자인 기초부터 실전까지',
    instructor: '김디자이너',
    enrolledDate: '2024.02.20',
    progress: 62,
    completedLessons: 12,
    totalLessons: 20,
    isFavorite: true,
  },
  {
    id: '3',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
    category: '개발',
    level: '초급',
    title: 'Python으로 시작하는 데이터 분석',
    instructor: '박데이터',
    enrolledDate: '2024.03.10',
    progress: 15,
    completedLessons: 3,
    totalLessons: 18,
    isFavorite: true,
  },
]

// ============================================
// UserProfileCard Component
// Description: 사이드바 상단 사용자 프로필 카드
// Tailwind: flex-col로 세로 배치, items-center로 중앙 정렬
// ============================================
const UserProfileCard: React.FC<{ user: UserInfo }> = ({ user }) => {
  return (
    <div className="mb-6 flex flex-col items-center text-center">
      {/* Profile Image */}
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt={`${user.name} 프로필 이미지`}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <svg
            className="h-10 w-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        )}
      </div>

      {/* User Name */}
      <h2 className="mb-1 text-base font-semibold text-gray-900">{user.name}</h2>

      {/* User Email */}
      <p className="text-sm text-gray-500">{user.email}</p>
    </div>
  )
}

// ============================================
// SidebarNavigation Component
// Description: 사이드바 네비게이션 메뉴
// Tailwind: space-y-1로 메뉴 간격, rounded-lg로 활성 메뉴 스타일
// ============================================
const SidebarNavigation: React.FC<{
  activeMenu: SidebarMenu
  onMenuChange: (menu: SidebarMenu) => void
}> = ({ activeMenu, onMenuChange }) => {
  const menus: SidebarMenu[] = ['수강 중인 강의', '내가 등록한 강의', '찜목록']

  return (
    <nav className="space-y-1" aria-label="마이페이지 메뉴">
      {menus.map((menu) => (
        <button
          key={menu}
          onClick={() => onMenuChange(menu)}
          className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
            activeMenu === menu ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
          aria-current={activeMenu === menu ? 'page' : undefined}
        >
          {menu}
        </button>
      ))}
    </nav>
  )
}

// ============================================
// ProgressBar Component
// Description: 강의 진행률 표시 바
// Tailwind: bg-gray-200으로 배경, bg-emerald-500으로 진행률 표시
// ============================================
const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="h-1.5 w-full rounded-full bg-gray-200">
      <div
        className="h-1.5 rounded-full bg-emerald-500 transition-all duration-300"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}

// ============================================
// EnrolledLectureCard Component
// Description: 수강 중인 강의 카드 컴포넌트
// Tailwind: flex로 가로 배치, border로 카드 구분
// Props: lecture (EnrolledLecture 타입)
// ============================================
const EnrolledLectureCard: React.FC<{
  lecture: EnrolledLecture
  onToggleFavorite: (id: string) => void
}> = ({ lecture, onToggleFavorite }) => {
  return (
    <div className="flex flex-col gap-4 border-b border-gray-100 py-6 last:border-b-0 sm:flex-row">
      {/* Thumbnail */}
      {/* Tailwind: aspect-video로 비율 유지, rounded-lg로 모서리 둥글게 */}
      <div className="aspect-video w-full shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:w-48">
        <img
          src={lecture.thumbnail}
          alt={`${lecture.title} 강의 썸네일`}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        {/* Header Row - Category, Level, Favorite */}
        <div className="mb-2 flex items-start justify-between">
          <div className="flex items-center gap-2">
            {/* Category Badge */}
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
              {lecture.category}
            </span>
            {/* Level Badge */}
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
              {lecture.level}
            </span>
          </div>

          {/* Favorite Button */}
          <button
            onClick={() => onToggleFavorite(lecture.id)}
            className="rounded p-1 transition-colors hover:bg-gray-100"
            aria-label={lecture.isFavorite ? '찜 해제' : '찜하기'}
          >
            <svg
              className={`h-5 w-5 ${
                lecture.isFavorite ? 'fill-current text-gray-900' : 'text-gray-300'
              }`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* Title */}
        <h3 className="mb-1 line-clamp-2 text-base font-semibold text-gray-900">{lecture.title}</h3>

        {/* Instructor */}
        <p className="mb-3 text-sm text-gray-500">{lecture.instructor}</p>

        {/* Progress Section */}
        <div className="mt-auto">
          {/* Progress Label */}
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-gray-500">진행률</span>
            <span className="font-medium text-gray-900">{lecture.progress}%</span>
          </div>

          {/* Progress Bar */}
          <ProgressBar progress={lecture.progress} />

          {/* Lesson Count & Button Row */}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              {lecture.completedLessons} / {lecture.totalLessons} 강의 완료
            </span>

            {/* Continue Learning Button */}
            <button
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
              aria-label={`${lecture.title} 이어서 학습하기`}
            >
              이어서 학습하기 &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// MyLecturesPage Component
// Description: 학생 마이페이지 메인 컴포넌트
// ============================================
export default function MyLecturesPage() {
  const [activeMenu, setActiveMenu] = useState<SidebarMenu>('수강 중인 강의')
  const [lectures, setLectures] = useState<EnrolledLecture[]>(sampleEnrolledLectures)

  // 찜하기 토글 핸들러
  const handleToggleFavorite = (lectureId: string) => {
    setLectures((prev) =>
      prev.map((lecture) =>
        lecture.id === lectureId ? { ...lecture, isFavorite: !lecture.isFavorite } : lecture,
      ),
    )
  }

  return (
    <>
      {/* ============================================ */}
      {/* Page Header */}
      {/* Description: 페이지 제목 영역 */}
      {/* ============================================ */}
      <div className="border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">마이페이지</h1>
          <p className="mt-1 text-sm text-gray-500">내 학습 현황과 정보를 관리하세요</p>
        </div>
      </div>

      {/* ============================================ */}
      {/* Main Content with Sidebar */}
      {/* Description: 사이드바 + 메인 콘텐츠 레이아웃 */}
      {/* Tailwind: grid로 2컬럼 레이아웃 (사이드바 고정, 메인 유동) */}
      {/* ============================================ */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* ============================================ */}
          {/* Sidebar */}
          {/* Description: 좌측 사이드바 (프로필 + 메뉴) */}
          {/* Tailwind: w-64로 고정 너비, border로 구분 */}
          {/* ============================================ */}
          <aside className="w-full shrink-0 lg:w-64">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              {/* User Profile */}
              <UserProfileCard user={sampleUser} />

              {/* Navigation Menu */}
              <SidebarNavigation activeMenu={activeMenu} onMenuChange={setActiveMenu} />
            </div>
          </aside>

          {/* ============================================ */}
          {/* Main Content Area */}
          {/* Description: 수강 중인 강의 목록 */}
          {/* ============================================ */}
          <div className="flex-1">
            {/* Section Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">수강 중인 강의</h2>
              <span className="text-sm text-gray-500">전체보기</span>
            </div>

            {/* Lecture List */}
            {/* Tailwind: divide-y로 카드 구분선 */}
            <div className="bg-white">
              {lectures.length > 0 ? (
                lectures.map((lecture) => (
                  <EnrolledLectureCard
                    key={lecture.id}
                    lecture={lecture}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))
              ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="mb-4 text-5xl">📚</div>
                  <p className="mb-2 text-lg font-medium text-gray-900">
                    아직 수강 중인 강의가 없습니다
                  </p>
                  <p className="mb-6 text-sm text-gray-500">관심 있는 강의를 찾아보세요</p>
                  <a
                    href="/lectures"
                    className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                  >
                    강의 찾아보기
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
