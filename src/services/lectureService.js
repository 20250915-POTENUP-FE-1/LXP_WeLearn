import { db } from '../lib/firebase/config.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

const LECTURE_LIST = 'lecture-list';

/**
 * Firestore의 lectureId 필드로 문서를 조회하기
 * @param {string} lectureId - 강의의 lectureId 필드 값
 * @returns {Object|null} 강의 객체
 */
export const getLectureItem = async (lectureId) => {
  try {
    const q = query(collection(db, LECTURE_LIST), where('lectureId', '==', lectureId));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(`강의 ID를 찾을 수 없음 : ${lectureId}`);
      return null;
    }

    // Firestore 문서 첫 번째만 반환
    const docSnap = querySnapshot.docs[0];
    return { id: docSnap.id, ...docSnap.data() };
  } catch (error) {
    console.error('강의 데이터를 불러오는 중 오류 발생:', error);
    return null;
  }
};
