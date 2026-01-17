export interface UserInfo {
  id: number | null
  profileUrl: string | null
  nickname?: string
}

export interface CommentType {
  shortsId: number
  commentId: number
  content: string
  createdAt: string
  isMine: boolean
  replyCount: number
  writer: UserInfo
}

export interface ReplyCommentType {
  replyId: number
  parentId: number
  content: string
  createdAt: string
  writer: UserInfo
  isMine: boolean
}

export interface ReplyCommentResponse {
  success: boolean
  code: string
  message: string | null
  request: string | null
  data: ReplyCommentType[]
}

export interface CommentsResponse {
  success: boolean
  data: CommentType[]
}

export interface CommnetData {
  totalCommentCount: number
  comments: CommentType[]
}
