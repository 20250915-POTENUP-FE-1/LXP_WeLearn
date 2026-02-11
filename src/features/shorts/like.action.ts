'use server'
import { likeApi } from '@/services/shorts/likes.service'
import { ApiResponse } from '@/types/api/api'
import { ResponseLike } from '@/types/shorts/like'

// 좋아요 액션
export const likeAction = async (prevState: ApiResponse<ResponseLike>, shortsId: number) => {
  try {
    const res = await likeApi.like(shortsId)
    return {
      success: true,
      data: res.data,
    }
  } catch (error) {
    return {
      success: false,
      errors: {
        content:
          error instanceof Error ? error.message : '좋아요 기능 사용 중 오류가 발생했습니다.',
      },
    }
  }
}
