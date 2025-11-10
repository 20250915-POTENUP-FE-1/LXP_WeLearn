import { collection, query, where, getCountFromServer } from 'firebase/firestore';
import { db } from '../../lib/firebase/config.js';

/**
 * 활성 수강 인원 수를 반환
 * @param {string} lectureId - 강의 식별자(문서 필드값, 예: "lec36")
 * @returns {Promise<number>}
 */
export async function getEnrollmentCountByLecture(lectureId) {
  const q = query(
    collection(db, 'enrollments'),
    where('lectureId', '==', lectureId),
    where('status', '==', 'active'), // 상태 필드를 쓰지 않는다면 이 where는 제거
  );
  const agg = await getCountFromServer(q);
  return agg.data().count || 0;
}
