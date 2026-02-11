// ------------- Request ------------

import { UserInfo } from '../user/user'

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

export interface SignUpResponse{
  email: string,
  password: string,
  nickname: string,
}

// ---------------- Response ---------------
/* =========================
 * 로그인 / 리프레쉬 요청 ->
 * /api/v1/auth/login // /api/v1/auth/refresh
 * ========================= */
interface LoginData {
  accessToken: string,
  refreshToken: string
}

export interface LoginResponse {
  success: boolean,
  code: string,
  message: null | string,
  request: null | string,
  data: null | LoginData
}

export interface TokenResponse {
  accessToken: string
  refreshToken: string
}

export interface PresignedUrlData {
  url: string;
  key: string;
}