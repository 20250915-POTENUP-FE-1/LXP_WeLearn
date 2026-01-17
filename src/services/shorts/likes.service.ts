import { api } from '@/lib/utils/apiUtils'

export const likeApi = {
  like: async (shortsId: number) => {
    const response = await api.post<Response>(`/api/v1/shorts/${shortsId}/likes`)
    console.log(response)

    return response
  },

  unlike: async (shortsId: number) => {
    return await api.delete(`/api/v1/shorts/${shortsId}/unlikes`)
  },
}
