'use server'
import { likeApi } from '@/services/shorts/likes.service'
import { ApiResponse } from '@/types/api/api'

// 좋아요 액션
export const likeAction = async (prevState: ApiResponse<null>, shortsId: number) => {
  try {
    await likeApi.like(shortsId)
    return {
      success: true,
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

// 좋아요 취소 액션
export const unlikeAction = async (prevState: ApiResponse<null>, shortsId: number) => {
  try {
    await likeApi.unlike(shortsId)
    return {
      success: true,
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
