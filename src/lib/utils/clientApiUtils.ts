import { buildQueryString } from '@/utils/buildQueryString'

const baseUrl = process.env.NEXT_SERVER_API_URL

interface FetchOptions extends RequestInit {
  params?: Record<string, any>
}

/**
 * 클라이언트 전용 fetch
 * - HttpOnly 쿠키 자동 포함
 * - Authorization 헤더 직접 다루지 않음
 */
async function fetchClient(url: string, options: FetchOptions = {}): Promise<Response> {
  const { params, headers, ...restOptions } = options

  const response = await fetch(url, {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include',
  })

  // 204 No Content
  if (response.status === 204) return response

  // 인증 만료 → 서버가 401 내려주면 UI 레벨에서 처리
  if (response.status === 401) {
    throw new Error('UNAUTHORIZED')
  }

  return response
}

/**
 * 클라이언트에서 쓰는 API 객체
 */
export const clientApi = {
  async get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    const queryString = buildQueryString(options?.params)

    const res = await fetchClient(`${baseUrl}${endpoint}${queryString}`, {
      ...options,
      method: 'GET',
    })

    if (!res.ok) throw await handleError(res)
    return res.json()
  },

  async post<T>(endpoint: string, data?: unknown, options?: FetchOptions): Promise<T> {
    const res = await fetchClient(`${baseUrl}${endpoint}`, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })

    if (!res.ok) throw await handleError(res)
    return res.status === 204 ? ({} as T) : res.json()
  },

  async patch<T>(endpoint: string, data?: unknown, options?: FetchOptions): Promise<T> {
    const res = await fetchClient(`${baseUrl}${endpoint}`, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })

    if (!res.ok) throw await handleError(res)
    return res.json()
  },

  async delete(endpoint: string, options?: FetchOptions): Promise<boolean> {
    const res = await fetchClient(`${baseUrl}${endpoint}`, {
      ...options,
      method: 'DELETE',
    })

    if (!res.ok) throw await handleError(res)
    return true
  },
}

async function handleError(res: Response) {
  try {
    const errorData = await res.json()
    return new Error(errorData?.message || 'API 호출 오류')
  } catch {
    return new Error(`HTTP Error: ${res.status}`)
  }
}
