import { AuthState } from '@/types/store/store'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      auth: null,
      hasHydrated: false,
      isLogin: false,

      // 로그인 시
      login: (user) =>
        set({
          auth: user,
          isLogin: true,
        }),

      // getme 요청 또는 프로필 수정시
      setUser: (user) =>
        set({
          auth: user,
        }),

      setLoggedIn: (value) =>
        set({
          isLogin: value,
        }),

      logout: () => {
        set({ auth: null, isLogin: false })
        useAuth.persist.clearStorage()
      },

      setHasHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),

      partialize: (state) => ({
        auth: state.auth,
        isLogin: state.isLogin,
      }),

      onRehydrateStorage: () => (state) => {
        if (!state) return
        state.setHasHydrated()
      },
    },
  ),
)
