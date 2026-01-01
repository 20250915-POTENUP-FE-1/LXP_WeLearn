// 카테고리 더미 데이터 (추후 API 연동 시 교체 예정)
export const DUMMY_CATEGORIES = [
  { id: 1, name: '프론트엔드' },
  { id: 2, name: '백엔드' },
  { id: 3, name: '디자인' },
  { id: 4, name: '데이터' },
  { id: 5, name: 'DevOps' },
  { id: 6, name: '모바일' },
] as const

export type DummyCategory = (typeof DUMMY_CATEGORIES)[number]
