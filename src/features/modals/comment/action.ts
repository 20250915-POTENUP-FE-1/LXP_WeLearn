'use server'

import { commentApi } from '@/services/comments/comments.service'
import { ReplyApi } from '@/services/comments/replies.service'
import { ActionState } from '@/types/action/action'
import { CommentResponseWrapper } from '@/types/comments/comments'
import { ReplyCommentsResponse } from '@/types/replies/replies'
import { revalidatePath } from 'next/cache'

// 댓글 조회 액션
export const getCommentAction = async (
  prevState: ActionState,
  id: number,
): Promise<ActionState<CommentResponseWrapper>> => {
  try {
    const commentData = await commentApi.getComment(id)
    return {
      success: true,
      data: commentData?.data,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '댓글 조회실패',
    }
  }
}

// 댓글 등록 액션
export const postCommentAction = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const content = formData.get('comment') as string
  const shortsId = Number(formData.get('shortsid') || 0)

  try {
    const res = await commentApi.postComment(shortsId, { content })

    revalidatePath(`/shorts/${shortsId}`)
    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      message: '댓글 등록 중 오류가 발생했습니다.',
    }
  }
}

// 댓글 수정 액션
export const patchCommentAction = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const content = formData.get('comment') as string
  const commentId = Number(formData.get('commentId') || 0)

  if (!content) {
    return {
      success: false,
      errors: { content: '댓글을 입력해주세요' },
    }
  }

  try {
    const res = await commentApi.patchComment(commentId, { content })

    revalidatePath(`/shorts/${commentId}`)
    return {
      success: true,
    }
  } catch {
    return {
      success: false,
      message: '댓글 수정 중 오류가 발생했습니다.',
    }
  }
}

// 댓글 삭제 액션
export const deleteCommentAction = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const commentId = Number(formData.get('commentId') || 0)

  if (!commentId) {
    return {
      success: false,
      errors: { content: '존재 하지 않는 댓글입니다.' },
    }
  }

  try {
    const res = await commentApi.deleteComment(commentId)
    revalidatePath(`/shorts/${commentId}`)

    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      errors: {
        content: error instanceof Error ? error.message : '댓글 삭제 중 오류가 발생했습니다.',
      },
    }
  }
}

// 대댓글 조회 액션
export const getReplyAction = async (
  prevState: ActionState,
  id: number,
): Promise<ActionState<ReplyCommentsResponse[]>> => {
  try {
    const replyData = await ReplyApi.getReplyComment(id)
    return {
      success: true,
      data: replyData.data,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '답글 조회실패',
      data: [],
    }
  }
}

// 대댓글 등록 액션
export const postReplyAction = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const content = formData.get('replyComment') as string
  const commentId = Number(formData.get('commentId') || 0)

  if (!content) {
    return {
      success: false,
      errors: { content: '댓글을 입력해주세요.' },
    }
  }

  const res = await ReplyApi.postReplyComment(commentId, { content })
  revalidatePath(`shorts/${commentId}/comments`)

  return {
    success: true,
  }
}

// 대댓글 수정 액션
export const patchReplyCommentAction = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const replyId = Number(formData.get('replyId') || 0)
  const content = formData.get('comment') as string

  if (!replyId) {
    return {
      success: false,
      errors: { content: '존재 하지 않는 답글입니다.' },
    }
  }

  try {
    const res = await ReplyApi.patchReplyComment(replyId, { content })
    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      message: '답글 수정 중 오류가 발생했습니다.',
    }
  }
}

export const deleteReplyCommentAction = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const replyId = Number(formData.get('replyId') || 0)
  const parentId = Number(formData.get('parentId') || 0)

  if (!replyId) {
    return {
      success: false,
      errors: { content: '존재 하지 않는 답글입니다.' },
    }
  }

  try {
    const res = await ReplyApi.deleteReplyComment(replyId)
    revalidatePath(`/shorts/${parentId}`)
    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      errors: {
        content: error instanceof Error ? error.message : '답글 삭제 중 오류가 발생하였습니다.',
      },
    }
  }
}
