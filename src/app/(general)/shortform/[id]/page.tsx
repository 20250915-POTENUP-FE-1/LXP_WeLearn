'use client'

import React from 'react'

const ShortformDetailPage: React.FC = () => {
  return (
    // 모바일: 전체 화면(h-dvh), 검정 배경
    // PC(md 이상): 기존처럼 relative 컨테이너
    <div className="relative h-dvh w-full bg-black md:h-auto md:bg-transparent">
      {/* ============================================ */}
      {/* Main Content */}
      {/* ============================================ */}
      <section aria-labelledby="shortform-content" className="flex h-full w-full justify-center">
        {/* 메인 콘텐츠: 비디오 또는 이미지 */}
        <div className="relative h-full w-full overflow-hidden bg-black md:aspect-[9/16] md:max-w-[400px] md:rounded-xl">
          <video
            aria-label="숏폼 학습 영상"
            className="h-full w-full object-cover"
            controls
            src="/videos/sample.mp4"
          />

          {/* Creator Info: 영상 위 오버레이 */}
          <div className="pointer-events-none absolute inset-x-4 bottom-0 rounded-lg px-4 pb-10 text-white backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-300" />
              <div>
                <p className="font-medium">UserName</p>
                <p className="text-sm opacity-90">lessonTitle</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed opacity-90">lessonDescription</p>
          </div>

          {/* 우측 액션 버튼 그룹 */}
          <aside className="absolute right-4 bottom-20 flex flex-col items-center gap-6">
            {/* 좋아요 */}
            <button
              aria-label="좋아요"
              className="flex flex-col items-center text-white hover:text-gray-300 focus:ring-1 focus:ring-gray-600 focus:outline-none"
              type="button"
            >
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z"
                />
              </svg>
              <span className="mt-1 text-sm">892</span>
            </button>

            {/* 댓글 */}
            <button
              aria-label="댓글 보기"
              className="flex flex-col items-center text-white hover:text-gray-300 focus:ring-1 focus:ring-gray-600 focus:outline-none"
              type="button"
            >
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h8M8 14h6m-6 4h8l4-4V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2z"
                />
              </svg>
              <span className="mt-1 text-sm">57</span>
            </button>

            {/* 자막 */}
            <button
              aria-label="자막 보기"
              className="flex flex-col items-center text-white hover:text-gray-300 focus:ring-1 focus:ring-gray-600 focus:outline-none"
              type="button"
            >
              <span className="text-base font-semibold">CC</span>
              <span className="text-sm">자막</span>
            </button>

            {/* 저장 */}
            <button
              aria-label="저장"
              className="flex flex-col items-center text-white hover:text-gray-300 focus:ring-1 focus:ring-gray-600 focus:outline-none"
              type="button"
            >
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 5v14l7-4 7 4V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"
                />
              </svg>
              <span className="mt-1 text-sm">저장</span>
            </button>

            {/* 공유 */}
            <button
              aria-label="공유"
              className="flex flex-col items-center text-white hover:text-gray-300 focus:ring-1 focus:ring-gray-600 focus:outline-none"
              type="button"
            >
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4m0 0L8 6m4-4v16"
                />
              </svg>
              <span className="mt-1 text-sm">공유</span>
            </button>
          </aside>
        </div>
      </section>
    </div>
  )
}

export default ShortformDetailPage
