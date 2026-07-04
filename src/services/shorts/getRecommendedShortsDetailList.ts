import { RECOMMENDATION_LIMIT } from '@/constants/shorts'
import { mapRecommendationToShortsBase } from '@/lib/utils/recommendationToShorts'
import { ShortsBase, ShortsRecommendationPageInfo } from '@/types/shorts/shorts'
import { shortsApi } from './shorts.service'

export interface RecommendedShortsListResult {
  shortsList: ShortsBase[]
  initialIndex: number
  seedShortsId: number
  recommendationPageInfo: ShortsRecommendationPageInfo
}

const EMPTY_RECOMMENDATION_PAGE_INFO: ShortsRecommendationPageInfo = {
  offset: 0,
  limit: RECOMMENDATION_LIMIT,
  totalCount: 0,
  hasNext: false,
  nextOffset: 0,
}

export async function getRecommendedShortsDetailList(
  startId: string,
): Promise<RecommendedShortsListResult | null> {
  const seedShortsId = Number(startId)

  if (!Number.isFinite(seedShortsId) || seedShortsId <= 0) {
    return null
  }

  try {
    const detailResponse = await shortsApi.shortsDetail(seedShortsId)
    const currentShorts = resolveShortsDetail(detailResponse.data)

    if (!currentShorts) {
      return null
    }

    try {
      const recommendationResponse = await shortsApi.shortsRecommendation(
        seedShortsId,
        0,
        RECOMMENDATION_LIMIT,
      )
      const recommendedShorts = mapRecommendationToShortsBase(
        recommendationResponse.data.recommendations ?? [],
      )
      const shortsList = dedupeShorts([currentShorts, ...recommendedShorts])

      return {
        shortsList,
        initialIndex: 0,
        seedShortsId,
        recommendationPageInfo: recommendationResponse.data.pageInfo,
      }
    } catch (error) {
      console.error('shorts recommendation list fetch failed:', error)

      return {
        shortsList: [currentShorts],
        initialIndex: 0,
        seedShortsId,
        recommendationPageInfo: EMPTY_RECOMMENDATION_PAGE_INFO,
      }
    }
  } catch (error) {
    console.error('shorts detail fetch failed:', error)
    return null
  }
}

function resolveShortsDetail(data: unknown): ShortsBase | null {
  if (isShortsBase(data)) return data

  if (typeof data === 'object' && data !== null && 'content' in data) {
    const content = (data as { content?: unknown }).content
    if (Array.isArray(content) && isShortsBase(content[0])) {
      return content[0]
    }
  }

  return null
}

function isShortsBase(value: unknown): value is ShortsBase {
  return (
    typeof value === 'object' &&
    value !== null &&
    'shortsId' in value &&
    typeof (value as { shortsId?: unknown }).shortsId === 'number'
  )
}

function dedupeShorts(shortsList: ShortsBase[]) {
  const seen = new Set<number>()

  return shortsList.filter((shorts) => {
    if (seen.has(shorts.shortsId)) return false
    seen.add(shorts.shortsId)
    return true
  })
}
