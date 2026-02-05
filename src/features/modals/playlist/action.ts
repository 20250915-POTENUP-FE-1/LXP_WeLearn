'use server'
import { PlaylistApi } from '@/services/playlist/playlist.service'
import { ActionState } from '@/types/action/action'
import { PlaylistItem, Visibility } from '@/types/playlist/playlist'
import { revalidatePath } from 'next/cache'

const baseUrl = 'https://995dcec8-b9b9-4ce1-b734-d1a7806c16ea.mock.pstmn.io'
export const createPlaylistAction = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState<PlaylistItem>> => {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const thumbnailUrl = formData.get('thumbnailUrl') as string | null
  const visibility = formData.get('visibility') as Visibility
  const shortsId = Number(formData.get('shortsId') || 0)

  try {
    const response = await PlaylistApi.createPlaylist({
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
      message: '플레이리스트 생성중에 오루가 발생했습니다.',
    }
  }
}
