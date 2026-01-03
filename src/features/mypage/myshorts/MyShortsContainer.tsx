'use client'

import ShortsPreviewCard from '@/components/mypage/shorts/ShortsPreviewCard'
import { MyShortsItem } from '@/types/myshorts'
import MyShortsCreateButton from './MyShortsCreateButton'
import ShortsListHeader from '@/components/mypage/shorts/ShortsListHeader'
import ShortsCard from '@/components/mypage/shorts/ShortsCard'

// TODO: API 연동 전 더미 데이터
const DUMMY_SHORTS: MyShortsItem[] = [
  {
    id: '1',
    title: 'AI 시대의 필수 지식 MCP 이 영상 하나로 끝내세요!',
    description: '',
    thumbnailUrl: null,
    category: '프로그래밍',
    tags: ['프로그래밍', 'AI', 'mcp'],
    authorName: '윤개발',
    createdAt: '1분 전',
    visibility: 'private',
  },
  {
    id: '2',
    title: '파이썬 일주일 완전 정복 로드맵',
    description: '',
    thumbnailUrl: null,
    category: '프로그래밍',
    tags: ['프로그래밍', '파이썬', 'python'],
    authorName: '윤개발',
    createdAt: '5개월 전',
    visibility: 'public',
  },
]

export default function MyShortsContainer() {
  return (
    <div className="h-full w-full px-4 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* 좌측 - 미리보기 */}
        <div className="order-1 w-full lg:order-1 lg:w-80 lg:flex-shrink-0">
          <div className="lg:sticky lg:top-24">
            <h1 className="mb-6 text-2xl font-bold text-gray-900">내가 만든 숏츠</h1>
            <ShortsPreviewCard />
          </div>
        </div>

        {/* 우측 - 리스트 */}
        <div className="order-2 flex-1 lg:order-2">
          <MyShortsCreateButton />
          <ShortsListHeader totalCount={DUMMY_SHORTS.length} />

          {/* 숏츠 목록 */}
          <div className="space-y-4">
            {DUMMY_SHORTS.map((shorts) => (
              <ShortsCard key={shorts.id} shorts={shorts} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
