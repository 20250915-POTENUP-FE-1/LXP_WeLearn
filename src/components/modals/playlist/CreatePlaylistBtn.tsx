import { Plus } from 'lucide-react'
interface CreatePlaylistBtnProps {
  handleActiveTab: () => void
}

export default function CreatePlaylistBtn({ handleActiveTab }: CreatePlaylistBtnProps) {
  return (
    <div className="absolute bottom-0 left-0 w-full border-t border-gray-200 px-6 py-4">
      <button
        onClick={handleActiveTab}
        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-200 bg-white py-3 transition-colors hover:border-black"
      >
        <Plus className="h-5 w-5 text-gray-700" />
        <span className="text-sm font-medium text-gray-700">create new playlist</span>
      </button>
    </div>
  )
}
