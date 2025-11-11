import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import {
  ENROLLMENTS_COLLECTION_NAME,
  LECTURES_COLLECTION_NAME,
  USERS_COLLECTION_NAME,
} from '../lib/firebase/table/ddl.js';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import admin from 'firebase-admin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Admin SDK 초기화 (서비스 계정)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.VITE_FIREBASE_PROJECT_ID,
      client_email: process.env.VITE_FIREBASE_CLIENT_EMAIL,
      private_key: process.env.VITE_FIREBASE_PRIVATE_KEY,
    }),
  });
}

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function clearAuthAll() {
  console.log('🗑️ Authentication 사용자 삭제 시작');

  const auth = admin.auth();
  let nextPageToken = undefined;
  let totalDeleted = 0;

  do {
    // 최대 1000명씩 조회
    const list = await auth.listUsers(1000, nextPageToken);
    const uids = list.users.map((u) => u.uid);

    if (uids.length) {
      const res = await auth.deleteUsers(uids); // 일괄 삭제(최대 1000)
      totalDeleted += res.successCount;

      console.log(
        `   🧹 ${res.successCount}명 삭제, 실패 ${res.failureCount}명${
          res.failureCount ? ' (일부 실패는 권한/상태 이슈일 수 있음)' : ''
        }`,
      );

      if (res.errors?.length) {
        for (const e of res.errors) {
          console.log(`      ⚠️ [index=${e.index}] ${e.error?.message}`);
        }
      }
    }

    nextPageToken = list.pageToken; // 다음 페이지 토큰
  } while (nextPageToken);

  console.log(`✅ Authentication 삭제 완료 (총 ${totalDeleted}명)`);
}

async function clearCollection(colName) {
  const colRef = collection(db, colName);
  const snapshot = await getDocs(colRef);

  console.log(`🗑️ ${colName} 컬렉션 문서 ${snapshot.size}건 삭제 시작`);

  let count = 0;
  for (const d of snapshot.docs) {
    await deleteDoc(doc(db, colName, d.id));
    count++;
    console.log(`   🧹 ${count}/${snapshot.size} - ${colName}/${d.id} 삭제됨`);
  }

  console.log(`✅ ${colName} 삭제 완료`);
}

async function clearAll() {
  await clearAuthAll();
  await clearCollection(USERS_COLLECTION_NAME);
  await clearCollection(LECTURES_COLLECTION_NAME);
  await clearCollection(ENROLLMENTS_COLLECTION_NAME);
}

clearAll()
  .then(() => console.log('모든 데이터 삭제 완료'))
  .then(() => {
    process.exit(0); // ✅ 성공 시 정상 종료
  })
  .catch((error) => {
    console.error(chalk.red('❌ 오류 발생:'), error);
    process.exit(1); // ❌ 실패 시 에러 코드로 종료
  });
