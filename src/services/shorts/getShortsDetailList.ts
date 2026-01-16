import { ShortsItemType } from '@/types/shorts'
import { shortsApi } from './shorts.service'

export interface ShortsListProps {
  shortsList: ShortsItemType[]
  initialIndex: number
}

export async function getShortsDetailList(startId: string): Promise<ShortsListProps | null> {
  try {
    // 1: API 호출 (shortsApi.shortsDetailList 유지)
    // response 타입을 any로 지정하여 기존의 복잡한 조건 검사 로직이 에러 없이 작동하게 합니다.
    const response: any = await shortsApi.shortsDetailList({ page: 0, size: 20 })

    // 2: 페이징 응답에서 실제 배열 추출 (기존 로직 유지)
    let allShorts: ShortsItemType[] = []

    // Spring Boot 스타일의 페이징 응답 처리 (data.content)
    if (response?.data?.content && Array.isArray(response.data.content)) {
      allShorts = response.data.content
    }
    // 다른 가능한 응답 구조 (data 자체가 배열인 경우)
    else if (Array.isArray(response?.data)) {
      allShorts = response.data
    }
    // 응답 자체가 배열인 경우
    else if (Array.isArray(response)) {
      allShorts = response
    }
    // 만약 apiUtils가 data 래퍼를 벗겨서 content만 줬을 경우를 대비한 추가 방어코드
    else if (Array.isArray(response?.content)) {
      allShorts = response.content
    } else {
      console.error('예상치 못한 API 응답 형식:', response)
      return null
    }

    // 3: 데이터 유효성 검사
    if (!allShorts || allShorts.length === 0) {
      console.error('shorts 데이터가 없습니다')
      return null
    }

    // 4: ID 오름차순 정렬
    const sortedShorts = [...allShorts].sort((a, b) => a.shortsId - b.shortsId)

    // 5: 시작 영상의 인덱스 찾기
    const startIndex = sortedShorts.findIndex((s) => s.shortsId === Number(startId))

    if (startIndex === -1) {
      console.error(`shortsId ${startId}를 찾을 수 없습니다`)
      return null
    }

    const RANGE = 5

    // 6: 슬라이싱 로직
    const startSlice = Math.max(startIndex - RANGE, 0)
    const endSlice = Math.min(startIndex + RANGE + 1, sortedShorts.length)

    const shortsList = sortedShorts.slice(startSlice, endSlice)
    const initialIndex = startIndex - startSlice

    return {
      shortsList,
      initialIndex,
    }
  } catch (error) {
    console.error('shorts 목록 불러오기 실패:', error)
    return null
  }
}
