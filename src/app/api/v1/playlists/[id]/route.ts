import { playlistApi } from '@/services/playlist/playlist.service'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const playlistId = Number(id)

  if (!playlistId || Number.isNaN(playlistId)) {
    return NextResponse.json(
      { success: false, message: '존재하지 않는 플레이리스트 입니다.' },
      { status: 400 },
    )
  }

  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page')
  const size = searchParams.get('size')
  const sort = searchParams.get('sort')

  try {
    const response = await playlistApi.getPlaylistItem(
      playlistId,
      page ? Number(page) : undefined,
      size ? Number(size) : undefined,
      sort ?? undefined,
    )

    return NextResponse.json({
      success: true,
      data: response.data,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message:
        error instanceof Error ? error.message : '플레이 리스트를 불러오는 중 오류가 발생했습니다.',
    })
  }
}
