import { CommetUserInfo } from '../user/user'

export interface ReplyCommentsResponse {
  replyId: number
  parentId: number
  content: string
  createdAt: string
  writer: Omit<CommetUserInfo, 'email'>
  isMine: boolean
}

export interface ReplyCommentRequest {
  content: string
}
