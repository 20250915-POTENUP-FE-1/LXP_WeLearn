'use client'

// ============================================
// Page: 강사 마이페이지 - 내가 등록한 강의
// Route: /mypage/instructor-lectures
// Access: 로그인 필수 (강사)
// Description: 강사가 등록한 강의 목록을 관리하는 페이지 (상세보기, 수정, 삭제 기능)
// Tailwind: grid로 사이드바/메인 레이아웃, flex로 카드 구성
// ============================================

import React, { useState } from 'react'

// 사이드바 메뉴 타입 정의
type SidebarMenu = '수강 중인 강의' | '내가 등록한 강의' | '찜목록'

// 강사가 등록한 강의 타입 정의
interface InstructorLecture {
  id: string
  thumbnail: string
  category: string
  level: string
  title: string
  instructorName: string
  rating: number
  reviewCount: number
  enrollmentCount: number
}

// 사용자 정보 타입 정의
interface UserInfo {
  name: string
  email: string
  profileImage?: string
}

// 샘플 사용자 데이터
const sampleUser: UserInfo = {
  name: '심석망',
  email: 'user022@example.com',
}

// 샘플 강사 등록 강의 데이터
const sampleInstructorLectures: InstructorLecture[] = [
  {
    id: '1',
    thumbnail: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=300&h=200&fit=crop',
    category: '생성형AI',
    level: '초급',
    title: '뿌에띠끼오나는 야호',
    instructorName: '심석망',
    rating: 0.0,
    reviewCount: 0,
    enrollmentCount: 0,
  },
  {
    id: '2',
    thumbnail: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=300&h=200&fit=crop',
    category: '백엔드',
    level: '중급',
    title: 'Next.js Middleware 인증 흐름 이해하기',
    instructorName: '심석망',
    rating: 2.6,
    reviewCount: 1,
    enrollmentCount: 1,
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
// StarRating Component
// Description: 별점 표시 컴포넌트
// Props: rating (숫자), reviewCount (리뷰 수)
// ============================================
const StarRating: React.FC<{ rating: number; reviewCount: number }> = ({ rating, reviewCount }) => {
  return (
    <div className="flex items-center space-x-1 text-sm">
      <svg className="h-4 w-4 fill-current text-yellow-400" viewBox="0 0 20 20">
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
      <span className="font-medium text-gray-900">{rating.toFixed(1)}</span>
      <span className="text-gray-400">({reviewCount})</span>
    </div>
  )
}

// ============================================
// CreateLectureButton Component
// Description: 새 강의 만들기 버튼 (상단 배너 형태)
// Tailwind: bg-gray-900로 배경, hover 효과 적용
// ============================================
const CreateLectureButton: React.FC = () => {
  return (
    <a
      href="/mypage/instructor-lectures/create"
      className="group flex w-full items-center justify-between rounded-xl bg-gray-900 px-6 py-4 transition-colors hover:bg-gray-800"
      aria-label="새 강의 만들기"
    >
      <div>
        <h3 className="mb-1 text-base font-semibold text-white">새 강의 만들기</h3>
        <p className="text-sm text-gray-400">지식을 공유하고 학생들과 함께 성장하세요</p>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white/20">
        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      </div>
    </a>
  )
}

// ============================================
// InstructorLectureCard Component
// Description: 강사가 등록한 강의 카드 컴포넌트
// Tailwind: flex로 가로 배치, border로 카드 구분
// Props: lecture (InstructorLecture 타입)
// ============================================
const InstructorLectureCard: React.FC<{
  lecture: InstructorLecture
  onView: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}> = ({ lecture, onView, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col gap-4 border-b border-gray-100 py-6 last:border-b-0 sm:flex-row">
      {/* Thumbnail */}
      {/* Tailwind: aspect-video로 비율 유지, rounded-lg로 모서리 둥글게 */}
      <div className="aspect-video w-full flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:w-48">
        <img
          src={lecture.thumbnail}
          alt={`${lecture.title} 강의 썸네일`}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        {/* Header Row - Category, Level */}
        <div className="mb-2 flex items-center gap-2">
          {/* Category Badge */}
          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
            {lecture.category}
          </span>
          {/* Level Badge */}
          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
            {lecture.level}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-1 line-clamp-2 text-base font-semibold text-gray-900">{lecture.title}</h3>

        {/* Instructor Name */}
        <p className="mb-3 text-sm text-gray-500">{lecture.instructorName}</p>

        {/* Stats Row */}
        <div className="mb-4 flex items-center gap-4">
          {/* Rating */}
          <StarRating rating={lecture.rating} reviewCount={lecture.reviewCount} />

          {/* Enrollment Count */}
          <div className="flex items-center space-x-1 text-sm text-gray-500">
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span>{lecture.enrollmentCount}명 수강 중</span>
          </div>
        </div>

        {/* Action Buttons */}
        {/* Tailwind: flex로 가로 배치, gap-2로 버튼 간격 */}
        <div className="mt-auto flex items-center gap-2">
          {/* View Detail Button */}
          <button
            onClick={() => onView(lecture.id)}
            className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
            aria-label={`${lecture.title} 상세보기`}
          >
            상세보기
          </button>

          {/* Edit Button */}
          <button
            onClick={() => onEdit(lecture.id)}
            className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
            aria-label={`${lecture.title} 수정`}
          >
            수정
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(lecture.id)}
            className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
            aria-label={`${lecture.title} 삭제`}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  )
}

// ============================================
// InstructorLecturesPage Component
// Description: 강사 마이페이지 메인 컴포넌트
// ============================================
export default function InstructorLecturesPage() {
  const [activeMenu, setActiveMenu] = useState<SidebarMenu>('내가 등록한 강의')
  const [lectures, setLectures] = useState<InstructorLecture[]>(sampleInstructorLectures)

  // 상세보기 핸들러
  const handleView = (lectureId: string) => {
    // 실제 구현 시 상세 페이지로 이동
    console.log('View lecture:', lectureId)
    window.location.href = `/lectures/${lectureId}`
  }

  // 수정 핸들러
  const handleEdit = (lectureId: string) => {
    // 실제 구현 시 수정 페이지로 이동
    console.log('Edit lecture:', lectureId)
    window.location.href = `/mypage/instructor-lectures/${lectureId}/edit`
  }

  // 삭제 핸들러
  const handleDelete = (lectureId: string) => {
    // 실제 구현 시 확인 모달 표시 후 삭제 API 호출
    if (window.confirm('정말 이 강의를 삭제하시겠습니까?')) {
      setLectures((prev) => prev.filter((lecture) => lecture.id !== lectureId))
      console.log('Delete lecture:', lectureId)
    }
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
      {/* Tailwind: flex로 2컬럼 레이아웃 (사이드바 고정, 메인 유동) */}
      {/* ============================================ */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* ============================================ */}
          {/* Sidebar */}
          {/* Description: 좌측 사이드바 (프로필 + 메뉴) */}
          {/* Tailwind: w-64로 고정 너비, border로 구분 */}
          {/* ============================================ */}
          <aside className="w-full flex-shrink-0 lg:w-64">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              {/* User Profile */}
              <UserProfileCard user={sampleUser} />

              {/* Navigation Menu */}
              <SidebarNavigation activeMenu={activeMenu} onMenuChange={setActiveMenu} />
            </div>
          </aside>

          {/* ============================================ */}
          {/* Main Content Area */}
          {/* Description: 내가 등록한 강의 목록 */}
          {/* ============================================ */}
          <main className="flex-1">
            {/* Create Lecture Button */}
            <div className="mb-8">
              <CreateLectureButton />
            </div>

            {/* Section Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">내가 등록한 강의</h2>
              <span className="text-sm text-gray-500">총 {lectures.length}개</span>
            </div>

            {/* Lecture List */}
            <div className="bg-white">
              {lectures.length > 0 ? (
                lectures.map((lecture) => (
                  <InstructorLectureCard
                    key={lecture.id}
                    lecture={lecture}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="mb-4 text-5xl">📝</div>
                  <p className="mb-2 text-lg font-medium text-gray-900">
                    아직 등록한 강의가 없습니다
                  </p>
                  <p className="mb-6 text-sm text-gray-500">첫 번째 강의를 만들어보세요</p>
                  <a
                    href="/mypage/instructor-lectures/create"
                    className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                  >
                    강의 만들기
                  </a>
                </div>
              )}
            </div>

            {/* End of List Indicator */}
            {lectures.length > 0 && (
              <div className="py-8 text-center text-sm text-gray-400">- 끝 -</div>
            )}
          </main>
        </div>
      </div>
    </>
  )
}
