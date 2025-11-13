import { db } from '../../lib/firebase/config';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { LECTURES_COLLECTION_NAME } from '../../lib/firebase/table/ddl';
import { v4 as uuidv4 } from 'uuid';

export const registLectureService = async ({ userId, userName, formData }) => {
  try {
    // ✅ 컬렉션 참조 생성
    const baseRef = collection(db, LECTURES_COLLECTION_NAME);

    // ✅ Firestore가 자동으로 새 문서 ID 생성
    const newDocRef = doc(baseRef);
    const lectureId = newDocRef.id; // ← 자동 생성된 문서 ID

    // ✅ 각 lesson에 UUID 부여
    const curriculumsWithUUID = formData.curriculum.map((chapter) => ({
      ...chapter,
      lessons: chapter.lessons.map((lesson) => ({
        ...lesson,
        lessonId: lesson.lessonId || uuidv4(),
      })),
    }));

    // ✅ Firestore에 저장
    await setDoc(newDocRef, {
      userId,
      userName,
      lectureId, // 문서 ID를 내부 데이터에도 명시적으로 포함
      ...formData,
      curriculum: curriculumsWithUUID,
      lectureCreatedAt: serverTimestamp(),
    });

    return lectureId; // 새로 생성된 ID 반환
  } catch (error) {
    console.error('❌ registLectureService Error:', error);
    throw error;
  }
};
