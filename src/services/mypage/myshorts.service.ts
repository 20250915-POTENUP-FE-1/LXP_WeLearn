import api from '@/lib/utils/apiUtils'
import type { operations } from '@/types/api-schema'
import type {
  ShortsResponse,
  PageShortsResponse,
  ShortsUpdateRequest,
  ShortsStatus,
} from '@/types/myshorts'

// API 응답 타입 (내부용)
type UpdateShortsApiResponse = operations['updateShorts']['responses'][200]['content']['*/*']

const apiClient = api()

/**
 * 내 숏츠 목록 조회
 */
export async function getMyShorts({
  page = 0,
  size = 20,
}: {
  page?: number
  size?: number
} = {}): Promise<PageShortsResponse | null> {
  try {
    // get은 json() 파싱된 데이터 반환
    return await apiClient.get('/api/v1/users/me/shorts', {
      cache: 'no-store',
      params: { page, size },
    })
  } catch (error) {
    console.error('내 숏츠 목록 조회 실패:', error)
    return null
  }
}

/**
 * 숏츠 수정
 */
export async function updateShorts(
  shortId: number,
  data: ShortsUpdateRequest,
): Promise<ShortsResponse | null> {
  try {
    //  patch는 json() 파싱된 데이터 반환
    const response: UpdateShortsApiResponse = await apiClient.patch(
      `/api/v1/shorts/${shortId}`,
      data,
    )
    return response?.data ?? null
  } catch (error) {
    console.error('숏츠 수정 실패:', error)
    return null
  }
}

/**
 * 숏츠 삭제
 */
export async function deleteShorts(shortId: number): Promise<boolean> {
  try {
    // delete는 json() 파싱된 데이터 반환 (204일 경우 undefined)
    await apiClient.delete(`/api/v1/shorts/${shortId}`)
    return true
  } catch (error) {
    console.error('숏츠 삭제 실패:', error)
    return false
  }
}

/**
 * 숏츠 공개/비공개 전환
 */
export async function toggleShortsStatus(
  shortId: number,
  currentStatus: ShortsStatus,
): Promise<ShortsResponse | null> {
  const newStatus: ShortsStatus = currentStatus === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'
  return updateShorts(shortId, { status: newStatus })
}
