import React from 'react';
import PageSectionHeader from '../../../../components/common/PageSectionHeader.jsx';
import { useSearchParams } from 'react-router-dom';
import { useInfiniteLectures } from '../../../../hooks/lectures/useInfiniteLectures.js';
import MyPageAsideProfileBar from '../../../../components/mypage/MyPageAsideProfileBar.jsx';
import MyLectureCard from '../../../../components/mypage/my-lectures/MyLectureCard.jsx';
import GlobalLoading from '../../../../components/loading/GlobalLoading.jsx';
import NothingMyLectures from '../../../../components/mypage/my-lectures/NothingMyLectures.jsx';
import Categories from '../../../../components/categories/Categories.jsx';

const MyLectures = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'latest';

  const { items, isLoading, error, hasMore, total, sentinelRef, retry } = useInfiniteLectures({
    category,
    sort,
    pageSize: 10,
    withCount: true,
  });

  return (
    <>
      <PageSectionHeader title="마이페이지" subTitle="내 학습 현황과 정보를 관리하세요" />

      <section className="size-full max-w-7xl grow px-4 sm:px-6 lg:px-8">
        <div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-4">
          <MyPageAsideProfileBar>
            <Categories direction="column" />
          </MyPageAsideProfileBar>

          <div className="content-area lg:col-span-3">
            <section className="in-progress-lectures">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">수강 중인 강의</h2>
                <div>총 {total}개의 강의</div>
              </div>

              {/* <!-- Lecture List --> */}
              <section className="space-y-4">
                {items.length !== 0 ? (
                  items.map((item) => <MyLectureCard key={item.lectureId} {...item} />)
                ) : (
                  <NothingMyLectures />
                )}
                {error && <p>데이터 불러오는데 에러 발생</p>}
              </section>
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

export default MyLectures;
