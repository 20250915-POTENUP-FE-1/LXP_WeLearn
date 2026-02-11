interface DashboardContentProps {
  likedShortsCount: number
  playlistCount: number
  myShortsCount: number
}

export default function DashboardContent({
  likedShortsCount,
  playlistCount,
  myShortsCount,
}: DashboardContentProps) {
  return (
    <div className="mt-4 flex w-full items-center justify-center gap-6 md:mt-0 md:w-auto">
      <div className="flex flex-col items-center">
        <span className="py-2 text-2xl font-bold">{likedShortsCount}</span>
        <span className="text-sm text-gray-600">좋아요 숏츠</span>
      </div>
      <div className="h-8 w-px bg-gray-200" />
      <div className="flex flex-col items-center">
        <span className="py-2 text-2xl font-bold">{playlistCount}</span>
        <span className="text-sm text-gray-600">플레이리스트</span>
      </div>
      <div className="h-8 w-px bg-gray-200" />
      <div className="flex flex-col items-center">
        <span className="py-2 text-2xl font-bold">{myShortsCount}</span>
        <span className="text-sm text-gray-600">내가 만든 숏츠</span>
      </div>
    </div>
  )
}
