import { PlaylistItems } from '../playlist/playlist'

export interface PlaylistState {
  playlist: PlaylistItems | null
  hasHydrated: boolean
  login: (user: PlaylistItems) => void
  setPlaylist: (playlist: PlaylistItems) => void
  setHasHydrated: () => void
}
