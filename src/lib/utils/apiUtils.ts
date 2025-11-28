type FetchOptions = {
  cache?: RequestCache // 'force-cache' | 'no-store' ...
  revalidate?: number // Next ISR (ex: 10 = 10초 후 자동 재검증)
}

export default function api(baseUrl: string) {
  /** GET with cache + revalidate (둘 다 선택 가능) */
  const get = async (endpoint = '', options?: FetchOptions) => {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      cache: options?.cache, // 브라우저/서버 캐시
      next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
    })
    if (!res.ok) throw new Error(`GET failed: ${res.status}`)
    return res.json()
  }

  /** POST (데이터 생성 → 기본적으로 캐시 사용 X) */
  const post = async (endpoint = '', data?: any, options?: FetchOptions) => {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: options?.cache ?? 'no-store',
      next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
      body: JSON.stringify(data || {}),
    })
    if (!res.ok) throw new Error(`POST failed: ${res.status}`)
    return res.json()
  }

  /** PATCH (부분 업데이트) */
  const patch = async (endpoint = '', data?: any, options?: FetchOptions) => {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      cache: options?.cache ?? 'no-store',
      next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
      body: JSON.stringify(data || {}),
    })
    if (!res.ok) throw new Error(`PATCH failed: ${res.status}`)
    return res.json()
  }

  /** DELETE */
  const del = async (endpoint = '', options?: FetchOptions) => {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: 'DELETE',
      cache: options?.cache ?? 'no-store',
      next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
    })
    if (!res.ok) throw new Error(`DELETE failed: ${res.status}`)
    return res.json()
  }

  return { get, post, patch, delete: del }
}

//예제
//import api from '@/lib/api';
// const postApi = api('https://api.example.com/posts');

/* 🔥 GET - ISR 적용 (10초마다 자동 갱신) */
// const posts = await postApi.get('', { revalidate: 10 });

/* 🔥 GET - 캐시 없이 최신 fetch */
// const post = await postApi.get('/1', { cache: 'no-store' });

/* 🔥 POST - 데이터를 추가하고 30초 뒤 다시 캐싱 리빌드 */
// const newPost = await postApi.post('', { title: '새 글' }, { revalidate: 30 });

/* 🔥 PATCH - 수정 + 캐시 재빌드 20초 */
// const updated = await postApi.patch('/1', { title: '수정' }, { revalidate: 20 });

/* 🔥 DELETE - 삭제 후 5초 뒤 페이지 재검증 */
// await postApi.delete('/1', { revalidate: 5 });
