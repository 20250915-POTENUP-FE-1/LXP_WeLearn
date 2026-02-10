import { playlistApi } from '@/services/playlist/playlist.service'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  console.log(id)
  const playlistId = Number(id)

  if (!playlistId || Number.isNaN(playlistId)) {
    return NextResponse.json(
      { success: false, message: '존재하지 않는 플레이리스트 입니다.' },
      { status: 400 },
    )
  }

  try {
    const response = await playlistApi.getPlaylistItem(playlistId)

    return NextResponse.json({
      success: true,
      data: response,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message:
        error instanceof Error ? error.message : '플레이 리스트를 불러오는 중 오류가 발생했습니다.',
    })
  }
}
