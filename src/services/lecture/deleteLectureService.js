import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase/config.js';
import { LECTURES_COLLECTION_NAME } from '../../lib/firebase/table/ddl.js';

export async function deleteLectureService(lectureDocId) {
  await deleteDoc(doc(db, LECTURES_COLLECTION_NAME, lectureDocId));
}
