'use client'
import { useState } from 'react'
import CreatePlaylistFormHeader from './CreatePlaylistFormHeader'
import CreatePlaylistFormInput from './CreatePlaylistFormInput'
import CreatePlaylistFormSubmitBtn from './CreatePlaylistFormSubmitBtn'

interface CratePlaylistFormProps {
  handleActiveTab: () => void
  id: string
}
export default function CreatePlaylistForm({ handleActiveTab, id }: CratePlaylistFormProps) {
  const [playlistTitle, setPlaylistTitle] = useState('')
  const [isPublic, setIsPublic] = useState(true)

  return (
    <>
      <CreatePlaylistFormHeader id={id} />
      <div className="space-y-6 px-6 py-6">
        <CreatePlaylistFormInput
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          playlistTitle={playlistTitle}
          setPlaylistTitle={setPlaylistTitle}
        />
      </div>
      <CreatePlaylistFormSubmitBtn
        playlistTitle={playlistTitle}
        handleActiveTab={handleActiveTab}
      />
    </>
  )
}
