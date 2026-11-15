<script setup>
import { onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import { authMode, changePassword, currentUser, initAuth, listUsers, login, logout, register } from '../auth'

const user = ref(null)
const users = ref([])
const mode = ref('login')
const form = ref({ username: '', password: '', display: '' })
const pwd = ref({ old: '', next: '' })
const message = ref('')
const error = ref('')
const busy = ref(false)

const refresh = () => {
  user.value = currentUser()
  users.value = []
}

const mode2 = ref('local')

onMounted(async () => {
  mode2.value = await initAuth()
  refresh()
  users.value = await listUsers()
})

const submit = async () => {
  error.value = ''
  message.value = ''
  busy.value = true
  try {
    if (mode.value === 'login') {
      const u = await login(form.value.username, form.value.password)
      message.value = `欢迎回来，${u.display}`
    } else {
      await register(form.value.username, form.value.password, form.value.display)
      const u = await login(form.value.username, form.value.password)
      message.value = `账号已创建，${u.display}`
    }
    form.value = { username: '', password: '', display: '' }
    refresh()
    users.value = await listUsers()
  } catch (e) {
    const raw = String(e.message)
    error.value = raw.includes('Email not confirmed')
      ? '邮箱未验证：请查收验证邮件，或让管理员确认账号'
      : raw.includes('Invalid login credentials')
        ? mode.value === 'register'
          ? '该邮箱已注册，或密码不正确；请切到「登录」再试'
          : '邮箱或密码不正确'
        : raw
  } finally {
    busy.value = false
  }
}

const doLogout = async () => {
  await logout()
  refresh()
  message.value = '已退出登录'
}

const doChangePwd = async () => {
  error.value = ''
  message.value = ''
  try {
    await changePassword(user.value.username, pwd.value.old, pwd.value.next)
    pwd.value = { old: '', next: '' }
    message.value = '密码已更新'
  } catch (e) {
    error.value = e.message
  }
}
</script>

<template>
  <div class="acc">
    <div class="acc-notice" :class="{ cloud: mode2 === 'cloud' }">
      <strong>{{ mode2 === 'cloud' ? '云端账号（Supabase）' : '本地账号模式' }}</strong>
      <p v-if="mode2 === 'cloud'">
        账号由 Supabase Auth 管理，改动存在云端数据库，<em>所有访客可见、换设备也同步</em>。
        管理员可进入内容管理编辑国家档案，普通用户只能浏览。
      </p>
      <p v-else>
        本站是纯静态站点，没有服务器。账号与密码（PBKDF2 加盐哈希）保存在<em>当前浏览器</em>的
        localStorage 里，换设备或清缓存即失效；内容修改同理，只在本机可见。
      </p>
    </div>

    <!-- 已登录 -->
    <section v-if="user" class="acc-card">
      <h2>{{ user.display }}</h2>
      <dl class="acc-meta">
        <div><dt>账号</dt><dd>{{ user.username }}</dd></div>
        <div><dt>身份</dt><dd>{{ user.role === 'admin' ? '管理员' : '普通用户' }}</dd></div>
      </dl>
      <div class="acc-actions">
        <a v-if="user.role === 'admin'" class="acc-btn primary" :href="withBase('/admin/')">进入内容管理</a>
        <button type="button" class="acc-btn" @click="doLogout">退出登录</button>
      </div>

      <details v-if="mode2 !== 'cloud'" class="acc-pwd">
        <summary>修改密码</summary>
        <div class="acc-row">
          <input v-model="pwd.old" type="password" placeholder="原密码" autocomplete="current-password" />
          <input v-model="pwd.next" type="password" placeholder="新密码（至少 8 位）" autocomplete="new-password" />
          <button type="button" class="acc-btn" @click="doChangePwd">保存</button>
        </div>
      </details>

      <p class="acc-hint">{{ mode2 === 'cloud' ? '已连接 Supabase，账号全站共用。' : '本机已注册 ' + users.length + ' 个账号。' }}</p>
    </section>

    <!-- 未登录 -->
    <section v-else class="acc-card">
      <div class="acc-tabs">
        <button type="button" :class="{ on: mode === 'login' }" @click="mode = 'login'">登录</button>
        <button type="button" :class="{ on: mode === 'register' }" @click="mode = 'register'">注册</button>
      </div>

      <form class="acc-form" @submit.prevent="submit">
        <label>
          <span>{{ mode2 === 'cloud' ? '邮箱' : '用户名' }}</span>
          <input v-model="form.username" autocomplete="username" :placeholder="mode2 === 'cloud' ? 'you@example.com' : '用于登录'" />
        </label>
        <label v-if="mode === 'register'">
          <span>显示名</span>
          <input v-model="form.display" placeholder="在站内显示的名字（可留空）" />
        </label>
        <label>
          <span>密码</span>
          <input v-model="form.password" type="password" autocomplete="current-password" placeholder="至少 8 位" />
        </label>
        <button class="acc-btn primary" type="submit" :disabled="busy">
          {{ busy ? '处理中…' : mode === 'login' ? '登录' : '创建账号' }}
        </button>
      </form>

      <p class="acc-hint">注册的账号为普通用户，只有管理员可以编辑内容。</p>
    </section>

    <p v-if="error" class="acc-msg err">{{ error }}</p>
    <p v-else-if="message" class="acc-msg ok">{{ message }}</p>
  </div>
</template>

<style scoped>
.acc {
  max-width: 640px;
  margin: 8px auto 0;
}

.acc-notice {
  padding: 14px 18px;
  margin-bottom: 20px;
  font-size: 13px;
  line-height: 1.75;
  color: var(--vp-c-text-2);
  border: 1px solid color-mix(in srgb, #c8a24a 40%, var(--vp-c-divider));
  border-radius: 10px;
  background: color-mix(in srgb, #c8a24a 8%, var(--vp-c-bg-soft));
}

.acc-notice.cloud {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 40%, var(--vp-c-divider));
  background: color-mix(in srgb, var(--vp-c-brand-1) 8%, var(--vp-c-bg-soft));
}

.acc-notice strong {
  display: block;
  margin-bottom: 4px;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.acc-notice p {
  margin: 0;
}

.acc-notice em {
  font-style: normal;
  color: var(--vp-c-text-1);
}

.acc-card {
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
}

.acc-card h2 {
  margin: 0 0 14px;
  font-size: 20px;
}

.acc-tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 18px;
  padding: 4px;
  border-radius: 10px;
  background: var(--vp-c-default-soft);
}

.acc-tabs button {
  flex: 1;
  padding: 8px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.acc-tabs button.on {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.acc-form {
  display: grid;
  gap: 12px;
}

.acc-form label {
  display: grid;
  gap: 6px;
}

.acc-form span {
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}

.acc-form input,
.acc-row input {
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  outline: none;
}

.acc-form input:focus,
.acc-row input:focus {
  border-color: var(--vp-c-brand-1);
}

.acc-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-decoration: none;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 9px;
  cursor: pointer;
}

.acc-btn.primary {
  color: #fff;
  background: var(--vp-c-brand-1);
  border-color: transparent;
}

.acc-btn.primary:hover {
  background: var(--vp-c-brand-2);
}

.acc-btn:disabled {
  opacity: 0.6;
  cursor: default;
}

.acc-meta {
  display: flex;
  gap: 28px;
  margin: 0 0 18px;
}

.acc-meta div {
  display: grid;
  gap: 2px;
}

.acc-meta dt {
  font-size: 11.5px;
  color: var(--vp-c-text-3);
}

.acc-meta dd {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.acc-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.acc-pwd {
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid var(--vp-c-divider);
}

.acc-pwd summary {
  cursor: pointer;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.acc-row {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 8px;
  margin-top: 12px;
}

.acc-hint {
  margin: 14px 0 0;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.acc-msg {
  margin-top: 16px;
  padding: 10px 14px;
  font-size: 13px;
  border-radius: 8px;
}

.acc-msg.ok {
  color: #1f6f4f;
  background: rgba(47, 125, 99, 0.12);
}

.acc-msg.err {
  color: #9c4b4b;
  background: rgba(156, 75, 75, 0.12);
}

@media (max-width: 640px) {
  .acc-row {
    grid-template-columns: 1fr;
  }
}
</style>
