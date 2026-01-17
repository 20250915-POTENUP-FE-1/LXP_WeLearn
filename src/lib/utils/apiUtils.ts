import { cookies } from 'next/headers'
import { buildQueryString } from '@/utils/buildQueryString'
import { setAuthCookies } from './setAuthCookies'
import { ApiResponse } from '@/types/mypage-shorts'
import { SetAuthCookies } from '@/types/cookie'

const baseUrl = process.env.NEXT_PUBLIC_API_URL

interface FetchOptions extends RequestInit {
  params?: Record<string, any>
  revalidate?: number
  retry?: boolean
}

/**
 * 서버 사이드에서 백엔드 JwtAuthenticationFilter 규격에 맞는 헤더 생성
 */
async function getAuthHeaders(customHeaders: HeadersInit = {}) {
  const cookieStore = await cookies()

  // 백엔드 ACCESS_TOKEN_COOKIE 설정값인 'accessToken'으로 가져옴
  const accessToken = cookieStore.get('accessToken')?.value

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...customHeaders,
  } as Record<string, string>

  // 백엔드 AUTHORIZATION_HEADER / BEARER_PREFIX 규격 적용
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }
  return headers
}

/**
 * 핵심 Fetch 함수
 */
async function fetchWithAuth(url: string, options: FetchOptions = {}): Promise<Response> {
  const { revalidate, retry, ...restOptions } = options

  const headers = await getAuthHeaders(restOptions.headers)

  const response = await fetch(url, {
    ...restOptions,
    headers,
    next: revalidate !== undefined ? { revalidate } : restOptions.next,
  })

  // 1. 204 No Content 처리
  if (response.status === 204) return response

  // 2. 401 Unauthorized 처리 (토큰 만료 시)
  if (response.status === 401 && !retry) {
    console.warn('⚠️ Access Token expired. Attempting refresh...')

    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refreshToken')?.value // 리프레시 쿠키 이름 확인 필요

    if (!refreshToken) {
      cookieStore.delete('accessToken')
      cookieStore.delete('refreshToken')
      throw new Error('UNAUTHORIZED')
    }

    // 백엔드 리프레시 엔드포인트 호출
    const refreshRes = await fetch(`${baseUrl}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })

    const refreshData = (await refreshRes.json()) as ApiResponse<SetAuthCookies>

    if (refreshRes.ok) {
      await setAuthCookies({
        accessToken: refreshData.data.accessToken,
        refreshToken: refreshData.data.refreshToken,
      })
      return fetchWithAuth(url, { ...options, retry: true })
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

    // ✅ PATCH 성공 + No Content 대응
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
  try {
    const errorData = await res.json()
    return new Error(errorData?.message || 'API 호출 오류')
  } catch {
    return new Error(`HTTP Error: ${res.status}`)
  }
}
