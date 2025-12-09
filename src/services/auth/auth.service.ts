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
  signup: async (data: SignupRequest) => {
    const df = await auth.post('/api/v1/auth/signup', data, { cache: 'no-store' })
    return df
  },

  signin: (data: SigninRequest) => {
    return auth.post('/api/v1/auth/login', data, { cache: 'no-store' })
  },

  logout: () => {
    return auth.post('/api/v1/auth/logout')
  },
}
