// 랜덤 문자열 & 날짜 생성 유틸
import { randDate } from '../utils/randomDate.js';
import { Timestamp } from 'firebase/firestore';
import { randomNumber } from '../utils/randomNumber.js';
import { title } from './lecture-title-content-desc/title.js';
import { description } from './lecture-title-content-desc/description.js';
import { content } from './lecture-title-content-desc/content.js';

function randomText(len) {
  const chars = '가나다라마바사아자차카타파하ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join(
    '',
  );
}

function randomLevel() {
  const levels = ['초급', '중급', '고급'];
  return levels[Math.floor(Math.random() * levels.length)];
}

// 강의 데이터 생성 함수
export function createRandomLecture(userId, userName) {
  const numChapters = Math.floor(Math.random() * 3) + 1; // 1~3개 챕터
  const curriculum = Array.from({ length: numChapters }, (_, ci) => ({
    chapterTitle: `챕터 ${ci + 1} - ${randomText(3)}`,
    lessons: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, li) => ({
      lessonId: `lesson-${ci + 1}-${li + 1}`,
      lessonTitle: `레슨 ${li + 1} - ${randomText(4)}`,
      lessonMediaUrl: `/media/${randomText(5)}.mp4`,
    })),
  }));
  const start = new Date('2022-01-01T00:00:00Z');
  const end = new Date('2025-11-11T23:59:59Z');

  return {
    title: title[randomNumber(0, title.length - 1)],
    description: description[randomNumber(0, description.length - 1)],
    content: content[randomNumber(0, content.length - 1)],
    thumbnailUrl: `/src/assets/images/lxp-image-0${randomNumber(0, 9)}.png`,
    userId,
    userName,
    category: Math.floor(Math.random() * 7) + 1,
    level: randomLevel(),
    lectureCreatedAt: randDate(start, end),
    curriculum,
  };
}
