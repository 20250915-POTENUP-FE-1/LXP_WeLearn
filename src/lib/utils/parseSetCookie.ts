// utils/parseSetCookie.ts

export interface ParsedSetCookie {
  name: string
  value: string
  path?: string
  httpOnly?: boolean
  secure?: boolean
  sameSite?: 'lax' | 'strict' | 'none'
}

export function parseSetCookie(cookieHeader: string): ParsedSetCookie[] {
  const parsed = cookieHeader.split(/,(?=\s*\w+=)/).map((raw): ParsedSetCookie | null => {
    const [cookiePart, ...attrs] = raw.split(';')
    const [name, ...valueParts] = cookiePart.split('=')

    if (!name || valueParts.length === 0) return null

    const attrSet = attrs.map((a) => a.trim().toLowerCase())

    return {
      name: name.trim(),
      value: valueParts.join('=').trim(),
      path: '/',
      httpOnly: attrSet.includes('httponly'),
      secure: attrSet.includes('secure'),
      sameSite: getSameSite(attrSet),
    }
  })

  return parsed.filter((c): c is ParsedSetCookie => c !== null)
}

function getSameSite(attrs: string[]): 'lax' | 'strict' | 'none' | undefined {
  const s = attrs.find((a) => a.startsWith('samesite'))
  if (!s) return undefined
  if (s.includes('lax')) return 'lax'
  if (s.includes('strict')) return 'strict'
  if (s.includes('none')) return 'none'
}
