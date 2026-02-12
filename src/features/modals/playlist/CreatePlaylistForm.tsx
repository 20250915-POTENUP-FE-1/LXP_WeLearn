'use client'
import { useActionState, useEffect, useState } from 'react'
import CreatePlaylistFormHeader from './CreatePlaylistFormHeader'
import CreatePlaylistFormInput from './CreatePlaylistFormInput'
import CreatePlaylistFormSubmitBtn from './CreatePlaylistFormSubmitBtn'
import { createPlaylistAction } from './action'
import { toast } from 'react-toastify'
import { PlaylistItems } from '@/types/playlist/playlist'
import { usePlaylist } from '@/shared/store/playlist/playlist.store'

interface CratePlaylistFormProps {
  handleActiveTab: () => void
  shortsId: number
}
export default function CreatePlaylistForm({ handleActiveTab, shortsId }: CratePlaylistFormProps) {
  const [playlistTitle, setPlaylistTitle] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const setPlaylist = usePlaylist((state) => state.setPlaylist)
  const [createPlaylistState, creatingPlaylistAction, isPending] = useActionState(
    createPlaylistAction,
    {
      success: false,
      message: '',
      data: {} as PlaylistItems,
    },
  )

  useEffect(() => {
    if (createPlaylistState.success && createPlaylistState.data) {
      setPlaylist(createPlaylistState.data)
      handleActiveTab()
      // toast.success(`${createPlaylistState.data?.title} 플레이 리스트가 생성되었습니다.🎶`)
      toast.success('플레이 리스트가 생성되었습니다.🎶')
    } else if (createPlaylistState.success === false && createPlaylistState.message) {
      toast.error('플레이 리스트 등록에 실패하였습니다.')
    }
  })

  return (
    <>
      <CreatePlaylistFormHeader shortsId={shortsId} />
      <form action={creatingPlaylistAction} id="playlist-form">
        <input type="hidden" name="shortsId" value={shortsId} />
        <div className="space-y-6 px-6 py-6">
          <CreatePlaylistFormInput
            isPublic={isPublic}
            setIsPublic={setIsPublic}
            playlistTitle={playlistTitle}
            setPlaylistTitle={setPlaylistTitle}
          />
        </div>
        <CreatePlaylistFormSubmitBtn
          isPending={isPending}
          playlistTitle={playlistTitle}
          handleActiveTab={handleActiveTab}
        />
      </form>
    </>
  )
}
