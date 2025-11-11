import { buildUsers } from './dummy/users.js';
import { collection, doc, writeBatch, getFirestore, Timestamp } from 'firebase/firestore';
import { createRandomLecture } from './dummy/lectures.js';
import {
  ENROLLMENTS_COLLECTION_NAME,
  LECTURES_COLLECTION_NAME,
  USERS_COLLECTION_NAME,
} from '../lib/firebase/table/ddl.js';
import { randomNumber } from './utils/randomNumber.js';
import { shuffle } from './utils/shuffle.js';
import { createRandomEnrollment } from './dummy/enrollments.js';
import { initializeApp } from 'firebase/app';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const DEFAULT_PW = '12341234';

async function init(count = 50) {
  console.log('초기화 진행 중...');
  const users = buildUsers(count);
  const userColRef = collection(db, USERS_COLLECTION_NAME);

  console.log(`유저 가입 ${count}명...`);
  try {
    let batch = writeBatch(db);
    let ops = 0;

    let usersInfo = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];

      // 1) Auth 먼저 생성 (이미 있으면 로그인해서 uid만 확보)
      let cred;
      try {
        cred = await createUserWithEmailAndPassword(auth, user.email, DEFAULT_PW);
      } catch (e) {
        console.error('Auth 생성 실패:', user.email, e);
        continue; // 이 사용자 스킵
      }

      const { uid, metadata } = cred.user;
      const lastLoginAt = metadata?.lastSignInTime
        ? Timestamp.fromDate(new Date(metadata.lastSignInTime))
        : null;

      // 2) Firestore users 문서 생성 (문서ID = uid 로 고정!)
      const docRef = doc(userColRef, uid);

      const payload = {
        ...user, // { userName, email, role, userCreatedAt: Date | Timestamp }
        userId: uid, // 식별자(=Auth uid)
      };

      usersInfo.push(payload);
      console.log(`[${chalk.bold.blue(user.userName)}]님이 가입 하셨습니다.`);

      batch.set(docRef, payload, { merge: true });
      ops++;

      if (ops % 400 === 0) {
        await batch.commit();
        batch = writeBatch(db);
      }
    }

    console.log(`[${chalk.bold.yellow(`${count} 전원 회원 가입 완료`)}]`);

    const lecturesColRef = collection(db, LECTURES_COLLECTION_NAME);
    let lecturesInfo = [];

    console.log(`강의 제작 시작`);

    for (let i = 0; i < usersInfo.length; i++) {
      const userId = usersInfo[i].userId;
      if (users[i].role === 'INSTRUCTOR') {
        const makeRandom = randomNumber(1, 10);
        for (let j = 0; j < makeRandom; j++) {
          const lecture = createRandomLecture(userId, usersInfo[i].userName);
          const docRef = doc(lecturesColRef);
          const lectureId = docRef.id;

          const payload = { ...lecture, lectureId, userId };
          lecturesInfo.push(payload);

          console.log(
            `[${chalk.bold.green(usersInfo[i].userName)}]님이 ${lecture.title} 강의 제작`,
          );

          batch.set(docRef, payload);

          ops++;
          if (ops % 400 === 0) {
            await batch.commit();
            batch = writeBatch(db);
          }
        }
      }
    }

    console.log(`[${chalk.bold.yellow('강의 제작 완료')}`);

    const enrollmentColRef = collection(db, ENROLLMENTS_COLLECTION_NAME);
    let enrollmentsInfo = [];

    console.log(`수강 신청 시작`);

    for (let i = 0; i < lecturesInfo.length; i++) {
      const lectureId = lecturesInfo[i].lectureId;
      const randomCount = randomNumber(0, 12);
      // 유저는 중복이 되면 안됌
      const selectedUsers = shuffle(lecturesInfo).slice(0, randomCount);

      for (let k = 0; k < selectedUsers.length; k++) {
        const userId = selectedUsers[k].userId;
        const enrollment = createRandomEnrollment();
        const docRef = doc(enrollmentColRef); // 여기서 Firestore가 랜덤 문서 ID 생성 (userId 대용)
        const enrollmentId = docRef.id;

        const payload = { ...enrollment, lectureId, userId, enrollmentId };

        enrollmentsInfo.push(payload);

        console.log(
          `[${chalk.bold.cyan(selectedUsers[k].userName)}]님이 ${lecturesInfo[i].title} 수강 신청`,
        );

        batch.set(docRef, payload);

        ops++;
        // 안전하게 400건 단위로 커밋(한 배치 최대 500 제한 여유)
        if (ops % 400 === 0) {
          await batch.commit();
          batch = writeBatch(db);
        }
      }
      console.log(`수강 신청 완료`);
    }

    if (ops % 400 !== 0) await batch.commit();

    console.log(`
시드 완료
 -> 생성 된 usersCount - ${count}건
 -> 생성 된 lecturesCount - ${lecturesInfo.length}건
 -> 생성 된 enrollmentsCount - ${enrollmentsInfo.length}건
   `);
  } catch (error) {
    console.error(error);
  }
}

init(30)
  .then(() => {
    console.log(chalk.bold.green('시드 데이터 생성 완료'));
    process.exit(0); // 성공 시 정상 종료
  })
  .catch((error) => {
    console.error(chalk.red('오류 발생:'), error);
    process.exit(1); //
  });
