import { playlistApi } from '@/services/playlist/playlist.service'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request) {
  const body = await req.json()
  const data = body.data
  const playlistId = body.playlistId

  try {
    const res = await playlistApi.updateShortsOrder(data, playlistId)
    revalidatePath(`playlists/${playlistId}`)
    revalidatePath(`mypage/myplaylists/${playlistId}`)
    return NextResponse.json({
      success: true,
      data: res,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : '순서 변경 실패',
    })
  }
}
