import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase/config.js';

export async function deleteLectureService(lectureDocId) {
  await deleteDoc(doc(db, 'lecture-list', lectureDocId));
}
