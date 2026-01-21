export interface ApiResponse<T = unknown> {
  success: boolean
  code: string
  message: string | null
  request: string | null
  data: T
}
