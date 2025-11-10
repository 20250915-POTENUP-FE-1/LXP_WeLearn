// src/pages/mypage/(instructor)/instructor-lectures/InstructorLectures.jsx

import React from 'react';
import { useSelector } from 'react-redux';
import PageSectionHeader from '../../../../components/common/PageSectionHeader.jsx';
import MyPageAsideProfileBar from '../../../../components/mypage/MyPageAsideProfileBar.jsx';
import Categories from '../../../../components/categories/Categories.jsx';
import InstructorLectureCard from '../../../../components/mypage/instructor-lectures/InstructorLectureCard.jsx';
import GlobalLoading from '../../../../components/loading/GlobalLoading.jsx';
import NothingMyLectures from '../../../../components/mypage/my-lectures/NothingMyLectures.jsx';
import { useInfiniteLectures } from '../../../../hooks/lectures/useInfiniteLectures.js';
import CreateBtnLectureCard from '../../../../components/mypage/instructor-lectures/CreateBtnLectureCard.jsx';

const InstructorLectures = () => {
  const { user } = useSelector((state) => state.auth); // 강사 uid 가져오기

  const { items, isLoading, error, hasMore, sentinelRef, total } = useInfiniteLectures({
    category: 'all',
    sort: 'latest',
    pageSize: 8,
    withCount: true,
  });

  // 강사 본인 강의만 필터링
  const myLectures = items.filter((item) => item.userId === user?.uid);

  return (
    <main className="main py-8">
      <div className="main__container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <PageSectionHeader title="마이페이지" subTitle="내 강의를 관리하고 학생들과 소통하세요" />

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* 사이드바 */}
          <MyPageAsideProfileBar>
            <Categories direction="column" />
          </MyPageAsideProfileBar>

          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-3">
            {/* Quick Actions */}
            <CreateBtnLectureCard />

            {/* 내 강의 목록 */}
            <section>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">내가 등록한 강의</h2>
                <span className="text-sm text-gray-600">총 {myLectures.length || 0}개</span>
              </div>

              <div className="space-y-4">
                {/* 데이터 표시 */}
                {myLectures.length > 0 ? (
                  myLectures.map((lec) => (
                    <InstructorLectureCard
                      key={lec.lectureId}
                      id={lec.lectureId}
                      thumbnailUrl={lec.thumbnailUrl}
                      title={lec.title}
                      userName={lec.userName}
                      studentCount={lec.studentCount}
                      rating={lec.rating}
                      reviewCount={lec.reviewCount}
                      categoryName={lec.categoryName}
                    />
                  ))
                ) : !isLoading && !error ? (
                  <NothingMyLectures />
                ) : null}

                {/* 에러 처리 */}
                {error && (
                  <p className="text-center text-red-500">
                    데이터를 불러오는 중 오류가 발생했습니다.
                  </p>
                )}
              </div>

              {/* 무한 스크롤 센티넬 */}
              {hasMore && <div ref={sentinelRef} className="h-10" />}

              {/* 로딩 표시 */}
              {isLoading && <GlobalLoading mention="데이터 불러오는 중..." />}

              {/* 끝 표시 */}
              {!hasMore && myLectures.length > 0 && (
                <div className="py-10 text-center text-gray-600">- 끝 -</div>
              )}
            </section>
          </div>
        </section>
      </div>
    </main>
  );
};

export default InstructorLectures;
