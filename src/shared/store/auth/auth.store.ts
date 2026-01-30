import { AuthState } from '@/types/store/store'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      auth: null,
      hasHydrated: false,

      login: (user) => set({ auth: user }),
      logout: () => set({ auth: null }),
      setHasHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => () => {
        useAuth.getState().setHasHydrated()
      },
    },
  ),
)
