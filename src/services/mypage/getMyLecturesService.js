import { db } from '../../lib/firebase/config';
import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import { LECTURES_COLLECTION_NAME } from '../../lib/firebase/table/ddl';

export async function getMyLecturesService({ userId, limitCount = 20, startAfterDoc = null }) {
  try {
    if (!userId) {
      throw new Error('userId 필요함');
    }

    const baseRef = collection(db, LECTURES_COLLECTION_NAME);

    // 최신순으로 보여주기
    const conditions = [where('userId', '==', userId), orderBy('lectureCreatedAt', 'desc')];

    if (startAfterDoc) conditions.push(startAfter(startAfterDoc));
    if (limitCount) conditions.push(limit(limitCount));

    const dataQuery = query(baseRef, ...conditions);
    const querySnapshot = await getDocs(dataQuery);

    const lectures = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      lectureId: doc.id,
    }));

    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] ?? null;
    const hasMore = querySnapshot.size === limitCount;

    return { lectures, lastDoc, hasMore };
  } catch (error) {
    console.error('데이터 불러오기 실패:', error);
    return { lectures: [], lastDoc: null, hasMore: false };
  }
}
