import api from '@/lib/utils/apiUtils'
import type { components } from '@/types/api-schema'

// API 타입
type ShortsUploadRequest = components['schemas']['ShortsUploadRequest']
type ShortsResponse = components['schemas']['ShortsResponse']

// 파일 업로드 응답 타입
interface FileUploadResponse {
  [key: string]: string
}

const apiClient = api()

export const registerApi = {
  /**
   * 비디오 파일 업로드
   * POST /api/v1/files/videos
   */
  uploadVideo: async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)

    const data = await apiClient.postFormData<FileUploadResponse>('/api/v1/files/videos', formData)

    const videoUrl = data.videoUrl ?? data.url ?? Object.values(data)[0]

    if (!videoUrl) {
      throw new Error('비디오 URL을 받지 못했습니다.')
    }

    return videoUrl
  },

  /**
   * 썸네일 파일 업로드
   * POST /api/v1/files/thumbnails
   */
  uploadThumbnail: async (file: File | Blob, fileName = 'thumbnail.jpg'): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file, fileName)

    const data = await apiClient.postFormData<FileUploadResponse>(
      '/api/v1/files/thumbnails',
      formData,
    )

    const thumbnailUrl = data.thumbnailUrl ?? data.url ?? Object.values(data)[0]

    if (!thumbnailUrl) {
      throw new Error('썸네일 URL을 받지 못했습니다.')
    }

    return thumbnailUrl
  },

  /**
   * Base64 썸네일 업로드
   * Base64 → Blob 변환 후 업로드
   */
  uploadThumbnailFromBase64: async (base64Data: string): Promise<string | null> => {
    try {
      const response = await fetch(base64Data)
      const blob = await response.blob()

      return await registerApi.uploadThumbnail(blob, 'thumbnail.jpg')
    } catch (error) {
      console.error('썸네일 업로드 실패:', error)
      return null
    }
  },

  /**
   * 숏츠 등록
   * POST /api/v1/shorts
   */
  uploadShorts: async (request: ShortsUploadRequest): Promise<ShortsResponse> => {
    const response = await apiClient.post('/api/v1/shorts', request)
    const data = await response.json()

    return data?.data ?? data
  },
}
