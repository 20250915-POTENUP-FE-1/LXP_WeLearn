import { db } from '../../lib/firebase/config';
import { collection, getCountFromServer, getDocs } from 'firebase/firestore';
import { LECTURELIST_COLLECTION_NAME } from '../../lib/firebase/table/ddl';
import { buildLectureQuery } from '../../utils/filtering';
import { ITEMS_PER_PAGE } from '../../constants/paginationConstants';

export async function getLectureInfitService({
  category = 'all',
  sort = 'latest',
  limitCount = ITEMS_PER_PAGE,
  startAfterDoc = null,
  withCount = false,
}) {
  try {
    const baseRef = collection(db, LECTURELIST_COLLECTION_NAME);

    // 데이터 쿼리
    const dataQuery = buildLectureQuery(baseRef, category, sort, startAfterDoc, limitCount);
    const querySnapshot = await getDocs(dataQuery);

    const lectures = querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        lectureId: doc.id,
      };
    });

    // 다음 커서(없으면 null)
    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] ?? null;
    const hasMore = querySnapshot.size === limitCount; // limit보다 적게 오면 더 없음

    // 총 개수(필요할 때만): 비용 큼
    let total = undefined;
    if (withCount) {
      const countQuery = buildLectureQuery(baseRef, category, sort, null, null, true);
      const snapshotCount = await getCountFromServer(countQuery);
      total = snapshotCount.data().count;
    }

    return { lectures, lastDoc, hasMore, total };
  } catch (error) {
    console.error('[getLectures] Firestore query failed:', error);
    return { lectures: [], lastDoc: null, hasMore: false, total: 0 };
  }
}
