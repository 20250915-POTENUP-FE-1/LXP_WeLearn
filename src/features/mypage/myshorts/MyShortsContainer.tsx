'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import MyShortsCreateButton from './MyShortsCreateButton'
import ShortsCard from '@/components/mypage/shorts/ShortsCard'
import ShortsPreviewContainer from '@/components/mypage/shorts/ShortsPreviewContainer'
import { deleteShortsAction, toggleShortsVisibilityAction } from './myshorts.action'
import { ShortsBase } from '@/types/shorts/shorts'
import ShortsListHeader from '@/components/mypage/shorts/ShortsListHeader'
import EmptyState from '../EmptyState'

interface MyShortsContainerProps {
  initialShorts: ShortsBase[]
  totalCount: number
}

export default function MyShortsContainer({ initialShorts, totalCount }: MyShortsContainerProps) {
  const router = useRouter()
  const [shortsList, setShortsList] = useState<ShortsBase[]>(initialShorts)
  const [selectedShorts, setSelectedShorts] = useState<ShortsBase | null>(initialShorts[0] ?? null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleSelectShorts = (shorts: ShortsBase) => {
    setSelectedShorts(shorts)
  }

  // 숏츠 공개/비공개 전환 핸들러
  const handleToggleVisibility = async (
    shortsId: number,
    currentStatus: ShortsBase['visibility'],
  ) => {
    try {
      const result = await toggleShortsVisibilityAction(shortsId, currentStatus)

      if (result.success && result.data) {
        toast.success(result.message)
        // 상태 업데이트
        setShortsList((prev) =>
          prev.map((s) =>
            s.shortsId === shortsId ? { ...s, visibility: result.data!.visibility } : s,
          ),
        )
        // 선택된 숏츠 상태도 업데이트
        if (selectedShorts?.shortsId === shortsId) {
          setSelectedShorts((prev) =>
            prev ? { ...prev, visibility: result.data!.visibility } : prev,
          )
        }
        router.refresh()
      } else {
        toast.error(result.message || '상태 변경에 실패했습니다.')
      }
    } catch (error) {
      toast.error('상태 변경 중 오류가 발생했습니다.')
    }
  }

  const handleDelete = async (shortsId: number) => {
    if (isDeleting) return

    // 삭제 확인
    const confirmed = window.confirm('정말 이 숏츠를 삭제하시겠습니까?')
    if (!confirmed) return

    setIsDeleting(true)

    try {
      const result = await deleteShortsAction(shortsId)

      if (result.success) {
        toast.success(result.message || '숏츠가 삭제되었습니다.')
        // 목록에서 삭제된 항목 제거
        const updatedList = shortsList.filter((s) => s.shortsId !== shortsId)
        setShortsList(updatedList)
        // 선택된 숏츠가 삭제된 경우 첫 번째 항목 선택
        if (selectedShorts?.shortsId === shortsId) {
          setSelectedShorts(updatedList[0] ?? null)
        }
        router.refresh()
      } else {
        toast.error(result.message || '삭제에 실패했습니다.')
      }
    } catch (error) {
      toast.error('삭제 중 오류가 발생했습니다.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* 좌측 - 미리보기 */}
        <div className="order-1 w-full lg:order-1 lg:w-100 lg:shrink-0">
          <div className="flex flex-col items-center justify-center gap-6 py-8 md:py-0 lg:sticky lg:top-24">
            <h1 className="pt-8 text-center text-2xl font-black text-gray-900 uppercase md:pt-0 lg:p-0 lg:text-left">
              My Created Shorts
            </h1>
            <ShortsPreviewContainer shorts={selectedShorts} loop={true} autoplay={true} />
            <div className="w-full items-center justify-center md:flex">
              <MyShortsCreateButton />
            </div>
          </div>
        </div>

        {/* 우측 - 리스트 */}
        <div className="order-2 flex-1 lg:order-2">
          <ShortsListHeader totalCount={totalCount} />

          {/* 숏츠 목록 */}
          <div className="space-y-6">
            {shortsList.length > 0 ? (
              shortsList.map((shorts) => (
                <ShortsCard
                  key={shorts.shortsId}
                  shorts={shorts}
                  isSelected={selectedShorts?.shortsId === shorts.shortsId}
                  onSelect={() => handleSelectShorts(shorts)}
                  onToggleVisibility={() =>
                    handleToggleVisibility(shorts.shortsId, shorts.visibility)
                  }
                  onDelete={() => handleDelete(shorts.shortsId)}
                />
              ))
            ) : (
              <EmptyState type="myshorts" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
