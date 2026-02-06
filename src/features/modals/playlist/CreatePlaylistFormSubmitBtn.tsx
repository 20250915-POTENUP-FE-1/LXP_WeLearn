import { Button } from '@/components/ui/Button'

interface CreatePlaylistFormSubmitBtnProps {
  handleActiveTab: () => void
  playlistTitle: string
  isPending: boolean
  // handleCreatePlaylist: () => void
}

export default function CreatePlaylistFormSubmitBtn({
  handleActiveTab,
  playlistTitle,
  isPending,
}: CreatePlaylistFormSubmitBtnProps) {
  return (
    <div className="sticky bottom-0 flex w-full gap-3 border-t border-gray-200 px-6 py-4 md:absolute">
      <Button
        variant="accent"
        onClick={handleActiveTab}
        className="flex-1 rounded-lg bg-gray-200 px-6 py-5 font-medium text-gray-700 transition-colors hover:bg-gray-300"
      >
        취소
      </Button>
      <Button
        type="submit"
        form="playlist-form"
        variant="accent"
        disabled={!playlistTitle.trim() || isPending}
        className="flex-1 rounded-lg px-6 py-5 font-medium text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-700"
      >
        생성
      </Button>
    </div>
  )
}
