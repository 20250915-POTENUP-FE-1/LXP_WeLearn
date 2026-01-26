import { UserInfo } from '../user/user'

export interface CommentResponseWrapper {
  comments: CommentsResponse[]
  totalCommentCount: number
}

export interface CommentsResponse {
  shortsId: number
  content: string
  createdAt: string
  writer: Omit<UserInfo, 'email'>
  replyCount: number
  isMine: boolean
  commentId: number
}
