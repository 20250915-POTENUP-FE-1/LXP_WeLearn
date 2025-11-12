import { db } from '../../lib/firebase/config';
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import {
  ENROLLMENTS_COLLECTION_NAME,
  LECTURES_COLLECTION_NAME,
} from '../../lib/firebase/table/ddl';
import { buildLectureQuery } from '../../utils/filtering';
import { ITEMS_PER_PAGE } from '../../constants/paginationConstants';
import CATEGORIES from '../../constants/categories.js';

export async function getLectureInfitService({
  category = 'all',
  sort = 'latest',
  limitCount = ITEMS_PER_PAGE,
  startAfterDoc = null,
  withCount = false,
}) {
  try {
    const baseRef = collection(db, ENROLLMENTS_COLLECTION_NAME);

    // 데이터 쿼리
    const dataQuery = buildLectureQuery(baseRef, category, sort, startAfterDoc, limitCount, [[]]);
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

export const buildMyLectureQuery = (
  baseRef,
  category = 'all',
  sort = 'latest',
  startAfterDoc = null,
  limitCount = ITEMS_PER_PAGE,
  isCountQuery = false,
) => {
  let categoryNum = null;
  if (category !== 'all') {
    const matched = CATEGORIES.find((c) => c.key === category);
    categoryNum = matched ? matched.id : null;
  }

  const sortField = sort === 'students' ? 'studentCount' : 'lectureCreatedAt';

  const conditions = [];
  if (categoryNum !== null) conditions.push(where('category', '==', categoryNum));
  conditions.push(orderBy(sortField, 'desc'));

  // count 쿼리는 limit/startAfter 제외
  if (isCountQuery) return query(baseRef, ...conditions);

  if (startAfterDoc) conditions.push(startAfter(startAfterDoc));
  if (limitCount) conditions.push(limit(limitCount));

  return query(baseRef, ...conditions);
};
