import { ChevronDown } from 'lucide-react'

export default function SortSection() {
  return (
    <button className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors hover:bg-gray-50">
      최신순
      <ChevronDown strokeWidth={1.5} size={14} />
    </button>
  )
}
