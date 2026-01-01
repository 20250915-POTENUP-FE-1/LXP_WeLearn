import { Bookmark, Copy, X } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
interface PlaylistModalHeaderProps {
  id: string
}

export default function PlaylistModalHeader({ id }: PlaylistModalHeaderProps) {
  const router = useRouter()

  const handleClose = () => {
    router.replace(`/shorts/${id}`, { scroll: false })
  }
  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
      <h2 className="text-xl font-bold text-black">플레이 리스트</h2>
      <div className="flex items-center gap-3">
        <button className="rounded-lg p-2 transition-colors hover:bg-gray-100">
          <Copy className="h-5 w-5 text-gray-600" />
        </button>
        <button className="rounded-lg p-2 transition-colors hover:bg-gray-100">
          <Bookmark className="h-5 w-5 text-gray-600" />
        </button>
        <button
          onClick={handleClose}
          className="rounded-lg p-2 transition-colors hover:bg-gray-100"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  )
}
