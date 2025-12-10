type FetchOptions = {
  // "default" | "force-cache" | "no-cache" | "no-store" | "only-if-cached" | "reload";
  cache?: RequestCache
  revalidate?: number // Next ISR (ex: 10 = 10초 후 자동 재검증)
  params?: Record<string, FetchParamsValue>
}
type FetchParamsValue = string | number | boolean | Array<string | number | boolean>
