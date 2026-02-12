'use server'
import { playlistApi } from '@/services/playlist/playlist.service'
import { ActionState } from '@/types/action/action'
import { PlaylistItems } from '@/types/playlist/playlist'
import { ShortsVisibility } from '@/types/shorts/status'
import { revalidatePath } from 'next/cache'

export const createPlaylistAction = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState<PlaylistItems>> => {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const thumbnailUrl = formData.get('thumbnailUrl') as string | null
  const visibility = formData.get('visibility') as ShortsVisibility
  const shortsId = Number(formData.get('shortsId') || 0)

  try {
    const response = await playlistApi.createPlaylist({
      title,
      description,
      thumbnailUrl,
      visibility,
    })

    revalidatePath(`/shorts/${shortsId}/playlist`)
    return {
      success: true,
      data: response.data,
    }
  } catch (error) {
    return {
      success: false,
      message: '플레이리스트 생성중에 오류가 발생했습니다.',
    }
  }
}
