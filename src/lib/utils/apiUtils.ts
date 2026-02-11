import { cookies } from 'next/headers'
import { buildQueryString } from '@/utils/buildQueryString'
import { setAuthCookies } from './setAuthCookies'
import { ApiResponse } from '@/types/api/api'
import { AuthCookies } from '@/types/cookie/cookie'

const baseUrl = process.env.NEXT_PUBLIC_API_URL

interface FetchOptions extends RequestInit {
  params?: Record<string, any>
  revalidate?: number
  retry?: boolean
  auth?: boolean
}

/**
 * 서버 사이드에서 백엔드 JwtAuthenticationFilter 규격에 맞는 헤더 생성
 */
async function getAuthHeaders(auth: boolean, customHeaders: HeadersInit = {}) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...customHeaders,
  } as Record<string, string>

  if (auth === false) {
    return headers
  }

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }
  return headers
}

/**
 * 핵심 Fetch 함수
 */
async function fetchWithAuth(url: string, options: FetchOptions = {}): Promise<Response> {
  // options.auth가 undefined일 때만 true, 전달된 값은 그대로 사용
  const auth = options.auth === undefined ? true : options.auth
  const { revalidate, retry, ...restOptions } = options
  // 인증 헤더 가져오기
  const headers = await getAuthHeaders(auth, restOptions.headers)

  const response = await fetch(url, {
    ...restOptions,
    headers,
    next: revalidate !== undefined ? { revalidate } : restOptions.next,
  })

  // 204 No Content
  if (response.status === 204) return response

  // ❗ auth 요청일 때만 refresh 시도
  if (response.status === 401 && !retry) {
    console.warn('⚠️ Access Token expired. Attempting refresh...')

    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refreshToken')?.value

    if (!refreshToken || retry) {
      cookieStore.delete('accessToken')
      cookieStore.delete('refreshToken')
      throw new Error('UNAUTHORIZED')
    }

    const refreshRes = await fetch(`${baseUrl}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })

    const refreshData = (await refreshRes.json()) as ApiResponse<AuthCookies>

    if (refreshRes.ok) {
      const newAccessToken = refreshData.data.accessToken
      await setAuthCookies({
        accessToken: refreshData.data.accessToken,
        refreshToken: refreshData.data.refreshToken,
      })

      return fetchWithAuth(url, {
        ...options,
        retry: true,
        auth: false,
        headers: { ...restOptions.headers, Authorization: `Bearer ${newAccessToken}` },
      })
    }

    throw new Error('UNAUTHORIZED')
  }

  return response
}

/**
 * 사용하기 편한 API 객체
 */
export const api = {
  async get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    const queryString = buildQueryString(options?.params)
    const res = await fetchWithAuth(`${baseUrl}${endpoint}${queryString}`, {
      ...options,
      method: 'GET',
    })
    if (!res.ok) throw await handleError(res)
    return res.json()
  },

  async post<T>(endpoint: string, data?: unknown, options?: FetchOptions) {
    const res = await fetchWithAuth(`${baseUrl}${endpoint}`, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    })
    if (!res.ok) throw await handleError(res)
    return res.status === 204 ? ({} as T) : res.json()
  },

  async patch<T>(endpoint: string, data?: unknown, options?: FetchOptions) {
    const res = await fetchWithAuth(`${baseUrl}${endpoint}`, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    })
    if (!res.ok) throw await handleError(res)
    return res.status === 204 ? ({} as T) : res.json()
  },

  async delete(endpoint: string, options?: FetchOptions): Promise<boolean> {
    const res = await fetchWithAuth(`${baseUrl}${endpoint}`, {
      ...options,
      method: 'DELETE',
    })
    if (!res.ok) throw await handleError(res)
    return true
  },
}

async function handleError(res: Response) {
  const errorData = await res.json().catch(() => ({}))
  console.log(errorData)
  throw {
    success: false,
    code: errorData.code || res.status,
    message: errorData.message || '알 수 없는 오류',
    data: errorData.data,
  }
}
