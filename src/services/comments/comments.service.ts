import api from '@/lib/utils/apiUtils'
import { UserInfo } from '@/types/auth'

interface PostCommentRequest {
  user: UserInfo
  comment: string
  shortsId: string
}

const comment = api()

export const commentApi = {
  // 해당 숏폼 댓글 조회
  getComment: async (id: string) => {
    const response = await fetch(`http://localhost:4000/api/v1/shorts/${id}/comments`, {
      cache: 'no-store',
    })
    return response.json()
  },

  postComment: async (data: PostCommentRequest) => {
    const response = await comment.post(
      `http://localhost:4000/api/v1/shorts/${data.shortsId}/comments`,
      data,
      { cache: 'no-store' },
    )
    const result = await response.json()
    if (!response.ok) throw new Error(result.message || '댓글 등록 실패')
    return result
  },
}
