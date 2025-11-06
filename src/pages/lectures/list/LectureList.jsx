import React, { useEffect, useState } from 'react';
import LectureCard from '../../../components/ui/LectureCard';
// import { getLectures } from '../../../services/lecture/getLecturesService';
import { lecture_list } from '../../../types/init';

const LectureList = () => {
  const [lecturedDatas, setLectureDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(lecturedDatas);
  useEffect(() => {
    // const fetchLecture = async () => {
    //   setIsLoading(true);
    //   const lectureData = await getLectures();
    //   setCardData(lectureData);
    //   setIsLoading(false);
    // };
    // fetchLecture();
    setLectureDatas(lecture_list);
  }, []);
  return (
    lecturedDatas.length && (
      <main className="main">
        {/* <!-- ============================================ --> */}
        {/* <!-- Page Title Section --> */}
        {/* <!-- Description: 페이지 제목 영역 --> */}
        {/* <!-- ============================================ --> */}
        <section className="page-title border-b border-gray-200 bg-white py-8">
          <div className="page-title__container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">모든 강의</h1>
            <p className="text-base text-gray-600">원하는 강의를 찾아보세요</p>
          </div>
        </section>

        {/* <!-- ============================================ --> */}
        {/* <!-- Filter and Sort Section --> */}
        {/* <!-- Description: 필터 및 정렬 옵션 --> */}
        {/* <!-- ============================================ --> */}
        <section className="filter-section border-b border-gray-200 bg-white py-4">
          <div className="filter-section__container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* <!-- Filter Buttons --> */}
              <div className="filter-buttons flex flex-wrap items-center gap-2">
                <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white">
                  전체
                </button>
                <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200">
                  개발
                </button>
                <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200">
                  디자인
                </button>
                <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200">
                  비즈니스
                </button>
                <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200">
                  마케팅
                </button>
              </div>

              {/* <!-- Sort Dropdown --> */}
              <div className="sort-dropdown">
                <select className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-gray-900 focus:outline-none">
                  <option>최신순</option>
                  <option>인기순</option>
                  <option>평점순</option>
                  <option>수강생순</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- ============================================ --> */}
        {/* <!-- Lecture Grid Section --> */}
        {/* <!-- Description: 강의 카드 그리드 --> */}
        {/* <!-- ============================================ --> */}
        <section className="lecture-grid py-12">
          <div className="lecture-grid__container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* <!-- Result Count --> */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                총 <span className="font-medium text-gray-900">248</span>개의 강의
              </p>
            </div>

            {/* <!-- Grid Container --> */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {/* {isLoading ? (
              <div>로딩중 ...</div>
            ) : (
            )} */}
              {lecturedDatas.map((lecture) => {
                return <LectureCard key={lecture.lectureId} lecture={lecture} />;
              })}
            </div>

            {/* <!-- ============================================ --> */}
            {/* <!-- Pagination --> */}
            {/* <!-- ============================================ --> */}
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
    )
  );
};

export default LectureList;
