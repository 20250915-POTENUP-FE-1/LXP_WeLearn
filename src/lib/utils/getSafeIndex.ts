/**
 * 배열의 안전한 인덱스를 반환하는 유틸리티 함수
 * 범위를 벗어난 인덱스를 방지하고 유효한 인덱스로 보정
 *
 * @param index - 확인할 인덱스
 * @param arrayLength - 배열의 길이
 * @returns 유효한 범위 내의 인덱스 (0 ~ arrayLength - 1)
 */

export function getSafeIndex(index: number, arrayLength: number): number {
  // 배열이 비어있는 경우
  if (arrayLength === 0) return 0
  // 음수 인덱스는 0으로
  if (index < 0) return 0

  // 배열 길이를 초과하는 경우 마지막 인덱스로
  if (index >= arrayLength) return arrayLength - 1
  return index
}
