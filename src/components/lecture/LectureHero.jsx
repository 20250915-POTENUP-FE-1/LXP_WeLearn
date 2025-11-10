import { useState } from 'react';
import { getCategoryName, getTotalLectureCount } from '../../utils/lectureUtils.js';
import EnrollButton from './EnrollButton.jsx';

/**
 *   getCategoryName(categoryValue)
 * - categoryValue가 숫자(ID)든 문자열(KEY)이든
 *   CATEGORIES 배열에서 일치하는 항목의 name을 찾아 반환
 * - 일치 항목이 없거나 null/undefined일 경우 기본값 '기타' 반환
 */

function LectureHero({ lectureItem = {} }) {
  // 부모 컴포넌트에서 전달된 강의 데이터 구조 분해하기

  const {
    id,
    category,
    lectureId = '',
    title = '',
    description = '',
    userName = '',
    userId = '',
    rating = 0,
    reviewCount = 0,
    studentCount = 0,
    curriculum = [],
    thumbnailUrl = '',
  } = lectureItem;

  //  수강 인원 수 상태 관리
  const [currentStudentCount, setCurrentStudentCount] = useState(studentCount);

  // 수강 신청 성공 시 수강 인원 수 증가 업데이트
  const handleEnrollSuccess = () => {
    setCurrentStudentCount((prev) => prev + 1);
  };
  // 천단위 콤마(,) 넣기
  const safeStudentCount = Number.isFinite(Number(currentStudentCount))
    ? Number(currentStudentCount).toLocaleString()
    : '0';

  /**
   *  thumbSrc
   * - 썸네일 이미지 경로가 존재하지 않을 경우, 기본 이미지 URL 사용.
   */
  const thumbSrc =
    thumbnailUrl || 'https://dr.savee-cdn.com/things/6/6/0d3d5da690b611c98f76a2.webp';

  return (
    <section className="lecture-hero bg-trasparent border-gray-200 py-8">
      <div className="lecture-hero__container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Left: Lecture Info (2/5) */}
          <div className="lecture-info lg:col-span-2">
            {/* Category Badge */}
            <span className="mb-4 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-900">
              {getCategoryName(category)}
            </span>

            {/* Title */}
            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{title}</h1>

            {/* Description */}
            <p className="mb-6 text-lg text-gray-600">{description}</p>

            {/* Meta Info */}
            <div className="mb-6 flex flex-wrap items-center gap-4 border-b border-gray-200 pb-6 text-sm text-gray-600">
              {/* Rating */}
              <div className="flex items-center space-x-1">
                <svg
                  className="h-5 w-5 fill-current text-yellow-400"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span className="font-medium text-gray-900">{Number(rating) || 0}</span>
                <span>({Number(reviewCount) || 0})</span>
              </div>

              {/* Student Count */}
              <div className="flex items-center space-x-1">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span>{safeStudentCount}명 수강</span>
              </div>

              {/* Total lectures */}
              <div className="flex items-center space-x-1">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                  />
                </svg>
                <span>{getTotalLectureCount(curriculum)} 개 강의</span>
              </div>
            </div>

            {/* Instructor */}
            <div className="mb-6 flex items-center space-x-2">
              <p className="text-sm text-gray-500">강사</p>
              <p className="text-base font-medium text-gray-900">{userName || '미정'}</p>
            </div>

            {/* CTA Button */}
            <EnrollButton
              lectureId={lectureId}
              firestoreDocId={id}
              instructorId={userId}
              onEnrollSuccess={handleEnrollSuccess}
            />
          </div>

          {/* Right: Thumbnail (3/5) */}
          <div className="lecture-thumbnail lg:col-span-3">
            <div className="top-24">
              <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-200 shadow-lg">
                <img
                  src={thumbSrc}
                  alt={title ? `${title} 썸네일` : '강의 썸네일'}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LectureHero;
