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

import { useEffect, useState } from 'react';
import { db } from '../../../../lib/firebase/config.js';
import { collection, getDocs } from 'firebase/firestore';
import { LECTURES_COLLECTION_NAME } from '../../../../lib/firebase/table/ddl.js';

const InstructorLectures = () => {
  const { user } = useSelector((state) => state.auth); // 강사 id 가져오기
  const [testItems, setTestItems] = useState([]);

  // 🧪 직접 데이터 가져오기 테스트
  useEffect(() => {
    const fetchTestData = async () => {
      try {
        console.log('🧪 Firestore 직접 조회 시작...');
        const snapshot = await getDocs(collection(db, LECTURES_COLLECTION_NAME));
        const lectures = snapshot.docs.map((doc) => ({
          lectureId: doc.id,
          ...doc.data(),
        }));
        console.log('✅ 조회된 강의:', lectures);
        console.log('📊 강의 개수:', lectures.length);

        if (lectures.length > 0) {
          console.log('📝 첫 번째 강의 샘플:', lectures[0]);
        }

        setTestItems(lectures);
      } catch (error) {
        console.error('❌ Firestore 조회 실패:', error);
      }
    };

    if (user?.uid) {
      fetchTestData();
    }
  }, [user?.uid]);

  // 무한스크롤 훅 사용
  const { items, isLoading, error, hasMore, sentinelRef, setItems } = useInfiniteLecture({
    category: 'all',
    sort: 'latest',
    pageSize: 8,
    withCount: true,
  });

  console.log('📊 Hook Items:', items);
  console.log('🧪 Test Items:', testItems);

  // 강사 본인 강의만 필터링
  // const filterMyLectures = items.filter((item) => item.userId === user?.uid);

  // 🧪 테스트 데이터 사용
  const dataToUse = testItems.length > 0 ? testItems : items;
  const filterMyLectures = dataToUse.filter((item) => item.userId === user?.uid);

  console.log('✅ 내 강의:', filterMyLectures);

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
            <p className="text-center text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</p>
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
  );
};

export default InstructorLectures;
