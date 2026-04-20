const TOKEN_KEY = 'token'
const USERNAME_KEY = 'username'
const TOKEN_EXPIRES_AT_KEY = 'tokenExpiresAt'
const DEFAULT_TOKEN_EXPIRES_IN_MS = 2 * 60 * 60 * 1000

const decodeJwtPayload = (token: string): Record<string, unknown> | null => {
  const parts = token.split('.')
  if (parts.length !== 3) {
    return null
  }

  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
    const decoded = window.atob(padded)
    return JSON.parse(decoded) as Record<string, unknown>
  } catch {
    return null
  }
}

const getJwtExpireAt = (token: string): number | null => {
  const payload = decodeJwtPayload(token)
  const exp = payload?.exp
  if (typeof exp !== 'number') {
    return null
  }

  return exp * 1000
}

const parseNumberValue = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }
  if (typeof value === 'string') {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) {
      return parsed
    }
  }
  return null
}

export const saveAuthSession = (
  token: string,
  username: string,
  options?: { expiresAt?: unknown; expiresIn?: unknown }
) => {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USERNAME_KEY, username)

  const expiresAt = parseNumberValue(options?.expiresAt)
  const expiresIn = parseNumberValue(options?.expiresIn)
  const jwtExpireAt = getJwtExpireAt(token)

  const finalExpireAt =
    expiresAt ?? (expiresIn !== null ? Date.now() + expiresIn * 1000 : jwtExpireAt ?? Date.now() + DEFAULT_TOKEN_EXPIRES_IN_MS)

  localStorage.setItem(TOKEN_EXPIRES_AT_KEY, String(finalExpireAt))
}

export const clearAuthSession = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(TOKEN_EXPIRES_AT_KEY)
}

export const isTokenExpired = () => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) {
    return true
  }

  const expiresAtRaw = localStorage.getItem(TOKEN_EXPIRES_AT_KEY)
  const expiresAt = expiresAtRaw ? Number(expiresAtRaw) : NaN

  if (Number.isFinite(expiresAt)) {
    return Date.now() >= expiresAt
  }

  const jwtExpireAt = getJwtExpireAt(token)
  if (jwtExpireAt !== null) {
    localStorage.setItem(TOKEN_EXPIRES_AT_KEY, String(jwtExpireAt))
    return Date.now() >= jwtExpireAt
  }

  return false
}
