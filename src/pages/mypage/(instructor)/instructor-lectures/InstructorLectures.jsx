import { useSelector } from 'react-redux';
import CreateBtnLectureCard from '../../../../components/mypage/instructor-lectures/CreateBtnLectureCard.jsx';
import InstructorLectureCard from '../../../../components/mypage/instructor-lectures/InstructorLectureCard.jsx';
import GlobalLoading from '../../../../components/loading/GlobalLoading.jsx';
import NothingMyLectures from '../../../../components/mypage/my-lectures/NothingMyLectures.jsx';
import { useInfiniteList } from '../../../../hooks/common/useInfiniteList.js';
import { getMyLecturesService } from '../../../../services/mypage/getMyLecturesService.js';
import { useGuardedDeleteLecture } from '../../../../hooks/guard/useGuardedDeleteLecture.js';
import React, { useCallback } from 'react';

const InstructorLectures = () => {
  const { user } = useSelector((state) => state.auth);

  // 1) 내가 등록한 강의 fetcher
  const fetchMyLectures = useCallback(
    (p) =>
      getMyLecturesService({
        userId: user.uid, // 필요한 것만 캡처
        ...p, // { limitCount, ... } 같은 페이징 파라미터
      }),
    [user?.uid],
  );

  // 2) 공용 무한스크롤 훅 사용
  const {
    items,
    isLoading,
    error,
    hasMore,
    total,
    sentinelRef,
    setItems, // useInfiniteList에서 리턴 받아옴
  } = useInfiniteList({
    pageSize: 8,
    withCount: true, // 총 개수
    fetcher: fetchMyLectures,
    enabled: !!user?.uid, // user가 없을 땐 호출 안 함
  });

  // 3) 삭제 훅: 성공 시 리스트에서 제거
  const { handleDelete } = useGuardedDeleteLecture({
    onSuccess: ({ lectureId }) => {
      // 삭제 성공하면 items 안에서 해당 lectureId 제거
      setItems?.((prev) => prev.filter((lec) => (lec.lectureId === lectureId ? false : true)));
    },
  });

  return (
    <div className="content-area lg:col-span-3">
      {/* 새로운 강의 생성 버튼 */}
      <CreateBtnLectureCard />

      {/* 내가 등록한 강의 목록 */}
      <section className="in-progress-lectures">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">내가 등록한 강의</h2>
          <span className="text-sm text-gray-600">총 {total ?? items.length}개</span>
        </div>

        <div className="space-y-4">
          {items.length > 0 ? (
            items.map((lec) => (
              <InstructorLectureCard
                key={lec.lectureId}
                lectureId={lec.lectureId}
                thumbnailUrl={lec.thumbnailUrl}
                title={lec.title}
                userName={lec.userName}
                studentCount={lec.studentCount}
                categoryName={lec.categoryName}
                onDelete={handleDelete}
              />
            ))
          ) : !isLoading && !error ? (
            <NothingMyLectures />
          ) : null}

          {error && (
            <p className="text-center text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</p>
          )}
        </div>

        {/* 무한 스크롤 센티넬 */}
        {hasMore && <div ref={sentinelRef} className="h-10" />}

        {/* 끝 표시 */}
        {!hasMore && items.length > 0 && (
          <div className="py-10 text-center text-gray-600">- 끝 -</div>
        )}

        {/* 로딩 표시 */}
        {isLoading && <GlobalLoading mention="데이터 불러오는 중..." />}
      </section>
    </div>
  );
};

export default InstructorLectures;
