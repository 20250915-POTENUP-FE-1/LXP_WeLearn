import { randDate } from '../utils/randomDate.js';
import { familyNames, givenSyllables } from './names/names.js';
import { randomNumber } from '../utils/randomNumber.js';
import { roles } from './names/role.js';

// 한국어 2~3글자 이름: 성(1) + 이름(1~2)
function randHangulName() {
  const family = familyNames[randomNumber(0, familyNames.length - 1)];
  const givenLen = randomNumber(1, 2); // 총 2~3자
  let given = '';
  for (let i = 0; i < givenLen; i++)
    given += givenSyllables[randomNumber(0, givenSyllables.length - 1)];
  return family + given; // 2~3자
}

// 3) users 배열 만들기 (for문)
export function buildUsers(count) {
  const users = [];
  const start = new Date('2022-01-01T00:00:00Z');
  const end = new Date('2025-11-11T23:59:59Z');

  for (let i = 0; i < count; i++) {
    const userName = randHangulName(); // 2~3자
    const email = `user${String(i + 1).padStart(3, '0')}@example.com`; // 테스트용 example.com
    const role = roles[randomNumber(0, roles.length - 1)];
    const userCreatedAt = randDate(start, end);

    users.push({ userName, email, role, userCreatedAt });
  }
  return users;
}
