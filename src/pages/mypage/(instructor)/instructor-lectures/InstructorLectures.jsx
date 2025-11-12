import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PageSectionHeader from '../../../../components/common/PageSectionHeader.jsx';
import MyPageAsideProfileBar from '../../../../components/mypage/MyPageAsideProfileBar.jsx';
import InstructorLectureCard from '../../../../components/mypage/instructor-lectures/InstructorLectureCard.jsx';
import GlobalLoading from '../../../../components/loading/GlobalLoading.jsx';
import NothingMyLectures from '../../../../components/mypage/my-lectures/NothingMyLectures.jsx';
import { useInfiniteLecture } from '../../../../hooks/lectures/useInfiniteLecture.js';
import CreateBtnLectureCard from '../../../../components/mypage/instructor-lectures/CreateBtnLectureCard.jsx';
import { useGuardedDeleteLecture } from '../../../../hooks/guard/useGuardedDeleteLecture.js';
import ColumnCategories from '../../../../components/categories/ColumnCategories.jsx';

const InstructorLectures = () => {
  const { user } = useSelector((state) => state.auth); // 강사 id 가져오기
  // 무한스크롤 훅 사용
  const { items, isLoading, error, hasMore, sentinelRef, setItems } = useInfiniteLecture({
    category: 'all',
    sort: 'latest',
    pageSize: 8,
    withCount: true,
  });

  // 강사 본인 강의만 필터링
  const filterMyLectures = items.filter((item) => item.userId === user?.uid);

  // 삭제 hook : success > lecture list
  const { handleDelete } = useGuardedDeleteLecture({
    // 삭제가 성공하면 강의 제거
    onSuccess: ({ lectureId }) => {
      const updateMyLectures = filterMyLectures.filter((prev) => {
        return prev.lectureId !== lectureId;
      });
      setItems(updateMyLectures);
    },
  });

  return (
    <div className="flex size-full shrink grow flex-col items-center justify-center">
      {/* 헤더 */}

      <PageSectionHeader title="마이페이지" subTitle="내 강의를 관리하고 학생들과 소통하세요" />

      <section className="size-full max-w-7xl grow px-4 sm:px-6 lg:px-8">
        <div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-4">
          {/* 사이드바 */}
          <MyPageAsideProfileBar>
            <ColumnCategories direction="column" />
          </MyPageAsideProfileBar>

          {/* 메인 콘텐츠 */}
          <div className="content-area lg:col-span-3">
            {/* Quick Actions */}
            <CreateBtnLectureCard />

            {/* 내 강의 목록 */}
            <section className="in-progress-lectures">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">내가 등록한 강의</h2>
                <span className="text-sm text-gray-600">총 {filterMyLectures.length || 0}개</span>
              </div>

              <div className="space-y-4">
                {/* 데이터 표시 */}
                {filterMyLectures.length > 0 ? (
                  filterMyLectures.map((lec) => {
                    return (
                      <InstructorLectureCard
                        key={lec.lectureId}
                        id={lec.lectureId} // 문서 ID
                        lectureId={lec.lectureId} // 필드 강의 ID
                        thumbnailUrl={lec.thumbnailUrl}
                        title={lec.title}
                        userName={lec.userName}
                        studentCount={lec.studentCount}
                        categoryName={lec.categoryName}
                        onDelete={handleDelete} // 삭제 핸들러
                      />
                    );
                  })
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

              {/* 끝 표시 */}
              {!hasMore && filterMyLectures.length > 0 && (
                <div className="py-10 text-center text-gray-600">- 끝 -</div>
              )}
              {/* 로딩 표시 */}
              {isLoading && <GlobalLoading mention="데이터 불러오는 중..." />}
            </section>
          </div>
        </div>
      </section>
      {/* </div> */}
    </div>
  );
};

export default InstructorLectures;
