import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase/config.js';
import { ENROLLMENTS_COLLECTION_NAME } from '../../lib/firebase/table/ddl.js';

export async function deleteLectureService(lectureDocId) {
  await deleteDoc(doc(db, ENROLLMENTS_COLLECTION_NAME, lectureDocId));
}
