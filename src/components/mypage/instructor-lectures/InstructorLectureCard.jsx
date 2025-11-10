import React from 'react';
import { Link } from 'react-router-dom';

export default function InstructorLectureCard({
  id, // Firestore 문서 id
  lectureId,
  thumbnailUrl,
  title,
  userName,
  studentCount = 0,
  rating = 0,
  reviewCount = 0,
  categoryName,
  onDelete,
}) {
  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
      <div className="flex flex-col sm:flex-row">
        <div className="relative aspect-video shrink-0 bg-gray-100 sm:aspect-auto sm:w-48">
          <img
            src={thumbnailUrl || 'https://dr.savee-cdn.com/things/6/6/0d3d5da690b611c98f76a2.webp'}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex-1 p-6">
          <div className="mb-3">
            {categoryName && (
              <span className="mb-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-900">
                {categoryName}
              </span>
            )}
            <h3 className="mb-2 line-clamp-1 text-lg font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{userName}</p>
          </div>

          <div className="mb-4 flex items-center gap-4 border-b border-gray-200 pb-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span>{studentCount}명 수강</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="h-4 w-4" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <span>
                {rating} ({reviewCount})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/mypage/edit-lecture/${id}`}
              className="flex-1 rounded-lg bg-gray-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-800"
            >
              수정
            </Link>
            <button
              onClick={() => onDelete?.({ id, lectureId })}
              className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
