'use server'

import { categoryApi, type CategoryResponse } from '@/services/category/category.service'

export async function getCategoriesAction(): Promise<CategoryResponse> {
  return categoryApi.getAll()
}
