'use server'

import { commentApi } from '@/services/comments/comments.service'
import { RecommentApi } from '@/services/comments/recomments.service'
import { CommentType, ReplyCommentType } from '@/types/comment'
import { revalidatePath } from 'next/cache'

export type CommentActionState = {
  success: boolean
  message?: string
  errors?: {
    content?: string
  }
  data?: CommentType[]
}

export type ReplyActionState = {
  success: boolean
  message?: string
  errors?: {
    content?: string
  }
  data?: ReplyCommentType
}

export type GetCommentType = {
  success: boolean
  message?: string
  errors?: {
    content?: string
  }
  data?: CommentType[]
}

export type GetReplyType = {
  success: boolean
  message?: string
  errors?: {
    content?: string
  }
  data?: ReplyCommentType[]
}

export type GetReplyState = {
  success: boolean
  data: ReplyCommentType[]
  message?: string
}

// 댓글 조회 액션
export const getCommentAction = async (
  prevState: CommentActionState,
  id: number,
): Promise<GetCommentType> => {
  try {
    const commentData = await commentApi.getComment(id)
    return {
      success: true,
      data: commentData?.data,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '답글 조회실패',
    }
  }
}

// 댓글 등록 액션
export const postCommentAction = async (
  prevState: CommentActionState,
  formData: FormData,
): Promise<CommentActionState> => {
  const content = formData.get('comment') as string
  const shortsId = Number(formData.get('shortsid') || 0)

  try {
    const res = await commentApi.postComment(shortsId, { content })

    revalidatePath(`/shorts/${shortsId}`)
    return {
      success: true,
      data: res.data,
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
  prevState: CommentActionState,
  formData: FormData,
): Promise<CommentActionState> => {
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
    console.log('-------액션')
    console.log(res)
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
  prevState: CommentActionState,
  formData: FormData,
): Promise<CommentActionState> => {
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
  prevState: GetReplyState,
  id: number,
): Promise<GetReplyState> => {
  try {
    const replyData = await RecommentApi.getReplyComment(id)
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
  revalidatePath(`shorts/${commentId}/comments`)

  return {
    success: true,
    data: res.data,
  }
}

// 대댓글 수정 액션
export const patchReplyCommentAction = async (
  prevState: GetReplyType,
  formData: FormData,
): Promise<GetReplyType> => {
  const replyId = Number(formData.get('replyId') || 0)
  const content = formData.get('comment') as string

  if (!replyId) {
    return {
      success: false,
      errors: { content: '존재 하지 않는 답글입니다.' },
    }
  }

  try {
    const res = await RecommentApi.patchReplyComment(replyId, { content })
    return {
      success: true,
      data: res?.data,
    }
  } catch (error) {
    return {
      success: false,
      message: '답글 수정 중 오류가 발생했습니다.',
    }
  }
}

export const deleteReplyCommentAction = async (
  prevState: CommentActionState,
  formData: FormData,
): Promise<CommentActionState> => {
  const replyId = Number(formData.get('replyId') || 0)

  if (!replyId) {
    return {
      success: false,
      errors: { content: '존재 하지 않는 답글입니다.' },
    }
  }

  try {
    const res = await RecommentApi.deleteReplyComment(replyId)
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
