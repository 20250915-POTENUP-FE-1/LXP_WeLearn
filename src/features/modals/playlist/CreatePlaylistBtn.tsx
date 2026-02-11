import { FolderPlus, Plus } from 'lucide-react'
interface CreatePlaylistBtnProps {
  handleActiveTab: () => void
}

export default function CreatePlaylistBtn({ handleActiveTab }: CreatePlaylistBtnProps) {
  return (
    <div className="sticky bottom-0 left-0 w-full px-6 py-4 md:absolute">
      <button
        onClick={handleActiveTab}
        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-200 bg-white py-3 text-gray-700 transition-colors hover:border-black hover:bg-black hover:text-white"
      >
        {/* <Plus className="h-5 w-5" /> */}
        <FolderPlus strokeWidth={1.5} size={18} />
        <span className="text-md font-medium capitalize">create new playlist</span>
      </button>
    </div>
  )
}
