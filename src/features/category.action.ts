'use server'

import { categoryApi, type CategoryResponse } from '@/services/category/category.service'
import { ApiResponse, PageShortsResponse, PaginationParams } from '@/types/mypage-shorts'

/** 전체 카테고리 목록 조회 */
export async function getCategoriesAction(): Promise<ApiResponse<CategoryResponse[]>> {
  const response = await categoryApi.getAll()
  return response
}

/** 전체 숏츠 목록 조회 (페이지네이션) */
export async function getShortsAction(
  params: PaginationParams = {},
): Promise<PageShortsResponse | null> {
  const response = await categoryApi.getAllShorts(params)
  return response?.data ?? null
}

/** 카테고리별 숏츠 목록 조회 (페이지네이션) */
export async function getShortsByCategoryAction(
  categoryId: number,
  params: PaginationParams = {},
): Promise<PageShortsResponse | null> {
  const response = await categoryApi.getShortsByCategoryId(categoryId, params)
  return response?.data ?? null
}
