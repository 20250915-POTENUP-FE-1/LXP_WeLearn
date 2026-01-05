import { buildQueryString } from '@/utils/buildQueryString'

// CORS 이슈 대응
// const baseUrl = typeof window === 'undefined' ? process.env.NEXT_PUBLIC_API_URL : ''
const baseUrl = process.env.NEXT_PUBLIC_API_URL

async function fetchWithAuth(
  url: string,
  options: RequestInit & { revalidate?: number; retry?: boolean } = {},
) {
  // // 리프레시 토큰을 사용한 토큰 갱신 처리
  // const refreshUrl =
  //   typeof window === 'undefined'
  //     ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`
  //     : '/api/v1/auth/refresh'

  const response = await fetch(url, {
    ...options,
    next: options.revalidate ? { revalidate: options.revalidate } : undefined,
    credentials: 'include',
  })

  if (response.status === 204) {
    return undefined
  }

  if (response.status !== 401) return response

  if (options.retry) {
    console.log('❌ Retry already attempted. Forcing logout.')
    throw new Error('UNAUTHORIZED')
  }

  console.log('⚠️ Access Token expired. Trying refresh...')

  const refreshRes = await fetch(refreshUrl, {
    method: 'POST',
    credentials: 'include',
  })

  if (!refreshRes.ok) {
    console.log('❌ Refresh failed. Redirecting to login...')
    throw new Error('UNAUTHORIZED')
  }

  console.log('🔄 Refresh success. Retrying original request...')

  return fetchWithAuth(url, {
    ...options,
    retry: true,
  })
}

export default function api() {
  /** GET */
  const get = async (endpoint = '', options?: FetchOptions) => {
    const queryString = buildQueryString(options?.params)
    const res = await fetchWithAuth(`${baseUrl}${endpoint}${queryString}`, {
      cache: options?.cache,
      next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
    })

    if (!res?.ok) {
      const errorData = await res?.json()
      throw new Error(errorData?.message || '알수없는 오류')
    }

    return res.json()
  }

  /** POST (JSON) - Response 객체 반환 */
  const post = async (endpoint = '', data?: unknown, options?: FetchOptions): Promise<Response> => {
    const res = await fetchWithAuth(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: options?.cache ?? 'no-store',
      next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
      body: JSON.stringify(data || {}),
    })

    const contentLength = res?.headers.get('content-length')
    const isEmpty = !contentLength || contentLength === '0'

    if (!res?.ok) {
      if (!isEmpty) {
        const errorData = await res?.json()
        throw new Error(errorData?.message || '알수없는 오류')
      }
      throw new Error('알수없는 오류')
    }

    return res
  }

  /** PATCH */
  const patch = async (endpoint = '', data?: unknown, options?: FetchOptions) => {
    const res = await fetchWithAuth(`${baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      cache: options?.cache ?? 'no-store',
      next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
      body: JSON.stringify(data || {}),
    })

    if (!res?.ok) {
      const errorData = await res?.json()
      throw new Error(errorData?.message || '알수없는 오류')
    }

    return res.json()
  }

  /** DELETE */
  const del = async (endpoint = '', options?: FetchOptions) => {
    const res = await fetchWithAuth(`${baseUrl}${endpoint}`, {
      method: 'DELETE',
      cache: options?.cache ?? 'no-store',
      next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
    })

    if (res === undefined) {
      return true
    }

    if (!res?.ok) {
      const errorData = await res?.json()
      throw new Error(errorData?.message || '알수없는 오류')
    }

    return res.json()
  }

  return { get, post, postFormData, patch, delete: del }
}
