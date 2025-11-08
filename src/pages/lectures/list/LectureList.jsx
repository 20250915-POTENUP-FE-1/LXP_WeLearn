import React, { useEffect, useState } from 'react';
import LectureCard from '../../../components/lecture/LectureCard';
import { getLectures } from '../../../services/lecture/getLecturesService';
import Categories from '../../../components/categories/categories';
import { useSearchParams } from 'react-router-dom';

const LectureList = () => {
  const [lectureDatas, setLectureDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'latest';

  useEffect(() => {
    // 불러올 경우 로딩 상태 관리
    const fetchLecture = async () => {
      setIsLoading(true);
      const lectureData = await getLectures({ category, sort });
      setLectureDatas(lectureData);
      setIsLoading(false);
    };
    fetchLecture();
  }, [category, sort]);

  return (
    <main className="main">
      <section className="page-title border-b border-gray-200 bg-white py-8">
        <div className="page-title__container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">모든 강의</h1>
          <p className="text-base text-gray-600">원하는 강의를 찾아보세요</p>
        </div>
      </section>

      {/* 카테고리 및 sort 영역 */}
      <Categories />

      <section className="lecture-grid py-12">
        <div className="lecture-grid__container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* 총 갯수 영역*/}
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              총 <span className="font-medium text-gray-900">{lectureDatas.length}</span>개의 강의
            </p>
          </div>
          {/* 목록 리스트 */}
          {/* 불러오고있을 경우 로딩 처리, 강의 없을 경우 강의 없습니다 처리 */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {isLoading ? (
              <div>로딩중 ...</div>
            ) : lectureDatas.length === 0 ? (
              <div>강의가 없습니다.</div>
            ) : (
              lectureDatas.map((lecture) => {
                return <LectureCard key={lecture.lectureId} lecture={lecture} />;
              })
            )}
          </div>

          {/* 페이지네이션 */}
          <div className="pagination mt-12 flex items-center justify-center space-x-2">
            <button
              className="cursor-not-allowed rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-400"
              disabled
            >
              이전
            </button>

            <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white">
              1
            </button>
            <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              3
            </button>
            <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              4
            </button>
            <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              5
            </button>

            <button className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              다음
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LectureList;
