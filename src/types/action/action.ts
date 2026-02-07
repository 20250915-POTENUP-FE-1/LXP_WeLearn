/**
 * 서버 액션 응답 타입
 */
export type ActionState<T = unknown> = {
  success: boolean
  message?: string
  errors?: Record<string, string>
  data?: T
  inputs?: Record<string, string>
  code?: string
}
