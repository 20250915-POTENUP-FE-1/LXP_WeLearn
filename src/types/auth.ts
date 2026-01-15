export interface LoginFormData {
  email: string
  password: string
}

export interface SignupFormData {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

export interface UserInfo {
  email: string
  nickName: string
  profileUrl?: string
  createdAt?: string
}
