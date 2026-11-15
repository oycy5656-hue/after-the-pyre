// 账号与内容编辑：本地模式 / 云模式（Supabase）双通道
// 云模式：邮箱 + 密码，角色存在 profiles.role，改动存在 edits 表，全站共享。
// 本地模式：没有配置 Supabase 时回退到 localStorage，只在本机生效。

import {
  currentEmail,
  currentUserId,
  deleteEdit,
  fetchEdits,
  fetchProfile,
  initCloud,
  isCloud,
  loadSession,
  pushEdit,
  signIn,
  signOut,
  signUp,
  updateDisplay
} from './cloud'

const USERS_KEY = 'pyre.users.v1'
const SESSION_KEY = 'pyre.session.v1'
const OVERRIDE_KEY = 'pyre.overrides.v1'

const SEED_ADMINS = [
  { username: 'admin', password: 'PyreAdmin!2026', display: '首席管理员', role: 'admin' },
  { username: 'curator', password: 'PyreCurator!2026', display: '内容管理员', role: 'admin' }
]

let mode = 'local' // 'cloud' | 'local'
let profileCache = null
let editsCache = {}

const enc = new TextEncoder()
const b64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)))
const unb64 = (str) => Uint8Array.from(atob(str), (c) => c.charCodeAt(0))

async function hash(password, saltB64) {
  const salt = saltB64 ? unb64(saltB64) : crypto.getRandomValues(new Uint8Array(16))
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 120000, hash: 'SHA-256' }, key, 256)
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

/** 初始化：有 Supabase 配置就走云模式 */
export async function initAuth() {
  const cfg = await initCloud()
  if (cfg) {
    mode = 'cloud'
    loadSession()
    if (currentUserId()) {
      const p = await fetchProfile()
      profileCache = p
        ? { username: currentEmail(), display: p.display || currentEmail(), role: p.role || 'user' }
        : { username: currentEmail(), display: currentEmail(), role: 'user' }
    }
  } else {
    mode = 'local'
    await ensureSeed()
  }
  return mode
}

export const authMode = () => mode

export function currentUser() {
  if (mode === 'cloud') return profileCache
  if (typeof localStorage === 'undefined') return null
  const session = read(SESSION_KEY, null)
  if (!session) return null
  const user = read(USERS_KEY, []).find((u) => u.username === session.username)
  if (!user) return null
  return { username: user.username, display: user.display, role: user.role, createdAt: user.createdAt }
}

export const isAdmin = () => {
  const u = currentUser()
  return !!u && u.role === 'admin'
}

export async function listUsers() {
  if (mode === 'cloud') return []
  return read(USERS_KEY, []).map(({ passwordHash, salt, ...rest }) => rest)
}

export async function ensureSeed() {
  if (typeof localStorage === 'undefined') return
  const users = read(USERS_KEY, null)
  if (users && users.length) return
  const seeded = []
  for (const a of SEED_ADMINS) {
    const { hash: h, salt } = await hash(a.password)
    seeded.push({ username: a.username, display: a.display, role: a.role, passwordHash: h, salt, createdAt: Date.now() })
  }
  write(USERS_KEY, seeded)
}

export async function register(username, password, display) {
  if (mode === 'cloud') {
    const email = String(username || '').trim()
    if (!email.includes('@')) throw new Error('云模式下请用邮箱注册')
    await signUp(email, password, display)
    const p = await fetchProfile()
    profileCache = { username: email, display: p?.display || display || email, role: p?.role || 'user' }
    return profileCache
  }
  await ensureSeed()
  const name = String(username || '').trim()
  if (name.length < 3) throw new Error('用户名至少 3 个字符')
  if (String(password || '').length < 8) throw new Error('密码至少 8 位')
  const users = read(USERS_KEY, [])
  if (users.some((u) => u.username.toLowerCase() === name.toLowerCase())) throw new Error('用户名已存在')
  const { hash: h, salt } = await hash(password)
  users.push({ username: name, display: String(display || name).trim(), role: 'user', passwordHash: h, salt, createdAt: Date.now() })
  write(USERS_KEY, users)
  return { username: name, display: display || name, role: 'user' }
}

export async function login(username, password) {
  if (mode === 'cloud') {
    const email = String(username || '').trim()
    await signIn(email, password)
    const p = await fetchProfile()
    profileCache = { username: email, display: p?.display || email, role: p?.role || 'user' }
    return profileCache
  }
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

export async function logout() {
  if (mode === 'cloud') {
    await signOut()
    profileCache = null
    return
  }
  if (typeof localStorage === 'undefined') return
  localStorage.removeItem(SESSION_KEY)
}

export async function changePassword(username, oldPassword, newPassword) {
  if (mode === 'cloud') throw new Error('云模式请通过登录邮件里的「重置密码」链接修改')
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

export async function loadEdits() {
  if (mode === 'cloud') {
    editsCache = await fetchEdits()
  } else {
    editsCache = read(OVERRIDE_KEY, {})
  }
  return editsCache
}

export function getOverrides() {
  return mode === 'cloud' ? editsCache : read(OVERRIDE_KEY, {})
}

export function getOverride(slug) {
  return getOverrides()[slug] || null
}

export async function saveOverride(slug, patch) {
  const merged = { ...(getOverrides()[slug] || {}), ...patch }
  if (mode === 'cloud') {
    await pushEdit(slug, merged)
    editsCache = { ...editsCache, [slug]: merged }
    return merged
  }
  const all = getOverrides()
  all[slug] = { ...merged, updatedAt: Date.now() }
  write(OVERRIDE_KEY, all)
  return all[slug]
}

export async function clearOverride(slug) {
  if (mode === 'cloud') {
    await deleteEdit(slug)
    const next = { ...editsCache }
    delete next[slug]
    editsCache = next
    return
  }
  const all = getOverrides()
  delete all[slug]
  write(OVERRIDE_KEY, all)
}

export function exportOverrides() {
  return JSON.stringify(getOverrides(), null, 2)
}

export async function importOverrides(json) {
  const parsed = JSON.parse(json)
  if (!parsed || typeof parsed !== 'object') throw new Error('格式不正确')
  if (mode === 'cloud') {
    for (const [slug, data] of Object.entries(parsed)) await pushEdit(slug, data)
    editsCache = { ...editsCache, ...parsed }
    return Object.keys(parsed).length
  }
  write(OVERRIDE_KEY, parsed)
  return Object.keys(parsed).length
}

export async function setDisplayName(display) {
  if (mode === 'cloud') {
    await updateDisplay(display)
    if (profileCache) profileCache = { ...profileCache, display }
  }
}

// 把覆盖合并进国家数据（只在浏览器端调用）
export function applyOverride(country, ov) {
  if (!ov) return country
  const next = { ...country }
  for (const key of ['name', 'population', 'bio', 'capital', 'faith', 'race']) {
    if (ov[key] !== undefined && ov[key] !== '') next[key] = ov[key]
  }
  if (ov.regionDesc) next.region = { ...next.region, desc: ov.regionDesc }
  if (ov.leaderBio || ov.leaderName || ov.leaderTitle) {
    next.politics = {
      ...next.politics,
      leader: {
        ...next.politics.leader,
        bio: ov.leaderBio ?? next.politics.leader.bio,
        name: ov.leaderName ?? next.politics.leader.name,
        title: ov.leaderTitle ?? next.politics.leader.title
      }
    }
  }
  if (ov.system) next.politics = { ...next.politics, system: ov.system }

  // 数组型覆盖：按 id 对齐，允许增删改
  const mergeById = (base, patch, keepExtra = true) => {
    if (!Array.isArray(patch)) return base
    const map = new Map(patch.map((x) => [x.id, x]))
    const merged = base.map((x) => (map.has(x.id) ? { ...x, ...map.get(x.id) } : x))
    if (keepExtra) {
      for (const x of patch) if (!base.some((b) => b.id === x.id)) merged.push(x)
    }
    return merged
  }

  if (Array.isArray(ov.factions)) {
    next.politics = { ...next.politics, factions: mergeById(next.politics.factions || [], ov.factions) }
  }
  if (Array.isArray(ov.modifiers)) {
    next.politics = { ...next.politics, modifiers: mergeById(next.politics.modifiers || [], ov.modifiers) }
  }
  if (Array.isArray(ov.wonders)) {
    next.politics = { ...next.politics, wonders: mergeById(next.politics.wonders || [], ov.wonders) }
  }
  if (Array.isArray(ov.legions)) {
    const legions = mergeById(next.military.legions || [], ov.legions).map((l) => {
      const composition = l.composition || []
      const total = composition.reduce((n, c) => n + (Number(c.size) || 0) * (Number(c.count) || 0), 0)
      const cards = composition.reduce((n, c) => n + (Number(c.count) || 0), 0)
      return { ...l, total, cards }
    })
    next.military = { ...next.military, legions }
  }

  // 旧格式兼容
  if (ov.influences) {
    next.politics = {
      ...next.politics,
      factions: (next.politics.factions || []).map((f) => ({
        ...f,
        influence: ov.influences[f.id] !== undefined ? Number(ov.influences[f.id]) : f.influence
      }))
    }
  }
  return next
}
