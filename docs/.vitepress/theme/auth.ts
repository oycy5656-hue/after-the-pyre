// 本地账号与内容覆盖层
// 说明：这是纯前端实现，账号与修改保存在当前浏览器的 localStorage 里。
// 它适合单人/小团队在自己电脑上维护内容，不能当作服务端鉴权使用。

const USERS_KEY = 'pyre.users.v1'
const SESSION_KEY = 'pyre.session.v1'
const OVERRIDE_KEY = 'pyre.overrides.v1'

// 首次打开时写入的两个管理员账号（密码在 README 与交付说明中给出）
const SEED_ADMINS = [
  { username: 'admin', password: 'PyreAdmin!2026', display: '首席管理员', role: 'admin' },
  { username: 'curator', password: 'PyreCurator!2026', display: '内容管理员', role: 'admin' }
]

const enc = new TextEncoder()

const b64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)))
const unb64 = (str) => Uint8Array.from(atob(str), (c) => c.charCodeAt(0))

async function hash(password, saltB64) {
  const salt = saltB64 ? unb64(saltB64) : crypto.getRandomValues(new Uint8Array(16))
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 120000, hash: 'SHA-256' },
    key,
    256
  )
  return { hash: b64(bits), salt: b64(salt) }
}

const read = (key, fallback) => {
  if (typeof localStorage === 'undefined') return fallback
  try {
    return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback
  } catch {
    return fallback
  }
}

const write = (key, value) => {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(key, JSON.stringify(value))
}

export function listUsers() {
  if (typeof localStorage === 'undefined') return []
  return read(USERS_KEY, []).map(({ passwordHash, salt, ...rest }) => rest)
}

export function currentUser() {
  if (typeof localStorage === 'undefined') return null
  const session = read(SESSION_KEY, null)
  if (!session) return null
  const user = read(USERS_KEY, []).find((u) => u.username === session.username)
  if (!user) return null
  return { username: user.username, display: user.display, role: user.role, createdAt: user.createdAt }
}

export function isAdmin() {
  const u = currentUser()
  return !!u && u.role === 'admin'
}

export async function ensureSeed() {
  if (typeof localStorage === 'undefined') return
  const users = read(USERS_KEY, null)
  if (users && users.length) return
  const seeded = []
  for (const a of SEED_ADMINS) {
    const { hash: h, salt } = await hash(a.password)
    seeded.push({
      username: a.username,
      display: a.display,
      role: a.role,
      passwordHash: h,
      salt,
      createdAt: Date.now()
    })
  }
  write(USERS_KEY, seeded)
}

export async function register(username, password, display) {
  await ensureSeed()
  const name = String(username || '').trim()
  if (name.length < 3) throw new Error('用户名至少 3 个字符')
  if (String(password || '').length < 8) throw new Error('密码至少 8 位')
  const users = read(USERS_KEY, [])
  if (users.some((u) => u.username.toLowerCase() === name.toLowerCase())) throw new Error('用户名已存在')
  const { hash: h, salt } = await hash(password)
  users.push({
    username: name,
    display: String(display || name).trim(),
    role: 'user',
    passwordHash: h,
    salt,
    createdAt: Date.now()
  })
  write(USERS_KEY, users)
  return { username: name, display: display || name, role: 'user' }
}

export async function login(username, password) {
  await ensureSeed()
  const name = String(username || '').trim().toLowerCase()
  const users = read(USERS_KEY, [])
  const user = users.find((u) => u.username.toLowerCase() === name)
  if (!user) throw new Error('账号不存在')
  const { hash: h } = await hash(password, user.salt)
  if (h !== user.passwordHash) throw new Error('密码不正确')
  write(SESSION_KEY, { username: user.username, at: Date.now() })
  return { username: user.username, display: user.display, role: user.role }
}

export function logout() {
  if (typeof localStorage === 'undefined') return
  localStorage.removeItem(SESSION_KEY)
}

export async function changePassword(username, oldPassword, newPassword) {
  const users = read(USERS_KEY, [])
  const user = users.find((u) => u.username === username)
  if (!user) throw new Error('账号不存在')
  const { hash: oldH } = await hash(oldPassword, user.salt)
  if (oldH !== user.passwordHash) throw new Error('原密码不正确')
  if (String(newPassword || '').length < 8) throw new Error('新密码至少 8 位')
  const { hash: h, salt } = await hash(newPassword)
  user.passwordHash = h
  user.salt = salt
  write(USERS_KEY, users)
}

// ---------- 内容覆盖 ----------

export function getOverrides() {
  return read(OVERRIDE_KEY, {})
}

export function getOverride(slug) {
  return getOverrides()[slug] || null
}

export function saveOverride(slug, patch) {
  const all = getOverrides()
  all[slug] = { ...(all[slug] || {}), ...patch, updatedAt: Date.now() }
  write(OVERRIDE_KEY, all)
  return all[slug]
}

export function clearOverride(slug) {
  const all = getOverrides()
  delete all[slug]
  write(OVERRIDE_KEY, all)
}

export function exportOverrides() {
  return JSON.stringify(getOverrides(), null, 2)
}

export function importOverrides(json) {
  const parsed = JSON.parse(json)
  if (!parsed || typeof parsed !== 'object') throw new Error('格式不正确')
  write(OVERRIDE_KEY, parsed)
  return Object.keys(parsed).length
}

// 把覆盖合并进国家数据（只在浏览器端调用）
export function applyOverride(country, ov) {
  if (!ov) return country
  const next = { ...country }
  for (const key of ['name', 'population', 'bio', 'capital', 'faith', 'race']) {
    if (ov[key] !== undefined && ov[key] !== '') next[key] = ov[key]
  }
  if (ov.regionDesc) next.region = { ...next.region, desc: ov.regionDesc }
  if (ov.leaderBio) next.politics = { ...next.politics, leader: { ...next.politics.leader, bio: ov.leaderBio } }
  if (ov.system) next.politics = { ...next.politics, system: ov.system }
  if (ov.influences) {
    next.politics = {
      ...next.politics,
      factions: next.politics.factions.map((f) => ({
        ...f,
        influence: ov.influences[f.id] !== undefined ? Number(ov.influences[f.id]) : f.influence
      }))
    }
  }
  if (ov.modifiers) {
    next.politics = {
      ...next.politics,
      modifiers: next.politics.modifiers.map((m) =>
        ov.modifiers[m.id] ? { ...m, desc: ov.modifiers[m.id].desc ?? m.desc, effect: ov.modifiers[m.id].effect ?? m.effect } : m
      )
    }
  }
  return next
}
