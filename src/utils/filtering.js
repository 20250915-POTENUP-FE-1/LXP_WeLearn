import { query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import CATEGORIES from '../constants/categories';

export const buildLectureQuery = (
  baseRef,
  category = 'all',
  sort = 'latest',
  startAfterDoc = null,
  limitCount = 8,
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
