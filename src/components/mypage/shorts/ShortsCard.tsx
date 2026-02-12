'use client'

import { useState, useEffect } from 'react'
import { Ban, LoaderCircle, MoreHorizontal } from 'lucide-react'
import ShortsCardThumbnail from './ShortsCardThumbnail'
import { DEFAULT_IMAGES } from '@/constants/shortsImages'
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import MyShortsDropdownMenu from '@/features/mypage/myshorts/MyShortsDropdownMenu'
import LikeShortsDropdownMenu from '@/features/mypage/likes/LikeShortsDropdownMenu'
import ShortsStatusBadge from './ShortsStatusBadge'
import { timeAgo } from '@/utils/timeAgo'
import { ShortsBase } from '@/types/shorts/shorts'
import { Button } from '@/components/ui/Button'

type ModeType = 'LIKE_SHORTS' | 'MY_SHORTS'
interface ShortsCardProps {
  shorts: ShortsBase
  isSelected?: boolean
  onSelect?: () => void
  onToggleVisibility?: () => void
  onDelete?: () => void
  onLikeDelete?: () => void
  mode: ModeType
}

export default function ShortsCard({
  shorts,
  isSelected = false,
  onSelect,
  onToggleVisibility,
  onDelete,
  onLikeDelete,
  mode,
}: ShortsCardProps) {
  const [timeAgoText, setTimeAgoText] = useState<string>('')
  const isReviewing = shorts.status === 'PENDING' || shorts.status === 'AI_CHECK'
  const isRejected = shorts.status === 'REJECT'

  useEffect(() => {
    if (shorts.createdAt) {
      setTimeAgoText(timeAgo(shorts.createdAt))
    }
  }, [shorts.createdAt])

  return (
    <div
      onClick={onSelect}
      className={`relative flex cursor-pointer gap-4 overflow-hidden rounded-lg border bg-white p-4 transition-shadow hover:shadow-md ${
        isSelected ? 'border-green-500 ring-1 ring-green-500' : 'rounded-lg border-gray-200'
      }`}
    >
      {/* 검토 중 오버레이 */}
      {isReviewing && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg border-2 border-transparent bg-gray-100/80">
          <div className="flex items-center gap-2 px-4 py-2">
            <LoaderCircle size={30} color="gray" className="animate-spin text-white" />
            <span className="text-md pl-3 font-bold text-black">
              검토 중 입니다. <br /> 잠시만 기다려주세요.
            </span>
          </div>
        </div>
      )}

      {/* 반려됨 오버레이 */}
      {isRejected && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100/80">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center gap-2 px-4 py-2">
              <Ban size={30} className="text-red-600" />
              <span className="text-md pl-3 font-bold text-red-600">
                검토 결과 반려되었습니다. <br />
                {shorts.shortsStatusDescription || '삭제 후 다시 업로드 해주세요.'}
              </span>
            </div>
            <Button
              onClick={(e) => {
                e.stopPropagation()
                onDelete?.()
              }}
              className="rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-500"
            >
              삭제하기
            </Button>
          </div>
        </div>
      )}

      {/* 썸네일 */}
      <ShortsCardThumbnail
        thumbnailUrl={shorts.thumbnailUrl || DEFAULT_IMAGES.THUMBNAIL}
        shorts={shorts}
      />

      <div className="flex min-w-0 flex-1 flex-col p-2 lg:p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            {shorts.status && (
              <ShortsStatusBadge shortsStatus={shorts.status} visibility={shorts.visibility} />
            )}

            <h3 className="pt-1 text-lg font-bold text-gray-900">{shorts.title}</h3>
            <p className="my-1 line-clamp-1 text-sm text-gray-700">{shorts.description}</p>

            <p className="mt-2 mb-4 text-sm text-gray-500">
              {shorts.userNickname ?? '숏터'} · 조회수 {shorts.viewCount}회
              {timeAgoText && ` · ${timeAgoText}`}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                onClick={(e) => e.stopPropagation()}
                className="shrink-0 rounded-full p-1 transition-colors hover:bg-gray-100"
              >
                <MoreHorizontal size={18} className="text-black" />
              </button>
            </DropdownMenuTrigger>
            {mode === 'LIKE_SHORTS' ? (
              <LikeShortsDropdownMenu
                // handleSaveToPlaylist={handleSaveToPlaylist}
                onLikeDelete={onLikeDelete}
              />
            ) : (
              <MyShortsDropdownMenu
                shortsId={shorts.shortsId!}
                visibility={shorts.visibility}
                onToggleVisibility={onToggleVisibility}
                onDelete={onDelete}
              />
            )}
          </DropdownMenu>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2">
          {shorts.keywords?.map((keyword: string, index: number) => (
            <span key={index} className="px-1 py-1 text-xs text-gray-900">
              #{keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
