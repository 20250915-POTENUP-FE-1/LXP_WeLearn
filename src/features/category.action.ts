'use server'

import { categoryApi, type CategoryResponse } from '@/services/category/category.service'
import { ApiResponse } from '@/types/mypage-shorts'

export async function getCategoriesAction(): Promise<ApiResponse<CategoryResponse[]>> {
  const response = await categoryApi.getAll()
  return response
}
