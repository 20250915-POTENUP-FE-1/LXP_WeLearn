import { collection, addDoc, serverTimestamp, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { lecture_list } from './dummyData.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const initLectureData = async () => {
  lecture_list.forEach((lecture) => {
    addDoc(collection(db, 'lecture-list'), lecture);
  });
};

initLectureData();
