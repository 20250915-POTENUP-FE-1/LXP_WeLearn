'use client'
import { useAuth } from '@/shared/store/auth/auth.store'
import { ReactNode, useEffect } from 'react'
import { clientApi } from '../utils/clientApiUtils'
import { ApiResponse } from '@/types/api/api'
import { UserInfo } from '@/types/user/user'

interface AuthProviderProps {
  initialLoggedIn: boolean
  children: ReactNode
}

export default function AuthProvider({ initialLoggedIn, children }: AuthProviderProps) {
  const setUser = useAuth((state) => state.setUser)
  const setLoggedIn = useAuth((state) => state.setLoggedIn)
  const logout = useAuth((state) => state.logout)
  const hasHydrated = useAuth((state) => state.hasHydrated)

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoggedIn(initialLoggedIn)
        if (!initialLoggedIn || !hasHydrated) return

        const res = await clientApi.get<ApiResponse<UserInfo>>('/api/v1/users/me')
        setUser(res.data)
      } catch {
        setLoggedIn(false)
        setUser(null)
        logout()
      }
    }

    getUserData()
  }, [hasHydrated])

  return children
}
