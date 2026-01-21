import { UserInfo } from '../user/user'

export interface CommentsResponse {
  shortsId: number
  content: number
  createdAt: string
  writter: Omit<UserInfo, 'email'>
  replyCount: string
  isMine: boolean
}
