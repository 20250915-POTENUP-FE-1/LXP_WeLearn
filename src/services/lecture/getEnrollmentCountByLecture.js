import { collection, query, where, getCountFromServer } from 'firebase/firestore';
import { db } from '../../lib/firebase/config.js';

/**
 * 수강 중인 인원 수를 반환
 * @param {string} lectureId - 강의 식별자(문서 필드값, 예: "lec36")
 * @returns {Promise<number>}
 */
export async function getEnrollmentCountByLecture(lectureId) {
  const q = query(collection(db, 'enrollments'), where('lectureId', '==', lectureId));
  const agg = await getCountFromServer(q);
  // console.log(agg.data().count);
  return agg.data().count || 0;
}
