import { api } from '@/lib/utils/apiUtils'
import { CommentType } from '@/types/comment'
import { ApiResponse } from '@/types/mypage-shorts'
import { revalidatePath } from 'next/cache'

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
    const response = api.post(`/api/v1/shorts/${shortsId}/comments`, data)
    revalidatePath(`/shorts/${2}/comments`)
    return response
  },

  patchComment: async (commentId: number, data: CommentRequest) => {
    const response = api.patch(`/api/v1/comments/${commentId}`, data)
    console.log('-----서비스')
    console.log(response)
    return response
  },

  deleteComment: async (commentId: number) => {
    const response = api.delete(`/api/v1/comments/${commentId}`)

    return response
  },
}
