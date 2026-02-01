/** 페이지당 아이템 수 */
export const ITEMS_PER_PAGE = 8

/**
 * 카테고리 ID 파싱: 'all'이 아니고 유효한 숫자일 때만 변환, 그 외는 null (전체 카테고리)
 */
export function parseCategoryId(raw: string | null | undefined): number | null {
  return raw && raw !== 'all' && Number.isFinite(Number(raw)) ? Number(raw) : null
}

/**
 * 페이지 번호 파싱: 유효한 0 이상의 숫자일 때만 사용, 그 외는 0 (첫 페이지)
 */
export function parsePageNumber(raw: string | null | undefined): number {
  const parsed = Number(raw)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0
}
