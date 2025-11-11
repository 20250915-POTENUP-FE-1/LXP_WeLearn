import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LectureHero from '../../../components/lecture/LectureHero.jsx';
import LectureTabs from '../../../components/lecture/LectureTabs.jsx';
import LectureContent from '../../../components/lecture/LectureContent.jsx';
import LectureCurriculum from '../../../components/lecture/LectureCurriculum.jsx';
import { getLectureItemService } from '../../../services/lecture/getLectureItemService.js';

const LectureDetail = () => {
  const { lectureId } = useParams();

  const [lectureItem, setLectureItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchLecture = async () => {
      setLoading(true);
      try {
        // lectureId 기준으로 조회
        const item = await getLectureItemService(lectureId);
        if (isMounted) {
          setLectureItem(item ?? null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (lectureId) fetchLecture();

    return () => {
      isMounted = false;
    };
  }, [lectureId]);

  // 로딩 상태
  if (loading) {
    return (
      <main className="main flex h-screen items-center justify-center text-gray-500">
        데이터를 불러오는 중입니다..
      </main>
    );
  }

  // 데이터 없음 상태
  if (!lectureItem) {
    return (
      <main className="main h-screen py-20 pb-12 text-center text-gray-500">
        해당 강의를 찾을 수 없습니다.
      </main>
    );
  }

  // 정상 렌더링
  return (
    <main className="main pb-12">
      {/* 상단 히어로 섹션 */}
      <LectureHero lectureItem={lectureItem} />

      {/* 강의 상세 메뉴 탭 */}
      <LectureTabs lectureId={lectureId} />

      {/* 강의 상세 콘텐츠 */}
      <LectureContent lectureItem={lectureItem} />

      {/* 커리큘럼 소개 */}
      <LectureCurriculum curriculum={lectureItem.curriculum} />
    </main>
  );
};

export default LectureDetail;
