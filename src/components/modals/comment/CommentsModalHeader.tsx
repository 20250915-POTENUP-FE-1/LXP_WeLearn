import { Button } from '@/components/ui/Button'
import SortIconButton from '@/components/ui/SortIconButton'
import { X } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

interface CommentModalHeaderProps {
  closeHandler: () => void
}

export default function CommentModalHeader({ closeHandler }: CommentModalHeaderProps) {
  const searchParams = useSearchParams()
  const commentCount = Number(searchParams.get('commentCount'))
  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
      <h2 className="text-lg font-semibold text-gray-900">
        댓글 <span className="text-gray-500">({commentCount})</span>
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
