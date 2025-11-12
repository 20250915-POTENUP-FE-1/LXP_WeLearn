import { useEffect, useState } from 'react';
import { getCategoryName, getTotalLectureCount } from '../../utils/lectureUtils.js';
import EnrollButton from './EnrollButton.jsx';
import { Users, Star, Film } from 'lucide-react';
import { getLectureStatsByLecture } from '../../services/lecture/getLectureStatsByLecture.js';

function LectureHero({ lectureItem = {} }) {
  const {
    id,
    category,
    lectureId = '',
    title = '',
    description = '',
    userName = '',
    userId = '',
    curriculum = [],
    thumbnailUrl = '',
  } = lectureItem;

  // 3개 state를 1개 객체로 통합하기
  const [stats, setStats] = useState({
    enrollmentCount: 0,
    reviewCount: 0,
    avgRating: 0,
  });

  useEffect(() => {
    const fetchLectureStats = async () => {
      if (!lectureId) {
        return;
      }
      try {
        // 단 한 번의 호출로 모든 메타데이터 가져오기
        const data = await getLectureStatsByLecture(lectureId);
        setStats(data);
      } catch (error) {
        console.error('강의 메타데이터 불러오기 실패:', error);
      }
    };

    fetchLectureStats();
  }, [lectureId]);

  // 수강 신청 성공 시 수강 인원 수 증가 업데이트
  const handleEnrollSuccess = () => {
    setStats((prev) => ({
      ...prev,
      enrollmentCount: prev.enrollmentCount + 1,
    }));
  };

  const thumbSrc =
    thumbnailUrl || 'https://dr.savee-cdn.com/things/6/6/0d3d5da690b611c98f76a2.webp';

  return (
    <section className="lecture-hero border-gray-200 bg-transparent py-8">
      <div className="lecture-hero__container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Left: Lecture Info (2/5) */}
          <div className="lecture-info order-2 lg:order-1 lg:col-span-2">
            {/* Category Badge */}
            <span className="mb-4 inline-block rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white">
              {getCategoryName(category)}
            </span>

            {/* Title */}
            <h1 className="mb-4 pb-3 text-3xl leading-12 font-bold text-gray-900 sm:text-4xl">
              {title}
            </h1>

            {/* Description */}
            <p className="text-md mb-6 leading-7 text-gray-600">{description}</p>

            {/* Meta Info */}
            <div className="mb-6 flex flex-wrap items-center gap-4 border-b border-gray-200 pb-6 text-sm text-gray-600">
              {/* Rating */}
              <div className="flex items-center space-x-1">
                <Star size={16} />
                <span className="font-medium text-gray-900">{stats.avgRating.toFixed(1)}</span>
                <span>({stats.reviewCount})</span>
              </div>

              {/* Student Count */}
              <div className="flex items-center space-x-1">
                <Users size={16} />
                <span>{stats.enrollmentCount}명 수강</span>
              </div>

              {/* Total lectures */}
              <div className="flex items-center space-x-1">
                <Film size={16} />
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
          <div className="lecture-thumbnail order-1 lg:order-2 lg:col-span-3">
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
