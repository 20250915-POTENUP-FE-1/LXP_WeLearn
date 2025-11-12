import React, { useCallback } from 'react';
import PageSectionHeader from '../../../../components/common/PageSectionHeader.jsx';
import { useSearchParams } from 'react-router-dom';
import MyPageAsideProfileBar from '../../../../components/mypage/MyPageAsideProfileBar.jsx';
import { EnrolledCard } from '../../../../components/mypage/my-lectures/EnrolledCard.jsx';
import GlobalLoading from '../../../../components/loading/GlobalLoading.jsx';
import NothingMyLectures from '../../../../components/mypage/my-lectures/NothingMyLectures.jsx';
import ColumnCategories from '../../../../components/categories/ColumnCategories.jsx';
import { useInfiniteList } from '../../../../hooks/common/useInfiniteList.js';
import { getMyEnrolledLecturesService } from '../../../../services/mypage/getMyEnrolledLecturesService.js';
import { useSelector } from 'react-redux';

const MyEnrolledLectures = () => {
  const [searchParams] = useSearchParams();
  const { user } = useSelector((s) => s.auth);
  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'latest';

  const fetchLectures = useCallback(
    (p) =>
      getMyEnrolledLecturesService({
        userId: user.uid, // 꼭 필요한 것만 캡처
        category,
        sort,
        ...p,
      }),
    [user?.uid, category, sort], // 의존성 최소화
  );

  const { items, isLoading, error, hasMore, total, sentinelRef } = useInfiniteList({
    category,
    sort,
    pageSize: 10,
    withCount: true,
    fetcher: fetchLectures,
    enabled: !!user?.uid,
  });

  return (
    <>
      <PageSectionHeader title="마이페이지" subTitle="내 학습 현황과 정보를 관리하세요" />

      <section className="size-full max-w-7xl grow px-4 sm:px-6 lg:px-8">
        <div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-4">
          <MyPageAsideProfileBar>
            {/*<nav className="mt-5 rounded-lg bg-white p-6 shadow-md">*/}
            {/*  <ColumnCategories />*/}
            {/*</nav>*/}
          </MyPageAsideProfileBar>

          <div className="content-area lg:col-span-3">
            <section className="in-progress-lectures">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">수강 중인 강의</h2>
                <p>총 {total}개의 강의</p>
              </div>

              {/* <!-- Lecture List --> */}
              <div className="space-y-4">
                {items.length !== 0 ? (
                  items.map((item) => <EnrolledCard key={item.enrollmentId} {...item} />)
                ) : (
                  <NothingMyLectures />
                )}
                {error && <p>데이터 불러오는데 에러 발생</p>}
              </div>
            </section>
          </div>
        </div>
      </section>
      {hasMore ? (
        <div ref={sentinelRef} className="h-10" />
      ) : (
        items.length > 0 && <div className="py-10 text-center text-2xl text-gray-700">- 끝 -</div>
      )}
      {isLoading && <GlobalLoading mention="데이터 불러오는 중..." />}
    </>
  );
};

export default MyEnrolledLectures;
