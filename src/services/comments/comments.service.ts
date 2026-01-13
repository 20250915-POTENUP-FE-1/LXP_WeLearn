import CommentInput from '@/components/modals/comment/CommentInput'

interface CommentRequest {
  content: string
}

export const commentApi = {
  // 해당 숏폼 댓글 조회
  getComment: async (id: number) => {
    const response = await fetch(`http://localhost:4000/api/v1/shorts/${id}/comments`, {
      cache: 'no-store',
    })
    if (!response.ok) {
      throw new Error('댓글 조회를 실패했습니다.')
    }
    return response.json()
  },

  // postComment: async (data: PostCommentRequest) => {
  //   const response = await fetch('POST',
  //     `http://localhost:4000/api/v1/shorts/${data.shortsId}/comments`,
  //     data,
  //     { cache: 'no-store' },
  //   )
  //   const result = await response.json()
  //   if (!response.ok) throw new Error(result.message || '댓글 등록 실패')
  //   return result
  // },

  postComment: async (shortsId: number, data: CommentRequest) => {
    const response = await fetch(`http://localhost:4000/api/v1/shorts/${shortsId}/comments`, {
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

  patchComment: async (commentId: number, data: CommentRequest) => {
    const response = await fetch(`http://localhost:4000/api/v1/comments/${commentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: data.content,
      }),
    })
    const result = await response.json()
    if (!response.ok) throw new Error(result.message || '댓글 수정 실패')
    return result
  },

  deleteComment: async (commentId: number) => {
    const response = await fetch(`http://localhost:4000/api/v1/comments/${commentId}`, {
      method: 'DELETE',
    })
    const result = await response.json()
    if (!response.ok) throw new Error(result.message || '댓글 삭제 실패')
    return true
  },
}
