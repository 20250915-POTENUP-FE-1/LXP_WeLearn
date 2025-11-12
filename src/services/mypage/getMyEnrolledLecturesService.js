// services/enrollment/getMyEnrolledLecturesService.js
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  getCountFromServer,
  documentId,
} from 'firebase/firestore';
import { db } from '../../lib/firebase/config.js';
import {
  ENROLLMENTS_COLLECTION_NAME,
  LECTURES_COLLECTION_NAME,
} from '../../lib/firebase/table/ddl.js';
import CATEGORIES from '../../constants/categories.js';

const chunk = (arr, size) => {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

/**
 * user가 신청한 강의 목록(수강신청 + 강의 상세 join)
 */
export async function getMyEnrolledLecturesService({
  userId,
  limitCount = 20,
  startAfterDoc = null,
  withCount = false,
  status, // 선택: 'ENROLLED' 등 상태 필터
  category = 'all',
  sort = 'latest',
}) {
  const baseRef = collection(db, ENROLLMENTS_COLLECTION_NAME);

  // 필요한 필터/정렬 구성 (예: 상태 필터, 최근 신청 순)
  const parts = [where('userId', '==', userId)];
  if (status) parts.push(where('status', '==', status));
  parts.push(orderBy('enrolledAt', 'desc'), limit(limitCount + 1)); // +1은 hasMore 판단용
  if (startAfterDoc) parts.push(startAfter(startAfterDoc));

  const dataQuery = query(baseRef, ...parts);
  const snap = await getDocs(dataQuery);
  const docs = snap.docs;

  const hasMore = docs.length > limitCount;
  const pageDocs = hasMore ? docs.slice(0, limitCount) : docs;
  const lastDoc = pageDocs.length ? pageDocs[pageDocs.length - 1] : null;

  // 총 개수(옵션) — 첫 페이지에서만 사용 권장
  let total;
  if (withCount && !startAfterDoc) {
    const countQ = status
      ? query(
          collection(db, ENROLLMENTS_COLLECTION_NAME),
          where('userId', '==', userId),
          where('status', '==', status),
        )
      : query(collection(db, ENROLLMENTS_COLLECTION_NAME), where('userId', '==', userId));
    const countSnap = await getCountFromServer(countQ);
    total = countSnap.data().count;
  }

  // lectureId 모아서 강의 문서 batch 조회 (IN 쿼리는 한 번에 최대 10개)
  const lectureIds = pageDocs.map((d) => d.data().lectureId).filter(Boolean);
  const chunks = chunk(lectureIds, 10);

  const lectureMap = {};
  let categoryNum = null;
  if (category !== 'all') {
    const matched = CATEGORIES.find((c) => c.key === category);
    categoryNum = matched ? matched.id : null;
  }
  for (const ids of chunks) {
    if (ids.length === 0) continue;
    const lsnap = await getDocs(
      query(collection(db, `${LECTURES_COLLECTION_NAME}`), where(documentId(), 'in', ids)),
    );
    lsnap.forEach((ld) => {
      lectureMap[ld.id] = { id: ld.id, ...ld.data() };
    });
  }

  // join 결과 합치기
  const items = pageDocs.map((d) => {
    const e = d.data(); // { userId, lectureId, enrolledAt, status, reviews }
    return {
      enrollmentId: d.id,
      ...e,
      lecture: lectureMap[e.lectureId] ?? null, // 강의가 삭제됐을 수 있으니 null 케이스 대비
    };
  });

  return { items, lastDoc, hasMore, total };
}
