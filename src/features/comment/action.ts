'use server'

import { commentApi } from '@/services/comments/comments.service'
import { RecommentApi } from '@/services/comments/recomments.service'
import { CommentType, ReplyCommetType } from '@/types/comment'
import { revalidatePath } from 'next/cache'

export type CommentActionState = {
  success: boolean
  message?: string
  errors?: {
    content?: string
  }
  data?: CommentType
  timestamp?: number
}

export type ReplyActionState = {
  success: boolean
  message?: string
  errors?: {
    content?: string
  }
  data?: ReplyCommetType
}

export const postCommentAction = async (
  prevState: CommentActionState,
  formData: FormData,
): Promise<CommentActionState> => {
  const content = formData.get('comment') as string
  const shortsId = Number(formData.get('shortsid') || 0)

  if (!content) {
    return {
      success: false,
      errors: { content: '댓글을 입력해주세요' },
    }
  }

  try {
    const res = await commentApi.postComment(shortsId, { content })
    revalidatePath(`/shorts/${shortsId}`)
    return {
      success: true,
      data: res.data,
      timestamp: Date.now(), // 매번 다른 값을 보냄으로써 useEffect 실행 보장
    }
  } catch (error) {
    return {
      success: false,
      message: '댓글 등록 중 오류가 발생했습니다.',
    }
  }
}

export const postReplyAction = async (
  prevState: ReplyActionState,
  formData: FormData,
): Promise<ReplyActionState> => {
  const content = formData.get('replyComment') as string
  const commentId = Number(formData.get('commentId') || 0)

  if (!content) {
    return {
      success: false,
      errors: { content: '댓글을 입력해주세요.' },
    }
  }

  const res = await RecommentApi.postReplyComment(commentId, { content })

  return {
    success: true,
    data: res.data,
  }
}
