import { randDate } from '../utils/randomDate.js';
import { Timestamp } from 'firebase/firestore';

function randomStatus() {
  const statuses = ['active', 'completed', 'cancelled', 'expired', 'paused'];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function randomMention(length = 70) {
  const chars = '가나다라마바사아자차카타파하ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ';
  const len = Math.floor(Math.random() * (length - 20)) + 20; // 최소 20자~최대 70자
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join(
    '',
  );
}

function randomRating() {
  // 0~5 사이, 소수점 한 자리로
  return Math.round(Math.random() * 5 * 10) / 10;
}

export function createRandomEnrollment() {
  const start = new Date('2022-01-01T00:00:00Z');
  const end = new Date('2025-11-11T23:59:59Z');

  return {
    enrolledAt: randDate(start, end),
    status: randomStatus(),
    reviews: {
      rating: randomRating(),
      mention: randomMention(),
    },
  };
}
