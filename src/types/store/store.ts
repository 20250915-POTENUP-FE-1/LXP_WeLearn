import { UserInfo } from '../user/user'

// AuthState
export interface AuthState {
  auth: UserInfo | null
  hasHydrated: boolean
  login: (user: UserInfo) => void
  logout: () => void
  setHasHydrated: () => void
}
