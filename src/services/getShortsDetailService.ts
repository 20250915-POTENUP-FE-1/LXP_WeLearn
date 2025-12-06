import { ShortsDetail } from '@/types/shortform'

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
// fetch(`${API_BASE_URL}/shorts/${id}`

export async function getShortsDetail(id: string): Promise<ShortsDetail | null> {
  try {
    const response = await fetch(`http://localhost:4000/shorts/${id}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      return null
    }

    return response.json()
  } catch (error) {
    console.error('데이터 불러오기 실패:', error)
    return null
  }
}
