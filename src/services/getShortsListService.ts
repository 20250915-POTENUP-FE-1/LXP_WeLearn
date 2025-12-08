import api from '@/lib/utils/apiUtils'
import { ShortsDetail } from '@/types/shortform'

/**
 * API 응답 타입 정의
 * - shortsList: 영상 목록 배열
 * - initialIndex: 시작 영상의 인덱스 (배열 내 위치)
 */
export interface ShortsListProps {
  shortsList: ShortsDetail[]
  initialIndex: number
}

/**
 * Shorts 목록을 가져오는 함수
 * @param startId - 시작할 영상의 ID (URL에서 받아온 값)
 * @returns 영상 목록과 시작 인덱스, 실패 시 null
 */
export async function getShortsList(startId: string): Promise<ShortsListProps | null> {
  try {
    const apiClient = api()

    // 1: 전체 shorts 목록 가져오기
    const allShorts: ShortsDetail[] = await apiClient.get('/api/v1/shorts', {
      cache: 'no-store', // 항상 최신 데이터 요청 (캐시 사용 안 함)
    })

    // 데이터가 없는 경우
    if (!allShorts || allShorts.length === 0) {
      return null
    }

    // 2: ID 오름차순 정렬 (1, 2, 3, 4, 5...)
    // sort()는 원본을 변경하므로 스프레드 연산자로 복사 후 정렬
    // 백엔드에서 정렬이 되어 올 수도 있지만, 프론트엔드에서 확실히 처리
    const sortedShorts = [...allShorts].sort((a, b) => a.id - b.id)

    // 3: 시작 영상의 인덱스 찾기
    // findIndex: 조건에 맞는 첫 번째 요소의 인덱스 반환, 없으면 -1
    const startIndex = sortedShorts.findIndex((s) => s.id === Number(startId))

    // 시작 영상을 찾지 못한 경우
    if (startIndex === -1) {
      return null
    }

    // 4: 시작 지점 기준으로 10개 추출
    // 앞에서 최대 2개를 포함하여 사용자가 "이전 영상"도 볼 수 있게 함
    const beforeCount = Math.min(startIndex, 2) // 앞에 영상이 2개 미만이면 있는 만큼만
    const startSlice = startIndex - beforeCount // 슬라이스 시작 위치
    const endSlice = Math.min(startSlice + 10, sortedShorts.length) // 콘텐츠 10개

    // slice(start, end): start부터 end -1까지 추출
    const shortsList = sortedShorts.slice(startSlice, endSlice)

    // 슬라이스된 배열 내에서 시작 영상의 위치
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
