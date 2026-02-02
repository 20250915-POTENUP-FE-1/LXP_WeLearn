// -------------- Request -------------

/* =========================
 * 프로필 수정
 * /api/v1/users/me
 * ========================= */
export interface UserUpdateRequest {
  email?: string
  nickName?: string
  profileUrl?: string
}

/* =========================
 * 비밀번호 수정
 * /api/v1/users/me/password
 * ========================= */
export interface PasswordUpdateRequest {
  currentPassword: string
  newPassword: string
}

// ------------- Response -------------

/* =========================
 * UserInfo -> /api/v1/users/me
 * 유저 정보 조회
 * ========================= */

export interface UserInfo {
  userId: number
  email: string
  nickName: string
  profileUrl: string | null
  createdAt?: string
}

export interface CommentUserInfo {
  userId: number
  nickname: string
  profileImageUrl: string | null
}
