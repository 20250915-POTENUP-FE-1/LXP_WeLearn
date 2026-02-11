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
  } catch (error: any) {
    const status = error?.response?.status || 500
    const message = error?.response?.data?.message || error?.message || '알 수 없는 오류 발생'
  }
}
