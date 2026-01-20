// ------------- Request ------------

/* =========================
 * 회원가입
 * /api/v1/users
 * ========================= */
export interface SignUpRequest {
  email: string
  password: string
  nickname: string
  profileUrl?: string
}

export interface SignInRequest {
  email: string
  password: string
}

// ---------------- Response ---------------
/* =========================
 * 로그인 / 리프레쉬 요청 ->
 * /api/v1/auth/login // /api/v1/auth/refresh
 * ========================= */

export interface TokenResponse {
  accessToken: string
  refreshToken: string
}
