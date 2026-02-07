'use client'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/shared/store/auth/auth.store'
import { Playlist } from '@/types/playlist/playlist'
import { SquarePen } from 'lucide-react'
import { useState } from 'react'

interface PlaylistPreviewHeaderProps {
  playlistItem: Playlist
}

export default function PlaylistPreviewHeader({ playlistItem }: PlaylistPreviewHeaderProps) {
  const userData = useAuth((state) => state.auth)
  const test = userData?.userId === playlistItem.owner.id
  const isOwner = true

  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(playlistItem.title)
  const [description, setDescription] = useState(playlistItem.description ?? '')

  function handleCancel() {
    setTitle(playlistItem.title)
    setDescription(playlistItem.description ?? '')
    setEditMode(false)
  }

  return (
    <form className="flex h-30 w-90 justify-between gap-10">
      <input type="hidden" name="playlistId" value={playlistItem.id} />

      <div className="flex w-full flex-col gap-3 pt-8 md:pt-0">
        {editMode ? (
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-b border-gray-300 px-1 py-2 text-2xl font-black focus:border-b-black focus:outline-none"
            autoFocus
          />
        ) : (
          <h1 className="text-center text-2xl font-black text-gray-900 uppercase lg:text-left">
            {title}
          </h1>
        )}
        {editMode ? (
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full resize-none rounded-md border border-gray-300 bg-transparent p-2 text-sm outline-none focus:border-gray-600"
            placeholder="설명 입력"
          />
        ) : (
          playlistItem.description && <div className="text-sm text-gray-500">{description}</div>
        )}
      </div>

      {isOwner &&
        (!editMode ? (
          <Button type="button" variant="ghost" onClick={() => setEditMode(true)}>
            <SquarePen />
          </Button>
        ) : (
          <div className="flex flex-col justify-center gap-2">
            <Button type="submit" variant="accent">
              저장
            </Button>
            <Button type="button" onClick={handleCancel}>
              취소
            </Button>
          </div>
        ))}
    </form>
  )
}
