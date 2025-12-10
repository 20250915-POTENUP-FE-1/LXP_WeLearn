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
    const response = await auth.post('/api/v1/auth/signup', data, { cache: 'no-store' })
    return response
  },

  signin: async (data: SigninRequest) => {
    const response = await auth.post('/api/v1/auth/login', data, { cache: 'no-store' })
    return response
  },

  logout: async () => {
    const response = auth.post('/api/v1/auth/logout')
    return response
  },
}
