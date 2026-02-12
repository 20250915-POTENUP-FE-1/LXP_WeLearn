import { CommentUserInfo } from '../user/user'

export interface CommentRequest {
  content: string
}

export interface CommentResponseWrapper {
  comments: CommentsResponse[]
  totalCommentCount: number
}

export interface CommentsResponse {
  shortsId: number
  content: string
  createdAt: string
  writer: Omit<CommentUserInfo, 'email'>
  replyCount: number
  isMine: boolean
  commentId: number
}
