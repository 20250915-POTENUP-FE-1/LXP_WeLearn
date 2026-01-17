import { Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function LikeShortsLeftSection() {
  return (
    <div>
      <div className="order-1 w-full lg:order-1 lg:w-100 lg:shrink-0">
        <div className="flex flex-col items-center justify-center gap-6 py-8 md:py-0 lg:sticky lg:top-24">
          {/* Page Title */}
          <h1 className="pt-8 text-center text-2xl font-black text-gray-900 uppercase md:pt-0 lg:p-0 lg:text-left">
            Like Shorts
          </h1>

          {/* Preview Card */}
          <div className="relative mx-auto aspect-9/16 w-full overflow-hidden rounded-2xl bg-gray-200 shadow-lg md:w-[360px] lg:mx-0">
            {/* 상단 카테고리 뱃지 */}
            <div className="absolute top-3 right-3 left-3 z-10 flex items-center justify-between">
              <span className="inline-flex items-center rounded-full bg-black/55 px-3 py-1 text-[10px] font-medium text-white">
                DOCKER
              </span>
            </div>

            {/* 썸네일 영역 */}
            <Image
              src="https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg"
              alt="Spring Boot 시작하기"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 112px, 144px"
            />

            {/* 하단 그라데이션 */}
            <div className="absolute inset-x-0 bottom-0 h-[48%] bg-linear-to-t from-black/85 via-black/45 to-transparent" />

            {/* 하단 정보 영역 */}
            <div className="absolute right-0 bottom-0 left-0 p-5">
              <h3 className="mb-2 line-clamp-2 text-[18px] leading-snug font-semibold text-white">
                CI/CD? 처음 들으면 주문 같죠?
              </h3>
              <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-200/90">
                실수는 줄이고, 배포는 빠르게! 이 영상으로 CI/CD 개념, 웃으면서 한 번에 정리해보시죠
                ☕🚀
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-200">배포전문가</span>
                <span className="rounded-full border border-white/25 px-3 py-1 text-[10px] text-gray-100">
                  #tag
                </span>
              </div>
            </div>
          </div>

          {/* 재생 버튼 */}
          <Link href="/mypage/likes" className="group w-full md:w-[360px]">
            <button className="flex w-full items-center justify-center gap-2 rounded-full bg-black py-5 text-lg font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-100 hover:shadow-lg">
              <Play
                strokeWidth={1.5}
                size={30}
                className="transition-transform duration-500 group-hover:rotate-360"
              />
              모두 재생
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
