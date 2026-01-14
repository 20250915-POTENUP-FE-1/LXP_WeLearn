'use server'

import { categoryApi, type CategoryResponse } from '@/services/category/category.service'

export async function getCategoriesAction(): Promise<CategoryResponse[]> {
  try {
    return await categoryApi.getAll()
  } catch (error) {
    console.error('카테고리 목록 조회 실패:', error)
    return []
  }
}
