export interface CommonResponse<T> {
  success: boolean
  data: T
  error: string | null
}
