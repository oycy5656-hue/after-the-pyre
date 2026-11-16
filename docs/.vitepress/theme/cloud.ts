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
  // Supabase 对已存在邮箱返回 identities 空数组
  if (data?.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
    throw new Error('该邮箱已注册，请直接登录')
  }
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

// ---------- 国家认领与国策 ----------

export async function fetchClaims() {
  const res = await fetch(`${config.url}/rest/v1/claims?select=slug,user_id,display`, { headers: headers() })
  if (!res.ok) return {}
  const rows = await res.json()
  const map = {}
  for (const r of rows) map[r.slug] = { userId: r.user_id, display: r.display }
  return map
}

export async function claimCountry(slug, display) {
  const res = await fetch(`${config.url}/rest/v1/claims`, {
    method: 'POST',
    headers: headers({ Prefer: 'return=minimal' }),
    body: JSON.stringify([{ slug, user_id: session?.user?.id, display }])
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text.includes('duplicate') ? '该国已被他人锁定' : text || '锁定失败')
  }
}

export async function releaseClaim(slug) {
  const res = await fetch(`${config.url}/rest/v1/claims?slug=eq.${encodeURIComponent(slug)}`, {
    method: 'DELETE',
    headers: headers()
  })
  if (!res.ok) throw new Error('解除锁定失败（可能没有权限）')
}

export async function fetchPolicies() {
  const res = await fetch(`${config.url}/rest/v1/policies?select=slug,data`, { headers: headers() })
  if (!res.ok) return {}
  const rows = await res.json()
  const map = {}
  for (const r of rows) map[r.slug] = r.data
  return map
}

export async function savePolicy(slug, data) {
  const res = await fetch(`${config.url}/rest/v1/policies?on_conflict=slug`, {
    method: 'POST',
    headers: headers({ Prefer: 'resolution=merge-duplicates,return=minimal' }),
    body: JSON.stringify([{ slug, data, updated_by: session?.user?.id || null, updated_at: new Date().toISOString() }])
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || '保存失败（可能不是该国认领者）')
  }
}

// ---------- 认领规则 v2 ----------

/** 传入选民清单，返回其中可认领（无人认领且空白）的 slug */
export async function claimableSlugs(candidates) {
  const res = await fetch(`${config.url}/rest/v1/rpc/claimable_slugs`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ candidates })
  })
  if (!res.ok) return []
  return res.json()
}

/** 我锁定的国家（没锁返回 null） */
export async function myClaim() {
  const res = await fetch(`${config.url}/rest/v1/rpc/my_claim`, {
    method: 'POST',
    headers: headers(),
    body: '{}'
  })
  if (!res.ok) return null
  return res.json()
}

/** 管理员：全部认领记录 */
export async function fetchAllClaims() {
  const res = await fetch(`${config.url}/rest/v1/rpc/all_claims`, {
    method: 'POST',
    headers: headers(),
    body: '{}'
  })
  if (!res.ok) return {}
  const rows = await res.json()
  const map = {}
  for (const r of rows) map[r.slug] = { display: r.display }
  return map
}

// ---------- 论坛 ----------

export async function fetchPosts(limit = 60) {
  const res = await fetch(
    `${config.url}/rest/v1/posts?select=id,title,body,tag,author,author_name,created_at&order=created_at.desc&limit=${limit}`,
    { headers: headers() }
  )
  if (!res.ok) return []
  return res.json()
}

export async function createPost({ title, body, tag, authorName }) {
  const res = await fetch(`${config.url}/rest/v1/posts`, {
    method: 'POST',
    headers: headers({ Prefer: 'return=representation' }),
    body: JSON.stringify([{ title, body, tag, author: session?.user?.id, author_name: authorName }])
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || '发帖失败')
  }
  return res.json()
}

export async function deletePost(id) {
  const res = await fetch(`${config.url}/rest/v1/posts?id=eq.${id}`, {
    method: 'DELETE',
    headers: headers()
  })
  if (!res.ok) throw new Error('删除失败（可能没有权限）')
}

export async function fetchReplies(postId) {
  const res = await fetch(
    `${config.url}/rest/v1/replies?select=id,post_id,body,author,author_name,created_at&post_id=eq.${postId}&order=created_at.asc`,
    { headers: headers() }
  )
  if (!res.ok) return []
  return res.json()
}

export async function createReply(postId, body, authorName) {
  const res = await fetch(`${config.url}/rest/v1/replies`, {
    method: 'POST',
    headers: headers({ Prefer: 'return=representation' }),
    body: JSON.stringify([{ post_id: postId, body, author: session?.user?.id, author_name: authorName }])
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || '回复失败')
  }
  return res.json()
}

export async function deleteReply(id) {
  const res = await fetch(`${config.url}/rest/v1/replies?id=eq.${id}`, {
    method: 'DELETE',
    headers: headers()
  })
  if (!res.ok) throw new Error('删除失败（可能没有权限）')
}

// ---------- 推文（纪事） ----------

export async function fetchTweets(limit = 80) {
  const res = await fetch(
    `${config.url}/rest/v1/tweets?select=id,author_id,author_name,turn,era_year,era_time,body,image_url,created_at&order=created_at.desc&limit=${limit}`,
    { headers: headers() }
  )
  if (!res.ok) return []
  return res.json()
}

export async function createTweet({ turn, eraYear, eraTime, body, imageUrl, authorName }) {
  const res = await fetch(`${config.url}/rest/v1/tweets`, {
    method: 'POST',
    headers: headers({ Prefer: 'return=representation' }),
    body: JSON.stringify([
      {
        author_id: session?.user?.id,
        author_name: authorName || '',
        turn,
        era_year: eraYear,
        era_time: eraTime || '',
        body,
        image_url: imageUrl || ''
      }
    ])
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || '发布失败')
  }
  return res.json()
}

export async function deleteTweet(id) {
  const res = await fetch(`${config.url}/rest/v1/tweets?id=eq.${id}`, {
    method: 'DELETE',
    headers: headers()
  })
  if (!res.ok) throw new Error('删除失败（可能没有权限）')
}

/** 上传图片到 storage 的 tweets 桶，返回公开 URL */
export async function uploadTweetImage(file) {
  const ext = (file.name.split('.').pop() || 'png').toLowerCase().replace(/[^a-z0-9]/g, '') || 'png'
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const res = await fetch(`${config.url}/storage/v1/object/tweets/${path}`, {
    method: 'POST',
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${session?.access_token}`,
      'Content-Type': file.type || 'application/octet-stream',
      'x-upsert': 'false'
    },
    body: file
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || '图片上传失败')
  }
  return `${config.url}/storage/v1/object/public/tweets/${path}`
}
