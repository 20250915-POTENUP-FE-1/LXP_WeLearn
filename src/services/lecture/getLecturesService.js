import { db } from '../../lib/firebase/config';
import { collection, getCountFromServer, getDocs } from 'firebase/firestore';
import { LECTURELIST_COLLECTION_NAME } from '../../lib/firebase/table/ddl';
import { buildLectureQuery } from '../../utils/filtering';
import { ITEMS_PER_PAGE } from '../../constants/paginationConstants';

export const getLectures = async ({
  category = 'all',
  sort = 'latest',
  limitCount = ITEMS_PER_PAGE,
  startAfterDoc = null,
}) => {
  try {
    const baseRef = collection(db, LECTURELIST_COLLECTION_NAME);

    // 실제 데이터 쿼리
    const dataQuery = buildLectureQuery(baseRef, category, sort, startAfterDoc, limitCount);
    const querySnapshot = await getDocs(dataQuery);
    const lectures = querySnapshot.docs.map((doc) => ({
      lectureId: doc.id,
      ...doc.data(),
    }));

    // 조건에 맞는 전체 개수 쿼리 (
    const countQuery = buildLectureQuery(baseRef, category, sort, null, null, true); // count용 모드
    const snapshotCount = await getCountFromServer(countQuery);

    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    return {
      lectures,
      total: snapshotCount.data().count, // 필터 조건 반영된 총 개수
      lastDoc,
    };
  } catch (error) {
    console.error('[getLectures] Firestore query failed:', error);
    return { lectures: [], total: 0, lastDoc: null };
  }
};
