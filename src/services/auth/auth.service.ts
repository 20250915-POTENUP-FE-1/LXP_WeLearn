import api from '@/lib/utils/apiUtils'

interface SignupRequest {
  email: string
  password: string
  nickname: string
  name: string
  profileUrl?: string
}

interface SigninRequest {
  email: string
  password: string
}

const auth = api()

export const authApi = {
  // 회원가입
  signup: (data: SignupRequest) => {
    return auth.post('/api/auth/register', data, { cache: 'no-store' })
  },

  signin: (data: SigninRequest) => {
    return auth.post('/api/auth/login', data, { cache: 'no-store' })
  },

  logout: () => {
    return auth.post('/api/auth/logout')
  },
}
