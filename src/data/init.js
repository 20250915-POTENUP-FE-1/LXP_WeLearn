import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { lecture_list } from './dummyData.js';
import { users } from './userMockData.js';
import { enrollments } from './enrollmentData.js';
import { ENROLLMENTS_COLLECTION_NAME } from '../lib/firebase/table/ddl.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const initLectureData = async () => {
  lecture_list.forEach((lecture) => {
    addDoc(collection(db, 'lecture-list'), lecture);
  });
};

initLectureData();
