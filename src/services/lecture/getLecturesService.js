// import { db } from '../../lib/firebase/config';
// import { collection, getDocs, query, orderBy } from 'firebase/firestore';
// import { LECTURELIST_COLLECTION_NAME } from '../../lib/firebase/table/ddl';

/**
 *
 * @returns {Array}
 * 전체 강의 목록 [{
 * lectureId: string,
 * title: string,
 * description: string,
 * content: string,
 * thumbnailUrl: string,
 * userId: string,
 * userName: string,
 * category: [string,],
 * level: string,
 * studentCount: number,
 * lectureCreatedAt: string,
 * curriculum: [{}]
 * }]
 */
// export const getLectures = async () => {
//   const snapshot = await getDocs(
//     query(collection(db, LECTURELIST_COLLECTION_NAME), orderBy('lectureCreatedAt', 'desc')),
//   );

//   return snapshot.docs.map((doc) => ({
//     ...doc.data(),
//     lectureCreatedAt: doc.data().lectureCreatedAt.toDate().toLocaleString(),
//   }));
// };
