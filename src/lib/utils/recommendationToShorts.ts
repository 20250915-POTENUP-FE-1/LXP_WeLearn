import { ShortsBase, ShortsRecommendationItem } from '@/types/shorts/shorts'

export function mapRecommendationToShortsBase(data: ShortsRecommendationItem[]): ShortsBase[] {
  return data.map((item) => ({
    shortsId: item.shorts.shortsId,
    title: item.shorts.title,
    description: item.shorts.description ?? '',
    categoryId: item.shorts.categoryId ?? 0,
    categoryName: item.shorts.categoryName ?? '',
    keywords: item.shorts.keywords ?? [],

    videoUrl: item.shorts.videoUrl,
    thumbnailUrl: item.shorts.thumbnailUrl ?? null,
    durationSec: item.shorts.durationSec ?? 0,

    userId: item.shorts.userId ?? 0,
    userNickname: item.shorts.userNickname ?? '',
    userProfileUrl: item.shorts.userProfileUrl ?? null,

    status: item.shorts.status,
    visibility: item.shorts.visibility,
    likeCount: item.shorts.likeCount ?? 0,
    viewCount: item.shorts.viewCount ?? 0,
    commentCount: item.shorts.commentCount ?? 0,
    isLiked: item.shorts.isLiked ?? false,

    createdAt: item.shorts.createdAt ?? '',
    updatedAt: item.shorts.updatedAt ?? '',
  }))
}
