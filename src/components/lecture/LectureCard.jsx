import React, { useState, useEffect } from 'react';
import CATEGORIES from '../../constants/categories';
import { useNavigate } from 'react-router-dom';
import { getLectureStatsByLecture } from '../../services/lecture/getLectureStatsByLecture';
import { Star, User } from 'lucide-react';

function LectureCard({ lecture }) {
  const category = CATEGORIES.find((e) => e.id === lecture.category);
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    enrollmentCount: 0,
    reviewCount: 0,
    avgRating: 0,
  });

  useEffect(() => {
    const fetchLectureStats = async () => {
      if (!lecture) {
        return;
      }
      try {
        // 단 한 번의 호출로 모든 메타데이터 가져오기
        const data = await getLectureStatsByLecture(lecture.lectureId);
        setStats(data);
      } catch (error) {
        console.error('강의 메타데이터 불러오기 실패:', error);
      }
    };

    fetchLectureStats();
  }, [lecture.lectureId]);

  const handleMoveToDetail = () => {
    navigate(`/lectures/detail/${lecture.lectureId}`);
  };

  return (
    <div
      className="min-h-[330px] cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl"
      onClick={handleMoveToDetail}
    >
      <div className="relative aspect-video bg-gray-200">
        <img
          src={
            lecture.thumbnailUrl
              ? lecture.thumbnailUrl
              : 'https://dr.savee-cdn.com/things/6/6/0d3d5da690b611c98f76a2.webp'
          }
          alt="React 완전 정복"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute top-3 left-3 rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white">
          {category ? category.name : '백엔드'}
        </span>
      </div>

      <div className="flex h-full min-h-[170px] flex-col justify-between space-y-3 p-4">
        <h3 className="line-clamp-2 max-h-16 min-h-16 text-lg font-bold text-gray-900">
          {lecture.title}
        </h3>

        <p className="text-sm text-gray-600">{lecture.userName}</p>

        <div className="flex items-center justify-between border-t border-gray-100 pt-2">
          <div className="flex items-center space-x-1">
            <Star size={16} color="#FFD700" fill="#FFD700" />
            <span className="text-sm font-medium text-gray-900">{lecture && stats.avgRating}</span>
            <span className="text-sm text-gray-500">{`(${lecture && stats.reviewCount})`}</span>
          </div>

          <span className="text-sm text-gray-500">
            {stats.enrollmentCount ? `${stats.enrollmentCount} 명` : ''}
          </span>
        </div>
      </div>
    </div>
  );
}

export default LectureCard;
