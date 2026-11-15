// Supabase 轻量客户端（直接走 REST / Auth API，不引入额外依赖）
// 配置来源：站点根目录的 /supabase.json（运行时读取，改完刷新即可生效，无需重新构建）

let config = null
let session = null

const SESSION_KEY = 'pyre.cloud.session.v1'

export function loadSession() {
  if (typeof localStorage === 'undefined') return null
  try {
    session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
  } catch {
    session = null
  }
  return session
}

function saveSession(next) {
  session = next
  if (typeof localStorage === 'undefined') return
  if (next) localStorage.setItem(SESSION_KEY, JSON.stringify(next))
  else localStorage.removeItem(SESSION_KEY)
}

/** 读取 /supabase.json；没有或字段为空则视为未接入云模式 */
export async function initCloud() {
  if (typeof fetch === 'undefined') return null
  try {
    const res = await fetch('/after-the-pyre/supabase.json', { cache: 'no-store' })
    if (!res.ok) return null
    const cfg = await res.json()
    if (!cfg?.url || !cfg?.anonKey) return null
    config = { url: cfg.url.replace(/\/$/, ''), anonKey: cfg.anonKey }
    loadSession()
    // 带过期检查：过期则尝试刷新
    if (session?.refresh_token && session.expires_at && Date.now() / 1000 > session.expires_at - 60) {
      await refresh()
    }
    return config
  } catch {
    return null
  }
}

export const isCloud = () => !!config
export const cloudConfig = () => config

const headers = (extra = {}) => ({
  apikey: config.anonKey,
  Authorization: `Bearer ${session?.access_token || config.anonKey}`,
  'Content-Type': 'application/json',
  ...extra
})

async function authRequest(path, body) {
  const res = await fetch(`${config.url}/auth/v1/${path}`, {
    method: 'POST',
    headers: { apikey: config.anonKey, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.msg || data.error_description || data.error || '请求失败')
  return data
}

export async function signUp(email, password, display) {
  const data = await authRequest('signup', { email, password, data: { display: display || email } })
  if (data.access_token) {
    saveSession(data)
    saveSession({ ...data, at: Date.now() })
  }
  return data
}

export async function signIn(email, password) {
  const data = await authRequest('token?grant_type=password', { email, password })
  saveSession({ ...data, at: Date.now() })
  return data
}

async function refresh() {
  try {
    const data = await authRequest('token?grant_type=refresh_token', { refresh_token: session.refresh_token })
    saveSession({ ...data, at: Date.now() })
  } catch {
    saveSession(null)
  }
}

export async function signOut() {
  try {
    if (session?.access_token) {
      await fetch(`${config.url}/auth/v1/logout`, { method: 'POST', headers: headers() })
    }
  } catch {
    /* ignore */
  }
  saveSession(null)
}

export const currentSession = () => session
export const currentEmail = () => session?.user?.email || null
export const currentUserId = () => session?.user?.id || null

/** 读自己的 profile（角色存在这里） */
export async function fetchProfile() {
  if (!session?.user?.id) return null
  const res = await fetch(
    `${config.url}/rest/v1/profiles?id=eq.${session.user.id}&select=id,display,role`,
    { headers: headers() }
  )
  if (!res.ok) return null
  const rows = await res.json()
  return rows[0] || null
}

export async function updateDisplay(display) {
  await fetch(`${config.url}/rest/v1/profiles?id=eq.${session.user.id}`, {
    method: 'PATCH',
    headers: headers({ Prefer: 'return=minimal' }),
    body: JSON.stringify({ display })
  })
}

/** 拉取全站改动 */
export async function fetchEdits() {
  const res = await fetch(`${config.url}/rest/v1/edits?select=slug,data,updated_at`, {
    headers: headers()
  })
  if (!res.ok) return {}
  const rows = await res.json()
  const map = {}
  for (const r of rows) map[r.slug] = r.data
  return map
}

export async function pushEdit(slug, data) {
  const res = await fetch(`${config.url}/rest/v1/edits?on_conflict=slug`, {
    method: 'POST',
    headers: headers({ Prefer: 'resolution=merge-duplicates,return=minimal' }),
    body: JSON.stringify([{ slug, data, updated_by: session?.user?.id || null, updated_at: new Date().toISOString() }])
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || '写入失败（可能没有管理员权限）')
  }
}

export async function deleteEdit(slug) {
  await fetch(`${config.url}/rest/v1/edits?slug=eq.${encodeURIComponent(slug)}`, {
    method: 'DELETE',
    headers: headers()
  })
}
