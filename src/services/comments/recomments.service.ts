import { api } from '@/lib/utils/apiUtils'
import { ApiResponse } from '@/types/mypage-shorts'
import { ReplyCommentType } from '@/types/comment'

interface PostReCommentRequest {
  content: string
}

export const RecommentApi = {
  // 해당 숏폼 댓글 조회
  getReplyComment: async (id: number): Promise<ApiResponse<ReplyCommentType[]>> => {
    const response = await api.get<ApiResponse<ReplyCommentType[]>>(
      `/api/v1/comments/${id}/replies`,
      {
        cache: 'no-store',
      },
    )
    return response
  },

  postReplyComment: async (commentId: number, data: PostReCommentRequest) => {
    const response = await api.post(`/api/v1/comments/${commentId}/replies`, data)
    return response
  },

  patchReplyComment: async (
    replyId: number,
    data: PostReCommentRequest,
  ): Promise<ApiResponse<ReplyCommentType[]>> => {
    const response = await api.patch<ApiResponse<ReplyCommentType[]>>(
      `/api/v1/replies/${replyId}`,
      data,
    )
    return response
  },

  deleteReplyComment: async (replyId: number) => {
    await fetch(`/api/v1/replies/${replyId}`)
    return true
  },
}
