'use client'

import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import LikeShortsDropdownMenu from '@/features/mypage/likes/LikeShortsDropdownMenu'
import { PlaylistItems, PlaylistOwner } from '@/types/playlist/playlist'
import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'

interface PlaylistCardProps {
  shortsList: PlaylistItems[] | null
  handlePreview: (shorts: PlaylistItems) => void
  playlistOwner: PlaylistOwner
}

export default function PlaylistCard({
  shortsList,
  handlePreview,
  playlistOwner,
}: PlaylistCardProps) {
  console.log(shortsList)
  if (!shortsList || shortsList.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center text-xl text-gray-500">
        영상이 없습니다.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {shortsList.map((short) => (
        <div
          onClick={() => handlePreview(short)}
          key={short.itemId}
          className="flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
        >
          <div className="relative h-48 w-28 shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:w-36">
            <Image
              src={short.shorts.thumbnailUrl}
              alt={short.shorts.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 112px, 144px"
            />
            {short.shorts.category && (
              <span className="absolute top-2 left-2 rounded-full bg-black/25 px-3 py-1 text-[10px] text-white">
                {short.shorts.category.name}
              </span>
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col p-2 lg:p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 pt-1 text-lg font-bold text-gray-900">
                  {short.shorts.title}
                </h3>

                <p className="mt-1.5 mb-4 text-sm text-gray-500">{short.shorts.userNickname}</p>

                <p className="mb-1 line-clamp-2 text-sm text-gray-700">
                  {short.shorts.description}
                </p>
              </div>

              {/* 더보기 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="shrink-0 rounded-full p-1 hover:bg-gray-100"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </DropdownMenuTrigger>
                <LikeShortsDropdownMenu playlistOwner={playlistOwner} />
              </DropdownMenu>
            </div>

            {/* 태그 */}
            <div className="mt-auto flex flex-wrap gap-2">
              {/* {short.tags?.map((tag) => (
                <span key={tag} className="px-1 py-1 text-xs text-gray-900">
                  #{tag}
                </span>
              ))} */}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
