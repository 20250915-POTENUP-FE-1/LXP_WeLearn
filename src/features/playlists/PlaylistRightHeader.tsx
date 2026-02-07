interface PlaylistRightHeaderProps {
  totalCount: number
  label?: string
}

export default function PlaylistRightHeader({
  totalCount,
  label = '총',
}: PlaylistRightHeaderProps) {
  return (
    <span className="text-sm text-gray-500">
      {label} {totalCount}개
    </span>
  )
}
