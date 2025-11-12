import React, { useEffect, useState } from 'react';
import LectureCard from '../../../components/lecture/LectureCard';
import RowCategories from '../../../components/categories/RowCategories.jsx';
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
  const [pageInfo, setPageInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'latest';

  const currentCategory =
    category === 'all'
      ? '전체 강의'
      : CATEGORIES.find((c) => c.key === category)?.name || '전체 강의';

  // 누락된 커서들을 순차적으로 생성
  const prepareCursorsIfNeeded = async (pageNum) => {
    if (pageNum <= 1) return;
    const tempPageInfo = { ...pageInfo };

    for (let i = 1; i < pageNum; i++) {
      if (!tempPageInfo[i]) {
        const { lastDoc } = await getLectures({
          category,
          sort,
          limitCount: ITEMS_PER_PAGE,
          startAfterDoc: tempPageInfo[i - 1] || null,
        });
        if (lastDoc) tempPageInfo[i] = lastDoc;
      }
    }

    setPageInfo(tempPageInfo);
    return tempPageInfo;
  };

  const fetchLecturePage = async (pageNum = 1) => {
    setIsLoading(true);

    const updatedPageInfo = await prepareCursorsIfNeeded(pageNum);

    const { lectures, total, lastDoc } = await getLectures({
      category,
      sort,
      limitCount: ITEMS_PER_PAGE,
      startAfterDoc:
        (updatedPageInfo && updatedPageInfo[pageNum - 1]) || pageInfo[pageNum - 1] || null,
    });

    setLectureDatas(lectures);
    setTotalCount(total);

    // 다음 페이지 커서 저장
    if (lastDoc) {
      setPageInfo((prev) => ({ ...prev, [pageNum]: lastDoc }));
    }

    setIsLoading(false);
  };

  // 카테고리 / 정렬 변경 시 초기화
  useEffect(() => {
    setLectureDatas([]);
    setPageInfo({});
    setCurrentPage(1);
    fetchLecturePage(1);
  }, [category, sort]);

  // 페이지 변경 시 데이터 로드
  useEffect(() => {
    fetchLecturePage(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <>
      <PageSectionHeader title={currentCategory} subTitle="원하는 강의를 찾아보세요" />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
        <RowCategories />
      </div>

      <section className="lecture-grid min-h-[808px] w-full pt-12 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              <span className="mr-1">총</span>
              <span className="font-medium text-gray-900">{totalCount}</span>
              개의 강의
            </p>
          </div>

          <div
            className={`grid grid-cols-1 gap-6 ${
              lectureDatas.length !== 0
                ? 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                : 'gird-cols-1 h-[400px]'
            } items-center`}
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

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </>
  );
};

export default LectureList;
