export interface UserInfo {
  id: number | null
  name: string
  profileUrl: string | null
}

export interface CommentType {
  id: number
  content: string
  createdAt: string
  user: UserInfo
  replies: CommentType[] // 대댓글
}
