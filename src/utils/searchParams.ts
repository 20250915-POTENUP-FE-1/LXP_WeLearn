/** 페이지당 아이템 수 */
export const ITEMS_PER_PAGE = 8

/**
 * 카테고리 ID 파싱: all이 아니고 유효한 숫자일 때만 변환, 그 외는 null (전체 카테고리)
 */
export function parseCategoryId(raw: string | null | undefined): number | null {
  return raw && raw !== 'all' && Number.isFinite(Number(raw)) ? Number(raw) : null
}

/**
 * 페이지 번호 파싱: URL은 1-indexed, 내부는 0-indexed
 * URL의 page=1 → 내부 0, page=2 → 내부 1
 */
export function parsePageNumber(raw: string | null | undefined): number {
  const parsed = Number(raw)
  return Number.isFinite(parsed) && parsed >= 1 ? parsed - 1 : 0
}

/**
 * 카테고리/페이지 쿼리 스트링 생성
 * 내부 0-indexed → URL 1-indexed 변환
 */
export function buildCategoryQuery(categoryId: number | null, page: number): string {
  const params = new URLSearchParams()
  if (categoryId !== null) {
    params.set('category', String(categoryId))
  }
  if (page > 0) {
    params.set('page', String(page + 1))
  }
  return params.toString()
}
