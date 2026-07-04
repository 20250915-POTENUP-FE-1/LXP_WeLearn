'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { toast } from 'react-toastify'
import { RECOMMENDATION_LIMIT } from '@/constants/shorts'
import { clientApi } from '@/lib/utils/clientApiUtils'
import { ApiResponse } from '@/types/api/api'
import { PlaylistItems } from '@/types/playlist/playlist'
import {
  PageResponse,
  ShortsBase,
  ShortsRecommendationPage,
  ShortsRecommendationPageInfo,
} from '@/types/shorts/shorts'
import { mapPlaylistShortsToShortsBase } from '@/lib/utils/playlistToShorts'
import { mapRecommendationToShortsBase } from '@/lib/utils/recommendationToShorts'

export interface UseShortsFeedOptions {
  feedMode: 'playlist' | 'recommendation'
  initialShortsList: ShortsBase[]
  playlistId: string | string[] | undefined
  currentIndex: number
  totalElements?: number
  seedShortsId?: number
  initialRecommendationPageInfo?: ShortsRecommendationPageInfo
}

export interface UseShortsFeedResult {
  list: ShortsBase[]
  isFetching: boolean
  hasNextInList: boolean
  canFetchRecommendation: boolean
  isLoadingNext: boolean
  fetchMore: () => Promise<number>
  releaseAutoFetchBlock: () => void
  toggleLike: (shortsId: number) => Promise<void>
}

export function useShortsFeed({
  feedMode,
  initialShortsList,
  playlistId,
  currentIndex,
  totalElements,
  seedShortsId,
  initialRecommendationPageInfo,
}: UseShortsFeedOptions): UseShortsFeedResult {
  const [list, setList] = useState<ShortsBase[]>(initialShortsList)
  const [page, setPage] = useState(0)
  const [isFetching, setIsFetching] = useState(false)
  const [recommendationPageInfo, setRecommendationPageInfo] = useState<
    ShortsRecommendationPageInfo | undefined
  >(initialRecommendationPageInfo)
  const [isRecommendationExhausted, setIsRecommendationExhausted] = useState(false)

  const listRef = useRef(list)
  listRef.current = list

  const currentIndexRef = useRef(currentIndex)
  currentIndexRef.current = currentIndex

  const autoFetchBlockedRef = useRef(false)

  const hasNextInList = currentIndex < list.length - 1
  const canFetchRecommendation =
    feedMode === 'recommendation' && !!seedShortsId && !isRecommendationExhausted
  const isLoadingNext = isFetching && !hasNextInList

  const appendUniqueShorts = useCallback((nextShorts: ShortsBase[]) => {
    if (nextShorts.length === 0) return 0

    const existingIds = new Set(listRef.current.map((s) => s.shortsId))
    const toAppend = nextShorts.filter((s) => !existingIds.has(s.shortsId))

    if (toAppend.length > 0) {
      setList((prev) => [...prev, ...toAppend])
    }

    return toAppend.length
  }, [])

  const fetchMorePlaylist = useCallback(async () => {
    if (totalElements != null && listRef.current.length >= totalElements) return 0

    const res = await clientApi.get<ApiResponse<PageResponse<PlaylistItems[]>>>(
      `/api/v1/playlists/${playlistId}?page=${page}&size=10`,
    )

    const nextShortsList = mapPlaylistShortsToShortsBase(res.data.content ?? [])
    const addedCount = appendUniqueShorts(nextShortsList)

    if (addedCount > 0) {
      setPage((prev) => prev + 1)
    }

    return addedCount
  }, [appendUniqueShorts, page, playlistId, totalElements])

  const fetchMoreRecommendations = useCallback(async () => {
    if (!seedShortsId) return 0

    const shouldContinueCurrentBatch = recommendationPageInfo?.hasNext ?? false
    const offset = shouldContinueCurrentBatch ? recommendationPageInfo?.nextOffset : 0
    // ref로 읽어서 currentIndex 변화에 의한 불필요한 콜백 재생성을 방지
    const lastShortsId = shouldContinueCurrentBatch
      ? undefined
      : listRef.current[currentIndexRef.current]?.shortsId

    const res = await clientApi.get<ApiResponse<ShortsRecommendationPage>>(
      `/api/v1/recommendations/shorts/${seedShortsId}`,
      {
        params: { offset, limit: RECOMMENDATION_LIMIT, lastShortsId },
      },
    )

    const nextShortsList = mapRecommendationToShortsBase(res.data.recommendations ?? [])
    const addedCount = appendUniqueShorts(nextShortsList)

    setRecommendationPageInfo(res.data.pageInfo)

    if (!res.data.pageInfo.hasNext) {
      setIsRecommendationExhausted(true)
    }

    return addedCount
  }, [appendUniqueShorts, recommendationPageInfo, seedShortsId])

  const fetchMore = useCallback(async () => {
    if (isFetching) return 0

    setIsFetching(true)

    try {
      if (feedMode === 'playlist') {
        return await fetchMorePlaylist()
      }
      return await fetchMoreRecommendations()
    } catch (error) {
      console.error('shorts fetch more failed:', error)
      if (feedMode === 'recommendation') {
        autoFetchBlockedRef.current = true
      }
      toast.error('영상을 불러오지 못했습니다.')
      return 0
    } finally {
      setIsFetching(false)
    }
  }, [feedMode, fetchMorePlaylist, fetchMoreRecommendations, isFetching])

  useEffect(() => {
    const remain = list.length - currentIndex - 1
    if (remain > 2 || isFetching || autoFetchBlockedRef.current) return

    if (feedMode === 'playlist') {
      const isLastPage = totalElements != null && list.length >= totalElements
      if (!isLastPage) fetchMore()
      return
    }

    const shouldPrefetch = recommendationPageInfo?.hasNext ? remain <= 2 : remain <= 0
    if (canFetchRecommendation && shouldPrefetch) {
      fetchMore()
    }
  }, [
    canFetchRecommendation,
    currentIndex,
    feedMode,
    fetchMore,
    isFetching,
    list.length,
    recommendationPageInfo?.hasNext,
    totalElements,
  ])

  const releaseAutoFetchBlock = useCallback(() => {
    autoFetchBlockedRef.current = false
  }, [])

  const toggleLike = useCallback(async (shortsId: number) => {
    const applyToggle = (prev: ShortsBase[]) =>
      prev.map((short) =>
        short.shortsId === shortsId
          ? {
              ...short,
              isLiked: !short.isLiked,
              likeCount: short.isLiked ? short.likeCount - 1 : short.likeCount + 1,
            }
          : short,
      )

    setList(applyToggle)

    try {
      await clientApi.post(`/api/v1/shorts/${shortsId}/likes`, { shortsId })
      toast.success('좋아요 성공하였습니다.')
    } catch {
      setList(applyToggle)
    }
  }, [])

  return {
    list,
    isFetching,
    hasNextInList,
    canFetchRecommendation,
    isLoadingNext,
    fetchMore,
    releaseAutoFetchBlock,
    toggleLike,
  }
}
