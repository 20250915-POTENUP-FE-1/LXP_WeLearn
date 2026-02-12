import { PlaylistItems } from '@/types/playlist/playlist'
import { ShortsBase } from '@/types/shorts/shorts'

export function mapPlaylistShortsToShortsBase(items: PlaylistItems[]): ShortsBase[] {
  return items.map((item) => ({
    shortsId: item.shorts.shortsId,
    title: item.shorts.title,
    description: item.shorts.description ?? '',
    categoryId: item.shorts.category.id ?? 0,
    categoryName: item.shorts.category.name ?? '',
    keywords: item.shorts.keywords ?? [],

    videoUrl: item.shorts.videoUrl,
    thumbnailUrl: item.shorts.thumbnailUrl ?? null,
    durationSec: item.shorts.durationSec ?? 0,

    userId: item.shorts.uploader.id ?? 0,
    userNickname: item.shorts.uploader.nickname ?? '',
    userProfileUrl: item.shorts.uploader.profileUrl ?? null,

    status: item.shorts.status,
    visibility: item.shorts.visibility,
    likeCount: item.shorts.likeCount ?? 0,
    viewCount: item.shorts.viewCount ?? 0,
    commentCount: item.shorts.commentCount || 0,
    isLiked: item.shorts.isLiked,

    createdAt: item.shorts.createdAt ?? '',
    updatedAt: item.shorts.updatedAt ?? '',
  }))
}
