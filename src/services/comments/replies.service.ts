import { api } from '@/lib/utils/apiUtils'
import { ApiResponse } from '@/types/api/api'
import { ReplyCommentRequest, ReplyCommentsResponse } from '@/types/replies/replies'

interface PostReCommentRequest {
  content: string
}

export const ReplyApi = {
  // 해당 숏폼 댓글 조회
  getReplyComment: async (id: number): Promise<ApiResponse<ReplyCommentsResponse[]>> => {
    const response = await api.get<ApiResponse<ReplyCommentsResponse[]>>(
      `/api/v1/comments/${id}/replies`,
      {
        cache: 'no-store',
      },
    )
    return response
  },

  postReplyComment: async (commentId: number, data: ReplyCommentRequest) => {
    const response = await api.post(`/api/v1/comments/${commentId}/replies`, data)
    return response
  },

  patchReplyComment: async (
    replyId: number,
    data: ReplyCommentRequest,
  ): Promise<ApiResponse<ReplyCommentsResponse[]>> => {
    const response = await api.patch<ApiResponse<ReplyCommentsResponse[]>>(
      `/api/v1/replies/${replyId}`,
      data,
    )

    return response
  },

  deleteReplyComment: async (replyId: number) => {
    const res = await api.delete(`/api/v1/replies/${replyId}`)
    return true
  },
}
