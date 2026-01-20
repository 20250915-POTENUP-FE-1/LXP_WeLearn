/* =========================
 * 로그인 / 리프레쉬 요청 ->
 * /api/v1/auth/login // /api/v1/auth/refresh
 * ========================= */

export interface TokenResponse {
  accessToken: string
  refreshToken: string
}
