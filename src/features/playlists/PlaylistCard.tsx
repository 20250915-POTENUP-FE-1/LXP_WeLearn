'use client'

import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { PlaylistItems, PlaylistOwner } from '@/types/playlist/playlist'
import { MoreHorizontal, Tally3 } from 'lucide-react'
import Image from 'next/image'
import PlaylistDropdownMenu from './PlaylistDropdownMenu'
import { timeAgo } from '@/utils/timeAgo'

import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'
import { useRouter } from 'next/navigation'
import { clientApi } from '@/lib/utils/clientApiUtils'

interface PlaylistCardProps {
  playlistId: number
  editMode: boolean
  shortsList: PlaylistItems[]
  setShortsList: (value: PlaylistItems[] | ((prev: PlaylistItems[]) => PlaylistItems[])) => void
  handlePreview: (shorts: PlaylistItems) => void
  playlistOwner: PlaylistOwner
  selectedShorts: PlaylistItems | null
  setSelectedShorts: (value: PlaylistItems | null) => void
}

export default function PlaylistCard({
  playlistId,
  editMode,
  shortsList: items,
  setShortsList: setItems,
  handlePreview,
  playlistOwner,
  selectedShorts,
  setSelectedShorts,
}: PlaylistCardProps) {
  const router = useRouter()

  if (!items || items.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center text-xl text-gray-500">
        영상이 없습니다.
      </div>
    )
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = items.findIndex((i) => i.itemId === active.id)
    const newIndex = items.findIndex((i) => i.itemId === over.id)
    const activeItem = items.find((i) => i.itemId === active.id)

    await clientApi.patch(`/api/v1/playlists/${playlistId}/items/reorder`, {
      data: { shortsId: activeItem?.shorts.shortsId, newIndex },
      playlistId,
    })

    const newItems = arrayMove(items, oldIndex, newIndex)
    setItems(newItems)
    router.refresh()
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
    >
      <SortableContext items={items.map((i) => i.itemId)} strategy={verticalListSortingStrategy}>
        <div className="space-y-6">
          {items.map((short) => (
            <SortablePlaylistItem
              key={short.itemId}
              short={short}
              items={items}
              editMode={editMode}
              handlePreview={handlePreview}
              selectedShorts={selectedShorts}
              playlistOwner={playlistOwner}
              playlistId={playlistId}
              setItems={setItems}
              setSelectedShorts={setSelectedShorts}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

function SortablePlaylistItem({
  short,
  editMode,
  selectedShorts,
  playlistOwner,
  playlistId,
  items,
  handlePreview,
  setItems,
  setSelectedShorts,
}: {
  short: PlaylistItems
  editMode: boolean
  selectedShorts: PlaylistItems | null
  playlistOwner: PlaylistOwner
  playlistId: number
  items: PlaylistItems[]
  handlePreview: (shorts: PlaylistItems) => void
  setItems: (value: PlaylistItems[] | ((prev: PlaylistItems[]) => PlaylistItems[])) => void
  setSelectedShorts: (value: PlaylistItems | null) => void
}) {
  const { setNodeRef, transform, transition, attributes, listeners, isDragging } = useSortable({
    id: short.itemId,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(editMode ? attributes : {})}
      {...(editMode ? listeners : {})}
      onClick={() => !editMode && handlePreview(short)}
      className={`flex gap-4 rounded-lg border bg-white p-4 transition-shadow ${
        editMode ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
      } ${isDragging ? 'scale-[0.99] opacity-60 shadow-lg' : 'hover:shadow-md'} ${
        selectedShorts?.itemId === short.itemId
          ? 'border-green-500 ring-1 ring-green-500'
          : 'border-gray-200'
      } `}
    >
      {/* 드래그 아이콘 UI */}
      {editMode && (
        <div className="flex items-center justify-center pr-1 text-gray-400">
          <Tally3 />
        </div>
      )}

      {/* 썸네일 */}
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

      {/* 내용 */}
      <div className="flex min-w-0 flex-1 flex-col p-2 lg:p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 pt-1 text-lg font-bold text-gray-900">
              {short.shorts.title}
            </h3>

            <p className="mb-1 line-clamp-2 text-sm text-gray-700">{short.shorts.description}</p>

            <p className="mt-1.5 mb-4 text-sm text-gray-500">
              {short.shorts.uploader.nickname} · 조회수 {short.shorts.viewCount}회 ·{' '}
              {timeAgo(short.shorts.createdAt)}
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
            <PlaylistDropdownMenu
              items={items}
              playlistOwner={playlistOwner}
              playlistId={playlistId}
              short={short}
              selectedShorts={selectedShorts}
              setItems={setItems}
              setSelectedShorts={setSelectedShorts}
            />
          </DropdownMenu>
        </div>

        {/* 태그 */}
        <div className="mt-auto flex flex-wrap gap-2">
          {short.shorts.keywords?.map((tag) => (
            <span key={tag} className="px-1 py-1 text-xs text-gray-900">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
