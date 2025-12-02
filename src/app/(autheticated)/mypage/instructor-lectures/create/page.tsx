'use client'

// ============================================
// Page: 강의 등록 페이지
// Route: /mypage/instructor-lectures/create
// Access: 로그인 필수 (강사)
// Description: 새 강의를 등록하는 폼 페이지 (기본 정보 + 썸네일 + 커리큘럼 구성)
// Tailwind: grid로 2컬럼 레이아웃, 동적 챕터/레슨 추가 기능
// ============================================

import React, { useState, useRef } from 'react'

// 레슨 타입 정의
interface Lesson {
  id: string
  title: string
}

// 챕터 타입 정의
interface Chapter {
  id: string
  title: string
  lessons: Lesson[]
}

// 폼 데이터 타입 정의
interface LectureFormData {
  title: string
  description: string
  content: string
  level: string
  category: string
  thumbnail: File | null
  thumbnailPreview: string
  chapters: Chapter[]
}

// 난이도 옵션
const levelOptions = [
  { value: '', label: '난이도를 선택해주세요.' },
  { value: 'beginner', label: '초급' },
  { value: 'intermediate', label: '중급' },
  { value: 'advanced', label: '고급' },
]

// 카테고리 옵션
const categoryOptions = [
  { value: '', label: '카테고리를 선택해주세요.' },
  { value: 'frontend', label: '프론트엔드' },
  { value: 'backend', label: '백엔드' },
  { value: 'mobile', label: '모바일' },
  { value: 'ai', label: '생성형 AI' },
  { value: 'devops', label: '데브옵스' },
  { value: 'data', label: '데이터' },
  { value: 'ml', label: '머신러닝' },
]

// 고유 ID 생성 함수
const generateId = () => Math.random().toString(36).substr(2, 9)

// ============================================
// ThumbnailUpload Component
// Description: 썸네일 이미지 업로드 컴포넌트
// Tailwind: border-dashed로 점선 테두리, aspect-video로 비율 유지
// ============================================
const ThumbnailUpload: React.FC<{
  thumbnailPreview: string
  onFileChange: (file: File) => void
}> = ({ thumbnailPreview, onFileChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileChange(file)
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-bold text-gray-900">썸네일 이미지</h2>

      {/* File Input (Hidden) */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleChange}
        className="hidden"
        aria-label="썸네일 이미지 선택"
      />

      {/* Upload Area */}
      <div
        onClick={handleClick}
        className="relative aspect-video cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 transition-colors hover:border-gray-400"
        role="button"
        tabIndex={0}
        aria-label="썸네일 이미지 업로드"
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      >
        {thumbnailPreview ? (
          <img
            src={thumbnailPreview}
            alt="썸네일 미리보기"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-500">JPG/JPEG/PNG/WEBP</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// LessonItem Component
// Description: 개별 레슨 입력 컴포넌트
// Tailwind: flex로 가로 배치, 삭제 버튼 포함
// ============================================
const LessonItem: React.FC<{
  chapterIndex: number
  lessonIndex: number
  lesson: Lesson
  onUpdate: (value: string) => void
  onDelete: () => void
  canDelete: boolean
}> = ({ chapterIndex, lessonIndex, lesson, onUpdate, onDelete, canDelete }) => {
  return (
    <div className="ml-4 flex items-start gap-3">
      {/* Lesson Number */}
      <span className="w-8 pt-3 text-sm text-gray-500">
        {chapterIndex + 1}.{lessonIndex + 1}
      </span>

      {/* Lesson Input */}
      <div className="flex-1">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          레슨 제목 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={lesson.title}
          onChange={(e) => onUpdate(e.target.value)}
          placeholder="예: 코딩이란?"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-500 focus:outline-none"
        />
      </div>

      {/* Delete Button */}
      <button
        type="button"
        onClick={onDelete}
        disabled={!canDelete}
        className="mt-8 p-2 text-gray-400 transition-colors hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="레슨 삭제"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
        </svg>
      </button>
    </div>
  )
}

// ============================================
// ChapterItem Component
// Description: 개별 챕터 입력 컴포넌트 (레슨 목록 포함)
// Tailwind: border로 구분, space-y로 내부 간격
// ============================================
const ChapterItem: React.FC<{
  chapterIndex: number
  chapter: Chapter
  onUpdateTitle: (value: string) => void
  onDeleteChapter: () => void
  onAddLesson: () => void
  onUpdateLesson: (lessonIndex: number, value: string) => void
  onDeleteLesson: (lessonIndex: number) => void
  canDeleteChapter: boolean
}> = ({
  chapterIndex,
  chapter,
  onUpdateTitle,
  onDeleteChapter,
  onAddLesson,
  onUpdateLesson,
  onDeleteLesson,
  canDeleteChapter,
}) => {
  return (
    <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6">
      {/* Chapter Title Row */}
      <div className="flex items-start gap-3">
        {/* Chapter Number */}
        <span className="w-4 pt-3 text-sm text-gray-500">{chapterIndex + 1}.</span>

        {/* Chapter Title Input */}
        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            챕터 제목 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={chapter.title}
            onChange={(e) => onUpdateTitle(e.target.value)}
            placeholder="챕터 제목을 입력해주세요."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
        </div>

        {/* Delete Chapter Button */}
        <button
          type="button"
          onClick={onDeleteChapter}
          disabled={!canDeleteChapter}
          className="mt-8 p-2 text-gray-400 transition-colors hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="챕터 삭제"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Lessons List */}
      <div className="space-y-4">
        {chapter.lessons.map((lesson, lessonIndex) => (
          <LessonItem
            key={lesson.id}
            chapterIndex={chapterIndex}
            lessonIndex={lessonIndex}
            lesson={lesson}
            onUpdate={(value) => onUpdateLesson(lessonIndex, value)}
            onDelete={() => onDeleteLesson(lessonIndex)}
            canDelete={chapter.lessons.length > 1}
          />
        ))}
      </div>

      {/* Add Lesson Button */}
      <button
        type="button"
        onClick={onAddLesson}
        className="ml-7 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
      >
        + 레슨 추가
      </button>
    </div>
  )
}

// ============================================
// CreateLecturePage Component
// Description: 강의 등록 페이지 메인 컴포넌트
// ============================================
export default function CreateLecturePage() {
  // 폼 상태 관리
  const [formData, setFormData] = useState<LectureFormData>({
    title: '',
    description: '',
    content: '',
    level: '',
    category: '',
    thumbnail: null,
    thumbnailPreview: '',
    chapters: [
      {
        id: generateId(),
        title: '',
        lessons: [{ id: generateId(), title: '' }],
      },
    ],
  })

  // 기본 정보 업데이트 핸들러
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // 썸네일 업로드 핸들러
  const handleThumbnailChange = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        thumbnail: file,
        thumbnailPreview: reader.result as string,
      }))
    }
    reader.readAsDataURL(file)
  }

  // 챕터 추가 핸들러
  const handleAddChapter = () => {
    setFormData((prev) => ({
      ...prev,
      chapters: [
        ...prev.chapters,
        {
          id: generateId(),
          title: '',
          lessons: [{ id: generateId(), title: '' }],
        },
      ],
    }))
  }

  // 챕터 삭제 핸들러
  const handleDeleteChapter = (chapterIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      chapters: prev.chapters.filter((_, index) => index !== chapterIndex),
    }))
  }

  // 챕터 제목 업데이트 핸들러
  const handleUpdateChapterTitle = (chapterIndex: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chapter, index) =>
        index === chapterIndex ? { ...chapter, title: value } : chapter,
      ),
    }))
  }

  // 레슨 추가 핸들러
  const handleAddLesson = (chapterIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chapter, index) =>
        index === chapterIndex
          ? {
              ...chapter,
              lessons: [...chapter.lessons, { id: generateId(), title: '' }],
            }
          : chapter,
      ),
    }))
  }

  // 레슨 삭제 핸들러
  const handleDeleteLesson = (chapterIndex: number, lessonIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chapter, index) =>
        index === chapterIndex
          ? {
              ...chapter,
              lessons: chapter.lessons.filter((_, lIndex) => lIndex !== lessonIndex),
            }
          : chapter,
      ),
    }))
  }

  // 레슨 제목 업데이트 핸들러
  const handleUpdateLessonTitle = (chapterIndex: number, lessonIndex: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chapter, cIndex) =>
        cIndex === chapterIndex
          ? {
              ...chapter,
              lessons: chapter.lessons.map((lesson, lIndex) =>
                lIndex === lessonIndex ? { ...lesson, title: value } : lesson,
              ),
            }
          : chapter,
      ),
    }))
  }

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // 실제 구현 시 API 호출
  }

  // 취소 핸들러
  const handleCancel = () => {
    if (window.confirm('작성 중인 내용이 저장되지 않습니다. 취소하시겠습니까?')) {
      window.history.back()
    }
  }

  return (
    <>
      {/* ============================================ */}
      {/* Main Content */}
      {/* Description: 강의 등록 폼 */}
      {/* ============================================ */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Title */}
        <h1 className="mb-8 text-2xl font-bold text-gray-900">새 강의 등록</h1>

        <form onSubmit={handleSubmit}>
          {/* ============================================ */}
          {/* Top Section: 기본 정보 + 썸네일 */}
          {/* Tailwind: grid로 2컬럼 레이아웃 */}
          {/* ============================================ */}
          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* 기본 정보 섹션 (2/3 너비) */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 lg:col-span-2">
              <h2 className="mb-6 text-lg font-bold text-gray-900">기본 정보</h2>

              <div className="space-y-6">
                {/* 강의 제목 */}
                <div>
                  <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
                    강의 제목 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="강의 제목을 입력해주세요."
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-500 focus:outline-none"
                  />
                </div>

                {/* 강의 설명 */}
                <div>
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    강의 설명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="강의에 대한 간략한 설명을 입력해주세요."
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-500 focus:outline-none"
                  />
                </div>

                {/* 강의 내용 */}
                <div>
                  <label htmlFor="content" className="mb-2 block text-sm font-medium text-gray-700">
                    강의 내용 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="강의 내용을 입력해주세요."
                    required
                    rows={5}
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-500 focus:outline-none"
                  />
                </div>

                {/* 난이도 */}
                <div>
                  <label htmlFor="level" className="mb-2 block text-sm font-medium text-gray-700">
                    난이도 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="level"
                      name="level"
                      value={formData.level}
                      onChange={handleInputChange}
                      required
                      className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-transparent focus:ring-2 focus:ring-gray-500 focus:outline-none"
                    >
                      {levelOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                      <svg
                        className="h-5 w-5 text-gray-400"
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

                {/* 카테고리 */}
                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    카테고리 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-transparent focus:ring-2 focus:ring-gray-500 focus:outline-none"
                    >
                      {categoryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                      <svg
                        className="h-5 w-5 text-gray-400"
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
              </div>
            </div>

            {/* 썸네일 업로드 섹션 (1/3 너비) */}
            <div className="lg:col-span-1">
              <ThumbnailUpload
                thumbnailPreview={formData.thumbnailPreview}
                onFileChange={handleThumbnailChange}
              />
            </div>
          </div>

          {/* ============================================ */}
          {/* Curriculum Section: 커리큘럼 구성 */}
          {/* Description: 챕터와 레슨 동적 추가/삭제 */}
          {/* ============================================ */}
          <div className="mb-8">
            <h2 className="mb-6 text-xl font-bold text-gray-900">커리큘럼 구성</h2>

            {/* Chapters List */}
            <div className="space-y-4">
              {formData.chapters.map((chapter, chapterIndex) => (
                <ChapterItem
                  key={chapter.id}
                  chapterIndex={chapterIndex}
                  chapter={chapter}
                  onUpdateTitle={(value) => handleUpdateChapterTitle(chapterIndex, value)}
                  onDeleteChapter={() => handleDeleteChapter(chapterIndex)}
                  onAddLesson={() => handleAddLesson(chapterIndex)}
                  onUpdateLesson={(lessonIndex, value) =>
                    handleUpdateLessonTitle(chapterIndex, lessonIndex, value)
                  }
                  onDeleteLesson={(lessonIndex) => handleDeleteLesson(chapterIndex, lessonIndex)}
                  canDeleteChapter={formData.chapters.length > 1}
                />
              ))}
            </div>

            {/* Add Chapter Button */}
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleAddChapter}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
              >
                + 챕터 추가
              </button>
            </div>
          </div>

          {/* ============================================ */}
          {/* Form Actions */}
          {/* Description: 취소 / 등록하기 버튼 */}
          {/* Tailwind: flex justify-end로 우측 정렬 */}
          {/* ============================================ */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-lg bg-gray-900 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
            >
              등록하기
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
