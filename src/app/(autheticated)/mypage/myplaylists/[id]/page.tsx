import { Button } from '@/components/ui/Button'
import MyPlaylistCard from '@/features/mypage/myplaylists/edit/MyPlaylistCard'
import MyPlaylistTitleBtn from '@/features/mypage/myplaylists/edit/MyPlaylistTitleBtn'

export default async function MyPlaylistsPage() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* ==================== Left Section - Fixed Preview (모바일에서 먼저 노출) ==================== */}
        <div className="order-1 w-full lg:order-1 lg:w-100 lg:shrink-0">
          <div className="flex flex-col items-center justify-center gap-6 py-8 md:py-0 lg:sticky lg:top-24">
            {/* Page Header (플레이리스트 제목 + 수정 버튼) */}
            <div className="flex items-center gap-3 pt-8 md:pt-0 lg:p-0">
              <h1 className="text-center text-2xl font-black text-gray-900 uppercase lg:text-left">
                Spring Boot 시작하기
              </h1>
              {/* 플레이리스트 타이틀 수정 버튼 */}
              <MyPlaylistTitleBtn />
            </div>

            {/* Preview Card */}
            <div className="relative mx-auto aspect-9/16 w-full overflow-hidden rounded-2xl bg-gray-200 shadow-lg md:w-[360px] lg:mx-0">
              {/* 상단 카테고리 뱃지 */}
              <div className="absolute top-3 right-3 left-3 z-10 flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-black/55 px-3 py-1 text-[10px] font-medium text-white">
                  category
                </span>
              </div>

              {/* 썸네일 영역 */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
                <img
                  src="https://images.pexels.com/photos/2182863/pexels-photo-2182863.jpeg"
                  alt="썸네일"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="text-sm text-gray-500">Video Preview</span>
              </div>

              {/* 하단 그라데이션 */}
              <div className="absolute inset-x-0 bottom-0 h-[48%] bg-linear-to-t from-black/85 via-black/45 to-transparent" />

              {/* 하단 정보 영역 */}
              <div className="absolute right-0 bottom-0 left-0 p-5">
                <h3 className="mb-2 line-clamp-2 text-[18px] leading-snug font-semibold text-white">
                  CI/CD? 처음 들으면 주문 같죠?
                </h3>
                <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-200/90">
                  코드 짜고, 테스트하고, 배포까지… 예전엔 사람이 일일이 하느라 커피 식을 틈도
                  없었습니다. CI/CD 파이프라인은 이 모든 과정을 자동으로 처리해주는 개발자의 든든한
                  자동화
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-200">코드읽어주는개발자</span>
                  <span className="rounded-full border border-white/25 px-3 py-1 text-[10px] text-gray-100">
                    #tag
                  </span>
                </div>
              </div>
            </div>

            {/* 취소 / 순서 저장 버튼 */}
            <div className="pt-4-y-4 flex w-full flex-col gap-6 md:w-[360px]">
              <div className="rounded-full shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-100 hover:shadow-lg">
                <Button type="button" variant="accent" className="text-md w-full rounded-full py-6">
                  저장하기
                </Button>
              </div>
              <div className="rounded-full shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-100 hover:shadow-lg">
                <Button
                  type="button"
                  variant="secondary"
                  className="text-md w-full rounded-full py-6"
                >
                  취소
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== Right Section - Playlist Shorts List ==================== */}
        <div className="order-2 flex-1 lg:order-2">
          {/* ==================== List Header (총 갯수) ==================== */}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">총 5개</span>
          </div>

          {/* ==================== Playlist Shorts List (드래그 가능) ==================== */}
          <MyPlaylistCard />
        </div>
      </div>
    </div>
  )
}
