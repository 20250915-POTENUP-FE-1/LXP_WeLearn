'use server'

import { revalidatePath } from 'next/cache'
import { myShortsApi } from '@/services/mypage/myshorts.service'
import type { ShortsResponse, ShortsUpdateRequest } from '@/types/mypage-shorts'
import { ActionState } from '@/types/action'

/**
 * 숏츠 수정 액션
 */
export async function updateShortsAction(
  prevState: ActionState<ShortsResponse>,
  formData: FormData,
): Promise<ActionState<ShortsResponse>> {
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
    const data = await myShortsApi.updateShorts(shortsId, payload)
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
// export async function toggleShortsStatusAction(
//   shortsId: number,
//   currentStatus: ShortsUpdateRequest['status'],
// ): Promise<ActionState<ShortsResponse>> {
//   if (!shortsId || isNaN(shortsId)) {
//     return {
//       success: false,
//       message: '유효하지 않은 숏츠 ID입니다.',
//     }
//   }

//   try {
//     const data = await myShortsApi.toggleShortsStatus(shortsId, currentStatus)
//     revalidatePath('/mypage/myshorts')

//     const statusText = data.status === 'PUBLISHED' ? '공개' : '비공개'

//     return {
//       success: true,
//       message: `숏츠가 ${statusText}로 변경되었습니다.`,
//       data,
//     }
//   } catch (error) {
//     return {
//       success: false,
//       message: error instanceof Error ? error.message : '상태 변경 실패',
//     }
//   }
// }
