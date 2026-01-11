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

  postReplyComment: async (commentId: number, data: PostReCommentRequest) => {
    const response = await fetch(`http://localhost:4000/api/v1/comments/${commentId}/replies`, {
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
}
