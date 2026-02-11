import { UserInfo } from '../user/user'

// AuthState
export interface AuthState {
  auth: UserInfo | null
  hasHydrated: boolean
  isLogin: boolean
  login: (user: UserInfo) => void
  setLoggedIn: (value: boolean) => void
  setUser: (user: UserInfo | null) => void
  logout: () => void
  setHasHydrated: () => void
}
