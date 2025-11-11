import React, { useEffect, useState } from 'react';
import LectureCard from '../../../components/lecture/LectureCard';
import Categories from '../../../components/categories/categories';
import Pagination from '../../../components/ui/Pagination';
import { useSearchParams } from 'react-router-dom';
import { getLectures } from '../../../services/lecture/getLecturesService';
import CATEGORIES from '../../../constants/categories';
import { ITEMS_PER_PAGE } from '../../../constants/paginationConstants';
import GlobalLoading from '../../../components/loading/GlobalLoading';
import PageSectionHeader from '../../../components/common/PageSectionHeader.jsx';

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
      limitCount: ITEMS_PER_PAGE,
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

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <>
      <PageSectionHeader title={currentCategory} subTitle="원하는 강의를 찾아보세요" />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
        <Categories />
      </div>
      <section className="lecture-grid min-h-[calc(100vh-423px)] pt-12 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* 총 갯수 */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              <span className="mr-1">총</span>
              <span className="font-medium text-gray-900">
                {category === 'all' ? totalCount : lectureDatas.length}
              </span>
              개의 강의
            </p>
          </div>

          {/* 목록 */}
          <div
            className={`grid grid-cols-1 gap-6 ${lectureDatas.length !== 0 ? 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'gird-cols-1 h-[400px]'} items-center`}
          >
            {isLoading ? (
              <GlobalLoading />
            ) : lectureDatas.length === 0 ? (
              <div className="text-center">강의가 없습니다.</div>
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
