import { notFound } from 'next/navigation'
import ShortsContainer from '@/features/shorts/components/ShortsContainer'
import { playlistApi } from '@/services/playlist/playlist.service'
import { getRecommendedShortsDetailList } from '@/services/shorts/getRecommendedShortsDetailList'
import { ShortsBase, ShortsRecommendationPageInfo } from '@/types/shorts/shorts'
import { mapPlaylistShortsToShortsBase } from '@/lib/utils/playlistToShorts'

interface ShortsDetailPageProps {
  params: Promise<{ id: string }>
  searchParams?: { [key: string]: string | string[] | undefined }
}

interface ShortsData {
  shortsList: ShortsBase[]
  initialIndex: number
  totalElements?: number
  seedShortsId?: number
  recommendationPageInfo?: ShortsRecommendationPageInfo
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
    const shortsList = mapPlaylistShortsToShortsBase(playlistItems)

    data = {
      shortsList,
      initialIndex: 0,
      totalElements: res.data.shortsCount,
    }
  } else {
    const res = await getRecommendedShortsDetailList(id)
    data = {
      shortsList: res?.shortsList ?? [],
      initialIndex: res?.initialIndex ?? 0,
      seedShortsId: res?.seedShortsId,
      recommendationPageInfo: res?.recommendationPageInfo,
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
          feedMode={isPlaylist ? 'playlist' : 'recommendation'}
          totalElements={data.totalElements}
          seedShortsId={data.seedShortsId}
          initialRecommendationPageInfo={data.recommendationPageInfo}
        />
      </section>
    </div>
  )
}
