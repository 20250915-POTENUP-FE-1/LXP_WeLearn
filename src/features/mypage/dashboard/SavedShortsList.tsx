import Link from 'next/link'
import SavedShortsCard from './SavedShortsCard'

interface SavedPlaylist {
  id: string
  visibility: 'public' | 'private'
  shortsCount: number
  thumbnailUrl: string
  title: string
  category: string
  progress: number
}

interface SavedShortsListProps {
  playlists: SavedPlaylist[]
}

export default function SavedShortsList({ playlists }: SavedShortsListProps) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-gray-900 uppercase">Saved Shorts</h2>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
        {playlists.map((playlist) => (
          <Link key={playlist.id} href={`/mypage/saved/${playlist.id}`}>
            <SavedShortsCard
              visibility={playlist.visibility}
              shortsCount={playlist.shortsCount}
              thumbnailUrl={playlist.thumbnailUrl}
              title={playlist.title}
              category={playlist.category}
              progress={playlist.progress}
            />
          </Link>
        ))}
      </div>
    </section>
  )
}
