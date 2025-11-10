import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { lecture_list } from './dummyData.js';
import { users } from './userMockData.js';
import { enrollments } from './enrollmentData.js';
import { ENROLLMENTS_COLLECTION_NAME } from '../lib/firebase/table/ddl.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const initLectureData = async () => {
  enrollments.forEach((lecture) => {
    addDoc(collection(db, ENROLLMENTS_COLLECTION_NAME), lecture);
  });
};

initLectureData();
