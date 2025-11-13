import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Star, MessageSquare } from 'lucide-react';
import { getLectureStatsByLecture } from '../../../services/lecture/getLectureStatsByLecture.js';

function InstructorLectureCard({
  lectureId,
  thumbnailUrl,
  title,
  userName,
  categoryName,
  onDelete,
}) {
  // 상태 관리
  const [stats, setStats] = useState({
    enrollmentCount: 0,
    reviewCount: 0,
    avgRating: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!lectureId) return;

      try {
        const data = await getLectureStatsByLecture(lectureId);
        console.log('강의 데이터:', data);
        setStats(data);
      } catch (error) {
        console.log('강의 데이터 불러오기 실패:', error);
      }
    };
    fetchStats();
  }, [lectureId]);

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
            {/* 별점 */}
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-gray-900">{stats.avgRating.toFixed(1)}</span>
            </div>

            {/* 리뷰 개수 */}
            <div className="flex items-center gap-1">
              <MessageSquare size={16} />
              <span>({stats.reviewCount})</span>
            </div>

            {/* 수강 인원 */}

            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>{stats.enrollmentCount}명 수강</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/mypage/edit-lecture/${lectureId}`}
              className="flex-1 rounded-lg bg-zinc-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-zinc-800"
            >
              수정
            </Link>
            <button
              onClick={() => onDelete?.({ lectureId })}
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

export default InstructorLectureCard;
