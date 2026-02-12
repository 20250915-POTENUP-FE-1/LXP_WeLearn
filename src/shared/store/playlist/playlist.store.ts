import { PlaylistItems } from '@/types/playlist/playlist'
import { PlaylistState } from '@/types/store/playlistStore'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const usePlaylist = create<PlaylistState>()(
  persist(
    (set) => ({
      playlist: null,
      hasHydrated: false,

      login: (playlist) => set({ playlist: playlist }),
      setPlaylist: (playlist: PlaylistItems | undefined) =>
        set((state) => ({ ...state, playlist: playlist })),
      setHasHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: 'playlist-storage',
      storage: createJSONStorage(() => localStorage),

      onRehydrateStorage: () => (state) => {
        if (!state) return
        state.setHasHydrated()
      },
    },
  ),
)
