export interface UserInfo {
  id: number | null
  name: string
  profileUrl: string | null
  nickname?: string
}

export interface CommentType {
  commentId: number
  content: string
  createdAt: string
  isMine: boolean
  replyCount: number
  writer: UserInfo
}

export interface ReplyCommetType {
  replyId: number
  parentId: number
  content: string
  createdAt: string
  writer: UserInfo
  isMine: boolean
}

export interface ReplyCommentResponse {
  success: boolean
  data: ReplyCommetType[]
}

export interface CommentsResponse {
  success: boolean
  data: CommentType[]
}
