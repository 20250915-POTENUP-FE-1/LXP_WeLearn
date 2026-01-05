'use server'

import { revalidatePath } from 'next/cache'
import { myShortsApi } from '@/services/mypage/myshorts.service'
import type { components } from '@/types/api-schema'
import { ActionState } from '@/types/action'

// API 타입
type ShortsResponse = components['schemas']['ShortsResponse']
type PageShortsResponse = components['schemas']['PageShortsResponse']
type ShortsUpdateRequest = components['schemas']['ShortsUpdateRequest']

/**
 * 내 숏츠 목록 조회 액션
 */
export async function getMyShortsAction(
  page = 0,
  size = 10,
): Promise<ActionState<PageShortsResponse>> {
  try {
    const data = await myShortsApi.getMyShorts({ page, size })

    return {
      success: true,
      data,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '숏츠 목록 조회 실패',
    }
  }
}

/**
 * 숏츠 상세 조회 액션
 */
export async function getShortsAction(shortId: number): Promise<ActionState<ShortsResponse>> {
  try {
    const data = await myShortsApi.getShorts(shortId)

    return {
      success: true,
      data,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '숏츠 조회 실패',
    }
  }
}

/**
 * 숏츠 수정 액션
 */
export async function updateShortsAction(
  prevState: ActionState<ShortsResponse>,
  formData: FormData,
): Promise<ActionState<ShortsResponse>> {
  const shortId = Number(formData.get('shortId'))
  const title = formData.get('title') as string
  const description = formData.get('description') as string | null
  const categoryId = formData.get('categoryId')
  const status = formData.get('status') as ShortsUpdateRequest['status'] | null
  const tagNames = formData.getAll('tagNames') as string[]

  const payload: ShortsUpdateRequest = {
    title: title || undefined,
    description: description || undefined,
    categoryId: categoryId ? Number(categoryId) : undefined,
    status: status || undefined,
    tagNames: tagNames.length > 0 ? tagNames : undefined,
  }

  try {
    const data = await myShortsApi.updateShorts(shortId, payload)

    // 캐시 무효화
    revalidatePath('/mypage/myshorts')

    return {
      success: true,
      message: '숏츠가 수정되었습니다.',
      data,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '숏츠 수정 실패',
    }
  }
}

/**
 * 숏츠 삭제 액션
 */
export async function deleteShortsAction(shortId: number): Promise<ActionState> {
  try {
    await myShortsApi.deleteShorts(shortId)

    // 캐시 무효화
    revalidatePath('/mypage/myshorts')

    return {
      success: true,
      message: '숏츠가 삭제되었습니다.',
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '숏츠 삭제 실패',
    }
  }
}

/**
 * 숏츠 공개/비공개 전환 액션
 */
export async function toggleShortsStatusAction(
  shortId: number,
  currentStatus: ShortsUpdateRequest['status'],
): Promise<ActionState<ShortsResponse>> {
  try {
    const data = await myShortsApi.toggleShortsStatus(shortId, currentStatus)

    // 캐시 무효화
    revalidatePath('/mypage/myshorts')

    const newStatus = currentStatus === 'PUBLISHED' ? '비공개' : '공개'

    return {
      success: true,
      message: `숏츠가 ${newStatus}로 변경되었습니다.`,
      data,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '상태 변경 실패',
    }
  }
}
