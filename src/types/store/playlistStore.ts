import { PlaylistItem } from '../playlist/playlist'

export interface PlaylistState {
  playlist: PlaylistItem | null
  hasHydrated: boolean
  login: (user: PlaylistItem) => void
  setPlaylist: (playlist: PlaylistItem) => void
  setHasHydrated: () => void
}
