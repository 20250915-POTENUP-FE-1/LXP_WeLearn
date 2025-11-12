// services/lecture/getLectureStatsByLecture.js
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase/config.js';
import { ENROLLMENTS_COLLECTION_NAME } from '../../lib/firebase/table/ddl.js';

/**
 * 특정 강의의 통계 데이터를 한 번에 조회
 * @param {string} lectureId - 강의 식별자
 * @returns {Promise<{enrollmentCount: number, reviewCount: number, avgRating: number}>}
 */
export async function getLectureStatsByLecture(lectureId) {
  if (!lectureId) {
    return { enrollmentCount: 0, reviewCount: 0, avgRating: 0 };
  }

  try {
    // 한 번의 쿼리로 모든 데이터 가져오기
    const q = query(
      collection(db, ENROLLMENTS_COLLECTION_NAME),
      where('lectureId', '==', lectureId),
    );

    const snapshot = await getDocs(q);

    let enrollmentCount = 0;
    let totalRating = 0;
    let reviewCount = 0;

    snapshot.forEach((doc) => {
      // 수강 인원 카운트
      enrollmentCount++;

      // 리뷰 데이터 처리
      const reviews = doc.data()?.reviews;

      if (reviews && typeof reviews === 'object' && !Array.isArray(reviews)) {
        const { rating } = reviews;
        // 유효한 별점인 경우
        if (typeof rating === 'number' && Number.isFinite(rating)) {
          totalRating += rating;
          reviewCount++;
        }
      }
    });

    // 평균 별점 계산
    const avgRating = reviewCount > 0 ? Number((totalRating / reviewCount).toFixed(1)) : 0;

    return { enrollmentCount, reviewCount, avgRating };
  } catch (error) {
    console.error('강의 메타데이터 조회 실패:', error);
    return { enrollmentCount: 0, reviewCount: 0, avgRating: 0 };
  }
}
