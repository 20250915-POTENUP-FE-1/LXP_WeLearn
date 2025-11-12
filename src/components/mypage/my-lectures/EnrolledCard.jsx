import React from 'react';
import { ChevronRight, BookOpen } from 'lucide-react';
import { fmtDate } from '../../../utils/fmtDate.js';
import CATEGORIES from '../../../constants/categories.js';

export function EnrolledCard({ status, enrolledAt, reviews, lecture }) {
  const title = lecture?.title ?? '(삭제된 강의)';
  const thumb = lecture?.thumbnailUrl ?? '/placeholder.png';
  const level = lecture?.level;
  const teacher = lecture?.userName;
  const category = CATEGORIES.find((e) => e.id === lecture.category);

  return (
    <article
      className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
      role="button"
      tabIndex={0}
    >
      <div className="flex flex-col sm:flex-row">
        {/* 썸네일 */}
        <div className="relative aspect-video shrink-0 bg-gray-100 sm:aspect-auto sm:w-48">
          <img
            src={thumb || 'https://dr.savee-cdn.com/things/6/6/0d3d5da690b611c98f76a2.webp'}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* 본문 */}
        <div className="flex-1 p-6">
          <div className="mb-3">
            {/* 카테고리/레벨 배지 */}
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {category?.name && (
                <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-900">
                  {category.name}
                </span>
              )}
              {level && (
                <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-900">
                  {level}
                </span>
              )}
            </div>

            {/* 제목/강사 */}
            <h3 className="mb-2 line-clamp-1 text-lg font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{teacher || '익명 강사'}</p>
          </div>

          {/* 정보 바 */}
          <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <BookOpen size={16} />
              <span>수강 신청일 {fmtDate(enrolledAt)}</span>
            </div>

            {status === 'completed' ? (
              <span className="rounded-md bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                수료
              </span>
            ) : status === 'active' ? (
              <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">
                수강 중
              </span>
            ) : (
              status && (
                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                  {status}
                </span>
              )
            )}
          </div>

          {/* 액션 */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex-1 rounded-lg bg-zinc-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-zinc-800"
            >
              <span className="inline-flex items-center gap-1">
                학습하기 <ChevronRight size={16} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
