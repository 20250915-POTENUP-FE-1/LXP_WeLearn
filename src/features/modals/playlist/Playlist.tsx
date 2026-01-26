import { Plus } from 'lucide-react'

interface PlaylistProps {
  list: {
    id: number
    title: string
    count: number
  }[]
}

export default function Playlist({ list }: PlaylistProps) {
  return (
    <div className="max-h-96 overflow-y-auto px-6 py-4">
      {list.map((item) => (
        <button
          key={item.id}
          className="mb-2 flex max-h-96 w-full items-center justify-between overflow-y-auto rounded-lg px-4 py-4 transition-colors hover:bg-gray-50"
        >
          <span className="text-sm font-medium text-gray-900">{item.title}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{item.count}개</span>
            <div className="rounded p-1 transition-colors hover:bg-gray-200">
              <Plus className="h-4 w-4 text-gray-600" />
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
