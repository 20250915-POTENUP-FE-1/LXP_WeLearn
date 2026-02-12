import { likeApi } from '@/services/shorts/likes.service'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const shortsId = body.shortsId

    const response = await likeApi.like(shortsId)

    revalidatePath(`/shorts/${shortsId}`)

    return NextResponse.json({
      success: true,
      data: response.data,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : '좋아요 실행 중 오류가 발생했습니다.',
    })
  }
}
