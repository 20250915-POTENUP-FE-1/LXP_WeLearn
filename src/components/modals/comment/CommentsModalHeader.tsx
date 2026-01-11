import { Button } from '@/components/ui/Button'
import SortIconButton from '@/components/ui/SortIconButton'
import { X } from 'lucide-react'

interface CommentModalHeaderProps {
  closeHandler: () => void
  totalCount: number | undefined
}

export default function CommentModalHeader({ closeHandler, totalCount }: CommentModalHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
      <h2 className="text-lg font-semibold text-gray-900">
        댓글 <span className="text-gray-500">({!totalCount ? 0 : totalCount})</span>
      </h2>

      <div className="flex items-center gap-2">
        <SortIconButton />
        <Button
          variant="ghost"
          className="rounded-full [&_svg]:h-auto! [&_svg]:w-auto!"
          size="icon-lg"
          onClick={closeHandler}
        >
          <X className="text-gray-600" />
        </Button>
      </div>
    </div>
  )
}
