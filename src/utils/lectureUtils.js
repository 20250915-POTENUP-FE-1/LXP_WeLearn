import CATEGORIES from '../constants/categories.js';

/** category id(숫자), key(문자열) => name 반환 */
export function getCategoryName(categoryValue) {
  if (categoryValue === undefined || categoryValue === null) return '기타';

  const str = String(categoryValue).toLowerCase();
  const num = Number(categoryValue);

  const matched = CATEGORIES.find((c) => c.id === num || c.key.toLowerCase() === str);

  return matched ? matched.name : '기타';
}

/**
 *  getTotalLectureCount()
 * - 커리큘럼 전체의 강의 수를 계산하는 함수.
 * - 섹션별로 lessons[] 또는 lectures[] 배열 모두
 * - 각 섹션의 배열 길이를 합산하여 총 강의 수 반환하기
 */

export function getTotalLectureCount(curriculum) {
  if (!Array.isArray(curriculum)) return 0;

  return curriculum.reduce((total, section) => {
    const lessonsCount = Array.isArray(section?.lessons) ? section.lessons.length : 0;
    const lecturesCount = Array.isArray(section?.lectures) ? section.lectures.length : 0;
    return total + (lessonsCount + lecturesCount);
  }, 0);
}
