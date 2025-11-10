import React, { useEffect, useState } from 'react';
import LectureCard from '../../../components/lecture/LectureCard';
import Categories from '../../../components/categories/categories';
import Pagination from '../../../components/ui/Pagination';
import { useSearchParams } from 'react-router-dom';
import { getLectures } from '../../../services/lecture/getLecturesService';
import CATEGORIES from '../../../constants/categories';

const itemsPerPage = 8; // 페이지당 강의 수

const LectureList = () => {
  const [lectureDatas, setLectureDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({}); // 페이지별 커서 저장
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0); // 전체 강의 개수

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'latest';

  const currentCategory =
    category === 'all'
      ? '전체 강의'
      : CATEGORIES.find((c) => c.key === category)?.name || '전체 강의';

  // 페이지별 강의 로드
  const fetchLecturePage = async (pageNum = 1) => {
    setIsLoading(true);

    const { lectures, total, lastDoc } = await getLectures({
      category,
      sort,
      limitCount: itemsPerPage,
      startAfterDoc: pageInfo[pageNum - 1] || null,
    });

    setLectureDatas(lectures);
    setTotalCount(total);

    // 다음 페이지 커서 저장
    if (lastDoc) {
      setPageInfo((prev) => ({ ...prev, [pageNum]: lastDoc }));
    }

    setIsLoading(false);
  };

  // 카테고리/정렬 변경 시 1페이지부터 다시 조회
  useEffect(() => {
    setLectureDatas([]);
    setPageInfo({});
    setCurrentPage(1);
    fetchLecturePage(1);
  }, [category, sort]);

  // 페이지 변경 시 데이터 불러오기
  useEffect(() => {
    fetchLecturePage(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <>
      <section className="page-title border-b border-gray-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">{currentCategory}</h1>
          <p className="text-base text-gray-600">원하는 강의를 찾아보세요</p>
        </div>
      </section>

      <Categories />

      <section className="lecture-grid min-h-[calc(100vh-423px)] pt-12 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* 총 갯수 */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              총{' '}
              <span className="font-medium text-gray-900">
                {category === 'all' ? totalCount : lectureDatas.length}
              </span>
              개의 강의
            </p>
          </div>

          {/* 목록 */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {isLoading ? (
              <div>로딩중 ...</div>
            ) : lectureDatas.length === 0 ? (
              <div>강의가 없습니다.</div>
            ) : (
              lectureDatas.map((lecture) => (
                <LectureCard key={lecture.lectureId} lecture={lecture} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* 페이지네이션 */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </>
  );
};

export default LectureList;
