import { PlaylistApi } from '@/services/playlist/playlist.service'
import { NextResponse } from 'next/server'

export async function POST(id: number) {
  try {
    const res = await PlaylistApi.addShortsPlaylist(id)

    return NextResponse.json({
      success: true,
      data: res,
    })
  } catch (error: any) {
    const status = error?.response?.status || 500
    const message = error?.response?.data?.message || error?.message || 'Internal Server Error'

    return NextResponse.json({ message }, { status })
  }
}
