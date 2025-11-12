import React, { useMemo } from 'react';
import { Heart, ChevronRight, Play, CheckCircle, Clock, BookOpen, User } from 'lucide-react';
import LevelTag from './enrolled-card/LevelTag.jsx';
import RatingStars from './enrolled-card/RatingStars.jsx';
import { fmtDate } from '../../../utils/fmtDate.js';
import CATEGORIES from '../../../constants/categories.js';
import Button from '../../ui/Button.jsx'; // 설치 안돼 있으면 폴백 사용됨

export function EnrolledCard({ status, enrolledAt, reviews, lecture }) {
  const title = lecture?.title ?? '(삭제된 강의)';
  const thumb = lecture?.thumbnailUrl ?? '/placeholder.png';
  const level = lecture?.level;
  const teacher = lecture?.userName;
  const category = CATEGORIES.find((e) => e.id === lecture.category);

  const subDesc = useMemo(() => {
    const d = lecture?.description || '';
    return d.length > 80 ? d.slice(0, 80) + '…' : d;
  }, [lecture?.description]);

  return (
    <article
      className="group relative flex overflow-hidden rounded-2xl border border-gray-200 bg-white text-black transition-colors hover:border-gray-300"
      role="button"
      tabIndex={0}
    >
      {/* 썸네일 */}
      <div className="aspect-video h-48 w-48 flex-shrink-0 bg-gray-200 sm:aspect-auto">
        <img
          src={thumb}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>

      {/* 본문 */}
      <div className="flex min-h-full w-full flex-col justify-between p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-base leading-snug font-semibold">{title}</h3>
          <Heart />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <LevelTag level={level} />
          {typeof category !== 'undefined' && (
            <span className="rounded-md px-2 py-0.5 ring-1 ring-gray-700">{category.name}</span>
          )}
          <span className="inline-flex items-center gap-1">
            <User size={14} />
            {teacher || '익명 강사'}
          </span>
        </div>

        {subDesc && <p className="line-clamp-2 text-sm text-gray-900">{subDesc}</p>}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <RatingStars rating={reviews?.rating ?? 0} />
            <span className="text-xs">{(reviews?.rating ?? 0).toFixed(1)}</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1">
              <BookOpen size={14} /> 수강등록 {fmtDate(enrolledAt)}
            </span>
            {status === 'completed' ? (
              <span className="inline-flex items-center gap-1 text-indigo-300">
                <CheckCircle size={14} /> 수료
              </span>
            ) : status === 'active' ? (
              <span className="inline-flex items-center gap-1 text-emerald-300">
                <Play size={14} /> 수강 중
              </span>
            ) : (
              <span className="inline-flex items-center gap-1">
                <Clock size={14} /> {status}
              </span>
            )}
          </div>
        </div>

        {/* 액션 */}
        <div className="flex items-center justify-end gap-1 pt-1">
          <Button rightIcon={<ChevronRight size={16} />} type="button" onClick={() => {}}>
            {status === 'completed' ? '리뷰 보기' : '이어보기'}
          </Button>
        </div>
      </div>
    </article>
  );
}
