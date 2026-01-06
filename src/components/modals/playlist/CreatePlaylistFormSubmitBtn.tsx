interface CreatePlaylistFormSubmitBtnProps {
  handleActiveTab: () => void
  playlistTitle: string
  // handleCreatePlaylist: () => void
}

export default function CreatePlaylistFormSubmitBtn({
  handleActiveTab,
  playlistTitle,
}: CreatePlaylistFormSubmitBtnProps) {
  return (
    <div className="sticky bottom-0 flex w-full gap-3 border-t border-gray-200 px-6 py-4 md:absolute">
      <button
        onClick={handleActiveTab}
        className="flex-1 rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-300"
      >
        취소
      </button>
      <button
        type="button"
        // onClick={handleCreatePlaylist}
        disabled={!playlistTitle.trim()}
        className="flex-1 rounded-lg bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        생성
      </button>
    </div>
  )
}
