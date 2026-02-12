import { Eye, Heart, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PlaylistInfo, PlaylistItems } from '@/types/playlist/playlist'
import { useShortsAutoPlay } from '@/hook/mypage/useShortsAutoPlay'
import PlaylistPreviewHeader from './PlaylistPreviewHeader'
import { DEFAULT_IMAGES } from '@/constants/shortsImages'

interface PlaylistPreviewProps {
  playlistItem: PlaylistInfo
  selectedShorts: PlaylistItems | null
}
export default function PlaylistPreview({ playlistItem, selectedShorts }: PlaylistPreviewProps) {
  const { videoRef, handleLoadedData } = useShortsAutoPlay({
    enabled: Boolean(selectedShorts?.shorts.videoUrl),
  })

  return (
    <div className="order-1 w-full lg:order-1 lg:shrink-0 lg:px-5">
      <div className="flex flex-col gap-6 py-8 md:py-0 lg:sticky lg:top-24">
        {/* Page Title */}
        <PlaylistPreviewHeader playlistItem={playlistItem} />

        {/* Preview Card */}
        <div className="relative mx-auto aspect-9/16 w-full overflow-hidden rounded-2xl bg-gray-200 shadow-lg md:w-[360px] lg:mx-0">
          {/* 상단 카테고리 뱃지 */}
          <div className="absolute top-3 right-3 left-3 z-10 flex items-center justify-between">
            {selectedShorts?.shorts.category ? (
              <span className="inline-flex items-center rounded-full bg-black/55 px-3 py-1 text-[10px] font-medium text-white">
                {selectedShorts.shorts.category.name}
              </span>
            ) : (
              <span />
            )}
          </div>

          {/* 비디오/썸네일 영역 */}
          <div className="absolute inset-0">
            {selectedShorts?.shorts.videoUrl ? (
              <video
                ref={videoRef}
                src={selectedShorts.shorts.videoUrl}
                className="h-full w-full object-cover"
                playsInline
                muted
                preload="metadata"
                poster={selectedShorts.shorts.thumbnailUrl ?? undefined}
                onLoadedData={handleLoadedData}
                loop={true}
              />
            ) : selectedShorts?.shorts.thumbnailUrl ? (
              <Image
                src={selectedShorts.shorts.thumbnailUrl}
                alt={selectedShorts.shorts.title ?? '썸네일'}
                fill
                sizes="380px"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-500" />
            )}
          </div>

          {/* 하단 그라데이션 */}
          <div className="absolute inset-x-0 bottom-0 h-[48%] bg-linear-to-t from-black/85 via-black/45 to-transparent" />

          {/* 하단 정보 영역 */}
          <div className="absolute right-0 bottom-0 left-0 p-5">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
                {selectedShorts?.shorts && (
                  <img
                    src={selectedShorts.shorts.uploader.profileUrl ?? DEFAULT_IMAGES.AVATAR}
                    alt={'프로필'}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <span className="text-md font-medium text-gray-200">
                {selectedShorts?.shorts.uploader.nickname ?? '숏터'}
              </span>
            </div>
            <h3 className="mb-2 line-clamp-2 text-[18px] leading-snug font-semibold text-white">
              {selectedShorts?.shorts.title}
            </h3>

            {selectedShorts?.shorts.description && (
              <p className="mb-4 line-clamp-2 h-[3.25em] text-sm leading-relaxed text-gray-200/90">
                {selectedShorts.shorts.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex justify-center gap-3">
                {selectedShorts?.shorts.likeCount !== undefined && (
                  <span className="flex items-center gap-1 py-1 text-[10px] text-gray-100">
                    <Heart size={12} /> {selectedShorts?.shorts.likeCount}
                  </span>
                )}

                {selectedShorts?.shorts.viewCount !== undefined && (
                  <span className="flex items-center gap-1 py-1 text-[10px] text-gray-100">
                    <Eye size={12} /> {selectedShorts?.shorts.viewCount}
                  </span>
                )}
              </div>

              {selectedShorts?.shorts.keywords && (
                <span className="rounded-full border border-white/25 px-3 py-1 text-[10px] text-gray-100">
                  #{selectedShorts.shorts.keywords[0]}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 재생 버튼 */}
        <Link
          href={`/shorts/${selectedShorts?.shorts.shortsId}?request=playlists&playlistId=${playlistItem.id}`}
          className="group w-full md:w-90"
        >
          <button className="flex w-full items-center justify-center gap-2 rounded-full bg-black py-5 text-lg font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-100 hover:shadow-lg">
            <Play
              strokeWidth={1.5}
              size={30}
              className="transition-transform duration-500 group-hover:rotate-360"
            />
            모두 재생
          </button>
        </Link>
      </div>
    </div>
  )
}
