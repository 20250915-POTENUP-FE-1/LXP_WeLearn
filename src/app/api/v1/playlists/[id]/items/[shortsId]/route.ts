import { playlistApi } from '@/services/playlist/playlist.service'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { playlistId: string; shortsId: string } },
) {
  const { playlistId, shortsId } = params
  try {
    await playlistApi.deleteShortsInPlaylist(Number(shortsId), Number(playlistId))

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message:
        error instanceof Error ? error.message : '재생목록에서 삭제 중 오류가 발생하였습니다.',
    })
  }
}
