import { shortsApi } from '@/services/shorts/shorts.service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const shortsId = Number(id)

  const searchParams = request.nextUrl.searchParams
  const offset = parseOptionalNumber(searchParams.get('offset'))
  const limit = parseOptionalNumber(searchParams.get('limit'))
  const lastShortsId = parseOptionalNumber(searchParams.get('lastShortsId'))

  if (!Number.isFinite(shortsId) || !Number.isInteger(shortsId) || shortsId <= 0) {
    return NextResponse.json(
      {
        success: false,
        message: '유효하지 않은 숏츠 ID입니다.',
      },
      { status: 400 },
    )
  }

  if (
    [offset, limit, lastShortsId].some((value) => value !== undefined && !Number.isFinite(value))
  ) {
    return NextResponse.json(
      {
        success: false,
        message: '유효하지 않은 추천 조회 파라미터입니다.',
      },
      { status: 400 },
    )
  }

  try {
    const response = await shortsApi.shortsRecommendation(shortsId, offset, limit, lastShortsId)

    return NextResponse.json({
      success: true,
      data: response.data,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: getErrorMessage(error),
      },
      { status: getErrorStatus(error) },
    )
  }
}

function parseOptionalNumber(value: string | null) {
  return value === null ? undefined : Number(value)
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = (error as { message?: unknown }).message
    if (typeof message === 'string') return message
  }
  return '숏츠 추천 목록을 불러오지 못했습니다.'
}

function getErrorStatus(error: unknown) {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const code = (error as { code?: unknown }).code
    if (typeof code === 'number' && code >= 400 && code < 600) return code
  }
  return 500
}
