import LikeShortsCard from '@/features/mypage/likes/LikeShortsCard'
import LikeShortsLeftSection from '@/features/mypage/likes/LikeShortsLeftSection'
import SortSection from '@/features/sort/SortSection'

export default function LikeShortsPage() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* ==================== Left Section - Fixed Preview (모바일에서 먼저 노출) ==================== */}
        <LikeShortsLeftSection />
        {/* ==================== Right Section - Shorts List ==================== */}
        <div className="order-2 flex-1 lg:order-2">
          {/* ==================== List Header (총 갯수 + 정렬) ==================== */}
          <div className="my-4 flex justify-end">
            <SortSection />
          </div>
          {/* ==================== Shorts List ==================== */}
          <LikeShortsCard />
        </div>
      </div>
    </div>
  )
}
