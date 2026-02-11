import { notFound } from 'next/navigation'
import ShortsContainer from '@/features/shorts/components/ShortsContainer'
import { playlistApi } from '@/services/playlist/playlist.service'
import { getShortsDetailList } from '@/services/shorts/getShortsDetailList'
import { ShortsBase } from '@/types/shorts/shorts'
import { mapPlaylistShortsToShortsBase } from '@/lib/utils/playlistToShorts'

interface ShortDetailPageProps {
  params: Promise<{ id: string }>
  searchParams?: { [key: string]: string | string[] | undefined }
}

interface ShortsData {
  shortsList: ShortsBase[]
  initialIndex: number
}

export default async function ShortformDetailPage({ params, searchParams }: ShortDetailPageProps) {
  const { id } = await params
  const sp = await searchParams
  const { request, playlistId } = sp || {}

  const isPlaylist = request === 'playlists' && !!playlistId

  let data: ShortsData | null = null

  if (isPlaylist) {
    const res = await playlistApi.getPlaylistItem(Number(playlistId))

    const playlistItems = res.data.content ?? []

    const shortsList = mapPlaylistShortsToShortsBase(playlistItems)

    data = {
      shortsList,
      initialIndex: 0,
    }
  } else {
    const res = await getShortsDetailList(id)

    data = {
      shortsList: res?.shortsList ?? [],
      initialIndex: res?.initialIndex ?? 0,
    }
  }

  if (!data || data.shortsList.length === 0) {
    notFound()
  }

  return (
    <div className="relative h-dvh w-full md:h-full">
      <section
        aria-labelledby="shortform-content"
        className="flex h-dvh w-full items-stretch md:h-full"
      >
        <ShortsContainer
          playlistId={playlistId}
          shortsList={data.shortsList}
          initialIndex={data.initialIndex}
          isPlaylist={isPlaylist}
        />
      </section>
    </div>
  )
}
