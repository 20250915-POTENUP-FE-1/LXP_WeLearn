'use server'

import { revalidatePath } from 'next/cache'
import { myShortsApi } from '@/services/mypage/myshorts.service'
import { ActionState } from '@/types/action/action'
import { ShortsBase, ShortsRequest } from '@/types/shorts/shorts'

/**
 * 숏츠 수정 액션
 */
export async function updateShortsAction(
  prevState: ActionState<ShortsBase>,
  formData: FormData,
): Promise<ActionState<ShortsBase>> {
  const shortsId = Number(formData.get('shortsId'))

  // 유효성 검사
  if (!shortsId || isNaN(shortsId)) {
    return {
      success: false,
      message: '유효하지 않은 숏츠 ID입니다.',
    }
  }

  const title = formData.get('title') as string
  const description = formData.get('description') as string | null
  const categoryId = formData.get('categoryId')
  const status = formData.get('status') as ShortsRequest['status'] | null
  const keywords = formData.getAll('keywords') as string[]

  const payload: ShortsRequest = {
    title: title,
    description: description,
    categoryId: Number(categoryId),
    status: status || undefined,
    keywords: keywords,
  }

  try {
    const response = await myShortsApi.updateShorts(shortsId, payload)
    revalidatePath('/mypage/myshorts')

    return {
      success: true,
      message: '숏츠가 수정되었습니다.',
      data: response.data,
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
export async function deleteShortsAction(shortsId: number): Promise<ActionState> {
  if (!shortsId || isNaN(shortsId)) {
    return {
      success: false,
      message: '유효하지 않은 숏츠 ID입니다.',
    }
  }

  try {
    await myShortsApi.deleteShorts(shortsId)
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
  shortsId: number,
  currentStatus: ShortsRequest['status'],
): Promise<ActionState<ShortsBase>> {
  if (!shortsId || isNaN(shortsId)) {
    return {
      success: false,
      message: '유효하지 않은 숏츠 ID입니다.',
    }
  }

  try {
    const newStatus = currentStatus === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'
    const response = await myShortsApi.updateShorts(shortsId, { status: newStatus })
    revalidatePath('/mypage/myshorts')

    const statusText = response.data.status === 'PUBLISHED' ? '공개' : '비공개'

    return {
      success: true,
      message: `숏츠가 ${statusText}로 변경되었습니다.`,
      data: response.data,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '상태 변경 실패',
    }
  }
}
