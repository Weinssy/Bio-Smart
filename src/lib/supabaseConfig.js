export function isPrivilegedSupabaseKey(key = '') {
  if (key.startsWith('sb_secret_')) return true
  try {
    const payload = key.split('.')[1]
    if (!payload) return false
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(normalized)).role === 'service_role'
  } catch {
    return false
  }
}

export function isPublicSupabaseConfig(url, key) {
  try {
    const parsed = new URL(url)
    return ['https:', 'http:'].includes(parsed.protocol) &&
      Boolean(key) && !url.includes('your-project-id') &&
      !key.includes('your-anon') && !isPrivilegedSupabaseKey(key)
  } catch {
    return false
  }
}
