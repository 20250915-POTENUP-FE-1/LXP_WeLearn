import { db } from '../../lib/firebase/config';
import { collection, getCountFromServer, getDocs } from 'firebase/firestore';
import { LECTURES_COLLECTION_NAME } from '../../lib/firebase/table/ddl';
import { buildLectureQuery } from '../../utils/filtering';
import { ITEMS_PER_PAGE } from '../../constants/paginationConstants';

export const getLectures = async ({
  category = 'all',
  sort = 'latest',
  limitCount = ITEMS_PER_PAGE,
  startAfterDoc = null,
}) => {
  try {
    const baseRef = collection(db, LECTURES_COLLECTION_NAME);

    // limitCount가 null일 경우 전체 데이터 불러오기
    const dataQuery = buildLectureQuery(
      baseRef,
      category,
      sort,
      startAfterDoc,
      limitCount || undefined,
    );

    const querySnapshot = await getDocs(dataQuery);
    const lectures = querySnapshot.docs.map((doc) => ({
      lectureId: doc.id,
      ...doc.data(),
    }));

    const countQuery = buildLectureQuery(baseRef, category, sort, null, null, true);
    const snapshotCount = await getCountFromServer(countQuery);

    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    return {
      lectures,
      total: snapshotCount.data().count,
      lastDoc,
    };
  } catch (error) {
    console.error('[getLectures] Firestore query failed:', error);
    return { lectures: [], total: 0, lastDoc: null };
  }
};
