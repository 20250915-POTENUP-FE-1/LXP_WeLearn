import { api } from '@/lib/utils/apiUtils'
import { ApiResponse } from '@/types/api/api'

export const likeApi = {
  like: async (shortsId: number) => {
    const response = await api.post<ApiResponse>(`/api/v1/shorts/${shortsId}/likes`)

    return response
  },
}
