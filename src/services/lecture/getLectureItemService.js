import { db } from '../../lib/firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { LECTURELIST_COLLECTION_NAME } from '../../lib/firebase/table/ddl';

/**
 * Firestore의 lectureId 필드로 문서를 조회하기
 * @param {string} lectureId - 강의의 lectureId 필드 값
 * @returns {Object|null} 강의 객체
 */

export const getLectureItemService = async (lectureId) => {
  try {
    const baseRef = collection(db, LECTURELIST_COLLECTION_NAME);
    const q = query(baseRef, where('lectureId', '==', lectureId));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // console.log(`강의 ID를 찾을 수 없음: ${lectureId}`);
      return null;
    }

    // Firestore 문서 첫 번째만 반환
    const docSnap = querySnapshot.docs[0];
    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  } catch (error) {
    console.error('[getLectureItemService] Firestore query failed:', error);
    return null;
  }
};
