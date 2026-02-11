'use client'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/shared/store/auth/auth.store'
import { PlaylistInfo } from '@/types/playlist/playlist'
import { SquarePen, X } from 'lucide-react'
import { useActionState, useEffect, useState } from 'react'
import { patchPlaylistInfo } from './action'
import { toast } from 'react-toastify'

interface PlaylistPreviewHeaderProps {
  playlistItem: PlaylistInfo
}

export default function PlaylistPreviewHeader({ playlistItem }: PlaylistPreviewHeaderProps) {
  const userData = useAuth((state) => state.auth)
  const isOwner = userData?.userId === playlistItem.owner.id

  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(playlistItem.title)
  const [description, setDescription] = useState(playlistItem.description ?? '')

  const [patchPlaylistMetaState, patchPlaylistaction] = useActionState(patchPlaylistInfo, {
    success: false,
    data: {},
    message: '',
  })

  useEffect(() => {
    if (patchPlaylistMetaState.success && patchPlaylistMetaState.data) {
      setEditMode(false)
      toast.success('플레이리스트 정보가 업데이트되었습니다.')
    }
    if (!patchPlaylistMetaState.success && patchPlaylistMetaState.message) {
      toast.error(patchPlaylistMetaState.message)
    }
  }, [patchPlaylistMetaState])

  function handleCancel() {
    setTitle(playlistItem.title)
    setDescription(playlistItem.description ?? '')
    setEditMode(false)
  }

  return (
    <form className="relative flex h-30 w-90 flex-col" action={patchPlaylistaction}>
      <input type="hidden" name="playlistId" value={playlistItem.id} />

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          {editMode ? (
            <div className="relative flex w-full items-center">
              <input
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border-b border-gray-200 bg-transparent py-0 pr-6 text-xl font-semibold tracking-tight text-gray-900 transition-colors outline-none focus:border-gray-900"
                placeholder="제목을 입력하세요"
                autoFocus
              />
              {title && (
                <button
                  type="button"
                  onClick={() => setTitle('')}
                  className="absolute right-0 text-gray-400 hover:text-gray-700"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ) : (
            <h1 className="border-b border-transparent text-center text-xl font-semibold tracking-tight text-gray-900 lg:text-left">
              {title}
            </h1>
          )}
          {isOwner && !editMode && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="shrink-0 text-gray-400 hover:text-gray-700"
              onClick={() => setEditMode(true)}
            >
              <SquarePen size={16} />
            </Button>
          )}
        </div>

        {editMode ? (
          <div className="relative flex w-full items-center">
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-none border-b border-gray-200 bg-transparent py-0 pr-6 text-sm leading-relaxed text-gray-900 transition-colors outline-none focus:border-gray-900"
              placeholder="설명을 입력하세요"
              rows={2}
            />
            {description && (
              <button
                type="button"
                onClick={() => setDescription('')}
                className="absolute top-0 right-0 text-gray-400 hover:text-gray-700"
              >
                <X size={14} />
              </button>
            )}
          </div>
        ) : (
          playlistItem.description && (
            <p className="line-clamp-2 border-b border-transparent py-0 text-sm leading-relaxed text-gray-500">
              {description}
            </p>
          )
        )}

        {editMode && (
          <div className="flex gap-1.5 self-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={handleCancel}
            >
              닫기
            </Button>
            <Button type="submit" variant="accent" size="sm" className="text-xs">
              수정
            </Button>
          </div>
        )}
      </div>
    </form>
  )
}
