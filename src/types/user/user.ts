/* =========================
 * UserInfo -> /api/v1/users/me
 * 유저 정보 조회
 * ========================= */

export interface UserInfo {
  userId: number
  eamil: string
  nickName: string
  profileUrl: string | null
}
