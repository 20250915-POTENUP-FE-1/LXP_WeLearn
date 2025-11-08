import { db } from '../../lib/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { LECTURELIST_COLLECTION_NAME } from '../../lib/firebase/table/ddl';
import { buildLectureQuery } from '../../utils/filtering';

export const getLectures = async ({ category = 'all', sort = 'latest' }) => {
  try {
    const baseRef = collection(db, LECTURELIST_COLLECTION_NAME);
    const q = buildLectureQuery(baseRef, category, sort);

    const querySnapshot = await getDocs(q);
    const lectures = querySnapshot.docs.map((doc) => ({
      lectureId: doc.id,
      ...doc.data(),
    }));

    return lectures;
  } catch (error) {
    console.error(`[getLectures] Firestore query failed:`, error);
    return [];
  }
};
