import { api } from '@/lib/utils/apiUtils'
import { UserInfo } from '@/types/auth'
import { cache } from 'react'

interface PostReCommentRequest {
  content: string
}

export const RecommentApi = {
  // 해당 숏폼 댓글 조회
  getReplyComment: async (id: number) => {
    const response = await fetch(`http://localhost:4000/api/v1/comments/${id}/replies`, {
      cache: 'no-store',
    })
    return response.json()
  },

  postReplyComment: async (replyId: number, data: PostReCommentRequest) => {
    const response = await fetch(`http://localhost:4000/api/v1/comments/${replyId}/replies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: data.content,
      }),
    })
    const result = await response.json()
    if (!response.ok) throw new Error(result.message || '댓글 등록 실패')
    return result
  },

  patchReplyComment: async (replyId: number, data: PostReCommentRequest) => {
    const response = await fetch(`http://localhost:4000/api/v1/replies/${replyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: data.content,
      }),
    })
    const result = await response.json()
    if (!response.ok) throw new Error(result.message || '답글 수정 실패')
    return result
  },

  deleteReplyComment: async (replyId: number) => {
    const response = await fetch(`http://localhost:4000/api/v1/replies/${replyId}`, {
      method: 'DELETE',
    })
    const result = await response.json()
    if (!response.ok) throw new Error(result.message || '댓글 삭제 실패')
    return true
  },
}
