import { UserInfo } from '../user/user'

interface ReplyCommentsResponse {
  replyId: number
  parentId: number
  content: string
  createdAt: string
  writter: Omit<UserInfo, 'email'>
  isMine: boolean
}
