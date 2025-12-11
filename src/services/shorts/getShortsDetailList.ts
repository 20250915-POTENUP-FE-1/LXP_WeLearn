import { ShortsDetail } from '@/types/shortform'
import { shortsApi } from './shorts.service'

/**
 * API 응답 타입 정의
 * - shortsList: 영상 목록 배열
 * - initialIndex: 시작 영상의 인덱스 (배열 내 위치)
 */

export interface ShortsListProps {
  shortsList: ShortsDetail[]
  initialIndex: number
}

export async function getShortsDetailList(startId: string): Promise<ShortsListProps | null> {
  try {
    // 1: API 호출
    const response = await shortsApi.shortsDetailList({ page: 0, size: 20 })

    // console.log('data:', response)

    // 2: 페이징 응답에서 실제 배열 추출
    let allShorts: ShortsDetail[]

    // Spring Boot 스타일의 페이징 응답 처리
    if (response?.data?.content && Array.isArray(response.data.content)) {
      allShorts = response.data.content
    }
    // 다른 가능한 응답 구조들
    else if (Array.isArray(response?.data)) {
      allShorts = response.data
    } else if (Array.isArray(response)) {
      allShorts = response
    } else {
      console.error('예상치 못한 API 응답 형식:', response)
      return null
    }

    // 3: 데이터 유효성 검사
    if (!Array.isArray(allShorts) || allShorts.length === 0) {
      console.error('shorts 데이터가 없습니다')
      return null
    }

    // 4: ID 오름차순 정렬 - 백엔드 미정렬 대응
    const sortedShorts = [...allShorts].sort((a, b) => a.shortsId - b.shortsId)

    // 5: 시작 영상의 인덱스 찾기
    const startIndex = sortedShorts.findIndex((s) => s.shortsId === Number(startId))

    if (startIndex === -1) {
      console.error(`shortsId ${startId}를 찾을 수 없습니다`)
      return null
    }

    // 6: 시작 지점 기준으로 10개 추출
    const beforeCount = Math.min(startIndex, 0)
    const startSlice = startIndex - beforeCount
    const endSlice = Math.min(startSlice + 10, sortedShorts.length)

    const shortsList = sortedShorts.slice(startSlice, endSlice)
    const initialIndex = beforeCount

    return {
      shortsList,
      initialIndex,
    }
  } catch (error) {
    console.error('shorts 목록 불러오기 실패:', error)
    return null
  }
}
