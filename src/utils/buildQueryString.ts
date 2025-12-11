export function buildQueryString(params?: Record<string, FetchParamsValue>) {
  if (!params) return ''

  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return

    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, String(v)))
    } else {
      searchParams.append(key, String(value))
    }
  })

  const qs = searchParams.toString()
  return qs ? `?${qs}` : ''
}
