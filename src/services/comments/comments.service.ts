import { api } from '@/lib/utils/apiUtils'
import { CommentType } from '@/types/comment'
import { ApiResponse } from '@/types/mypage-shorts'

interface CommentRequest {
  content: string
}

export const commentApi = {
  // 해당 숏폼 댓글 조회
  getComment: async (id: number): Promise<ApiResponse<CommentType[]>> => {
    const response = await api.get<ApiResponse<CommentType[]>>(`/api/v1/shorts/${id}/comments`, {
      cache: 'no-store',
    })

    return response
  },

  postComment: async (shortsId: number, data: CommentRequest) => {
    const response = api.post(`/api/v1/shorts/${shortsId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: data.content,
      }),
    })
    return response
  },

  patchComment: async (commentId: number, data: CommentRequest) => {
    const response = api.patch(`http://localhost:4000/api/v1/comments/${commentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: data.content,
      }),
    })
    return response
  },

  deleteComment: async (commentId: number) => {
    const response = api.delete(`http://localhost:4000/api/v1/comments/${commentId}`, {
      method: 'DELETE',
    })
    return response
  },
}
