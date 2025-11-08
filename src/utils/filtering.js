import { query, where, orderBy } from 'firebase/firestore';
import CATEGORIES from '../constants/categories';

/**
 * Firestore 강의 쿼리 필터링/정렬 유틸 함수
 * @param {object} baseRef - Firestore collection reference
 * @param {string} category - 카테고리 키 ('all' | 'frontend' | 'backend' 등)
 * @param {string} sort - 정렬 기준 ('latest' | 'students')
 * @returns {Query} Firestore Query 객체
 */
export const buildLectureQuery = (baseRef, category = 'all', sort = 'latest') => {
  // category 문자열 → 숫자 변환
  let categoryNum = null;
  if (category !== 'all') {
    const matched = CATEGORIES.find((c) => c.key === category);
    categoryNum = matched ? matched.id : null;
  }

  // 정렬 기준 설정
  const sortField = sort === 'students' ? 'studentCount' : 'lectureCreatedAt';

  // Firestore 쿼리 조합
  if (categoryNum !== null) {
    return query(baseRef, where('category', '==', categoryNum), orderBy(sortField, 'desc'));
  } else {
    return query(baseRef, orderBy(sortField, 'desc'));
  }
};
