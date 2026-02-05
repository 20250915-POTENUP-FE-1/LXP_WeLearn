import { NextResponse } from 'next/server'
import { PlaylistApi } from '@/services/playlist/playlist.service'

export async function POST(req: Request) {
  const body = await req.json() // 요청 body에서 추가 데이터
  const shortsId = body.shortsId // 클라이언트에서 전달한 숏츠 ID
  const playlistId = body.playlistId

  try {
    const res = await PlaylistApi.addShortsPlaylist(shortsId, playlistId)
    return NextResponse.json({ success: true, data: res })
  } catch (error: any) {
    const status = error?.response?.status || 500
    const message = error?.response?.data?.message || error?.message || 'Internal Server Error'
    return NextResponse.json({ message }, { status })
  }
}
