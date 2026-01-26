// -------------- Request -------------

/* =========================
 * 프로필 수정
 * /api/v1/users/me
 * ========================= */
export interface ProfileEditRequest {
  email?: string
  nickName?: string
  profileUrl?: string
}

/* =========================
 * 비밀번호 수정
 * /api/v1/users/me/password
 * ========================= */
export interface PasswordEditRequest {
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
  eamil: string
  nickname: string
  profileImageUrl: string | null
}
