'use server'

import { categoryApi } from '@/services/category/category.service'
import { ApiResponse } from '@/types/api/api'
import { Category } from '@/types/category/category'
import { PageRequest, PageResponse, ShortsBase } from '@/types/shorts/shorts'

/** 전체 카테고리 목록 조회 */
export async function getCategoriesAction(): Promise<ApiResponse<Category[]>> {
  const response = await categoryApi.getAll()
  return response
}

/** 전체 숏츠 목록 조회 (페이지네이션) */
export async function getShortsAction(
  params: PageRequest = {},
): Promise<PageResponse<ShortsBase[]> | null> {
  const response = await categoryApi.getAllShorts(params)
  return response?.data ?? null
}

/** 카테고리별 숏츠 목록 조회 (페이지네이션) */
export async function getShortsByCategoryAction(
  categoryId: number,
  params: PageRequest = {},
): Promise<PageResponse<ShortsBase[]> | null> {
  const response = await categoryApi.getShortsByCategoryId(categoryId, params)
  return response?.data ?? null
}
