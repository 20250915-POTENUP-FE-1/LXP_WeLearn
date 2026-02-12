import { shortsApi } from '@/services/shorts/shorts.service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const searchParams = request.nextUrl.searchParams
  const offset = searchParams.get('offset')
  const limit = searchParams.get('limit')
  const lastShortsId = searchParams.get('lastShortsId')

  try {
    const response = await shortsApi.shortsRecommendation(
      Number(id),
      offset ? Number(offset) : undefined,
      limit ? Number(limit) : undefined,
      lastShortsId ? Number(lastShortsId) : undefined,
    )

    return NextResponse.json({
      success: true,
      data: response.data,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : '숏츠 불러오기 실패',
    })
  }
}
