'use server'
import { playlistApi } from '@/services/playlist/playlist.service'
import { ActionState } from '@/types/action/action'
import { revalidatePath } from 'next/cache'

export const patchPlaylistInfo = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const playlistId = formData.get('playlistId') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string

  const data = { title, description }

  try {
    const response = await playlistApi.patchPlaylistInfo(data, playlistId)

    revalidatePath(`/playlists/${playlistId}`)
    revalidatePath(`/mypage/myplaylists/${playlistId}`)
    return {
      success: true,
      data: response.data,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '플레이리스트 정보 수정 실패',
    }
  }
}
