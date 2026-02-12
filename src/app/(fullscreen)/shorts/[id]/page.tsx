import { notFound } from 'next/navigation'
import ShortsContainer from '@/features/shorts/components/ShortsContainer'
import { playlistApi } from '@/services/playlist/playlist.service'
import { getShortsDetailList } from '@/services/shorts/getShortsDetailList'
import { ShortsBase } from '@/types/shorts/shorts'
import { mapPlaylistShortsToShortsBase } from '@/lib/utils/playlistToShorts'

interface ShortsDetailPageProps {
  params: Promise<{ id: string }>
  searchParams?: { [key: string]: string | string[] | undefined }
}

interface ShortsData {
  shortsList: ShortsBase[]
  initialIndex: number
  totalElement?: number
}

export default async function ShortsDetailPage({ params, searchParams }: ShortsDetailPageProps) {
  const { id } = await params
  const sp = await searchParams
  const { request, playlistId } = sp || {}

  const isPlaylist = request === 'playlists' && !!playlistId

  let data: ShortsData | null = null

  if (isPlaylist) {
    const res = await playlistApi.getPlaylistItem(Number(playlistId))
    const playlistItems = res.data.items ?? []
    console.log(res.data.items)
    const shortsList = mapPlaylistShortsToShortsBase(playlistItems)

    data = {
      shortsList,
      initialIndex: 0,
      totalElement: res.data.shortsCount,
    }
  } else {
    const res = await getShortsDetailList(id)
    data = {
      shortsList: res?.shortsList ?? [],
      initialIndex: res?.initialIndex ?? 0,
      totalElement: res?.totalElement,
    }
  }

  if (!data || data.shortsList.length === 0) {
    notFound()
  }
  return (
    <div className="relative h-dvh w-full md:h-full">
      <section
        aria-labelledby="shorts-content"
        className="flex h-dvh w-full items-stretch md:h-full"
      >
        <ShortsContainer
          playlistId={playlistId}
          shortsList={data.shortsList}
          initialIndex={data.initialIndex}
          isPlaylist={isPlaylist}
          totalElements={data.totalElement}
        />
      </section>
    </div>
  )
}
