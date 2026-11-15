<script setup>
import { computed, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import countries from '../../data/countries.mjs'
import { authMode,
  clearOverride,
  currentUser,
  exportOverrides,
  getOverrides,
  importOverrides,
  initAuth,
  loadEdits,
  saveOverride
} from '../auth'

const user = ref(null)
const ready = ref(false)
const selected = ref(countries[0].slug)
const form = ref({})
const saved = ref('')
const error = ref('')
const store = ref({})
const io = ref('')

const country = computed(() => countries.find((c) => c.slug === selected.value) || countries[0])
const dirty = computed(() => Object.keys(store.value).length)

const loadForm = () => {
  const c = country.value
  const ov = store.value[c.slug] || {}
  form.value = {
    name: ov.name ?? c.name,
    population: ov.population ?? c.population ?? '',
    bio: ov.bio ?? c.bio ?? '',
    regionDesc: ov.regionDesc ?? c.region.desc ?? '',
    system: ov.system ?? c.politics.system ?? '',
    leaderBio: ov.leaderBio ?? c.politics.leader.bio ?? '',
    influences: Object.fromEntries(
      c.politics.factions.map((f) => [f.id, ov.influences?.[f.id] ?? f.influence])
    ),
    modifiers: Object.fromEntries(
      c.politics.modifiers.map((m) => [
        m.id,
        {
          desc: ov.modifiers?.[m.id]?.desc ?? m.desc ?? '',
          effect: ov.modifiers?.[m.id]?.effect ?? m.effect ?? ''
        }
      ])
    )
  }
}

const refresh = () => {
  user.value = currentUser()
  store.value = getOverrides()
  loadForm()
}

onMounted(async () => {
  await initAuth()
  await loadEdits()
  refresh()
  ready.value = true
})

const select = (slug) => {
  selected.value = slug
  saved.value = ''
  error.value = ''
  loadForm()
}

const save = async () => {
  error.value = ''
  try {
    await saveOverride(selected.value, form.value)
    saved.value = `已保存到${authMode() === 'cloud' ? '云端' : '本地'}：${new Date().toLocaleTimeString()}`
    refresh()
    saved.value = `已保存到${authMode() === 'cloud' ? '云端' : '本地'}：${new Date().toLocaleTimeString()}`
  } catch (e) {
    error.value = e.message
  }
}

const reset = async () => {
  await clearOverride(selected.value)
  refresh()
  saved.value = authMode() === 'cloud' ? '已从云端删除该国的改动' : '已还原为原始资料'
}

const doExport = () => {
  io.value = exportOverrides()
}

const doImport = async () => {
  error.value = ''
  try {
    const n = await importOverrides(io.value)
    refresh()
    saved.value = `已导入 ${n} 个国家的修改`
  } catch (e) {
    error.value = e.message
  }
}
</script>

<template>
  <div class="adm">
    <div v-if="ready && !user" class="adm-gate">
      <h2>需要管理员身份</h2>
      <p>请先用管理员账号登录，再回到这里编辑内容。</p>
      <a class="adm-btn primary" :href="withBase('/account/')">去登录</a>
    </div>

    <div v-else-if="ready && user && user.role !== 'admin'" class="adm-gate">
      <h2>权限不足</h2>
      <p>当前账号「{{ user.display }}」是普通用户，只有管理员可以编辑内容。</p>
      <a class="adm-btn" :href="withBase('/account/')">切换账号</a>
    </div>

    <template v-else-if="ready">
      <header class="adm-head">
        <div>
          <h2>内容管理</h2>
          <p class="adm-sub">
            以 <strong>{{ user.display }}</strong> 身份编辑。修改先存在本机，用下方「导出」可以备份或交给别人导入。
          </p>
        </div>
        <span class="adm-badge">{{ dirty }} 个国家有改动</span>
      </header>

      <div class="adm-layout">
        <aside class="adm-list">
          <button
            v-for="c in countries"
            :key="c.slug"
            type="button"
            :class="{ on: c.slug === selected }"
            @click="select(c.slug)"
          >
            <span>{{ c.name }}</span>
            <em v-if="store[c.slug]">已改</em>
          </button>
        </aside>

        <section class="adm-form">
          <h3>{{ country.name }}<small v-if="store[country.slug]">（有本地修改）</small></h3>

          <div class="adm-grid">
            <label><span>国名</span><input v-model="form.name" /></label>
            <label><span>人口</span><input v-model="form.population" placeholder="如 203K" /></label>
          </div>

          <label class="adm-block">
            <span>国家简介</span>
            <textarea v-model="form.bio" rows="5" />
          </label>

          <div class="adm-grid">
            <label><span>政体</span><input v-model="form.system" /></label>
            <label><span>风土描述</span><input v-model="form.regionDesc" /></label>
          </div>

          <label class="adm-block">
            <span>统治者小传</span>
            <textarea v-model="form.leaderBio" rows="3" />
          </label>

          <div v-if="country.politics.factions.length" class="adm-block">
            <span class="adm-label">派系影响力（%）</span>
            <div class="adm-factions">
              <label v-for="f in country.politics.factions" :key="f.id">
                <em :style="{ background: f.color }"></em>
                <span>{{ f.name }}</span>
                <input v-model.number="form.influences[f.id]" type="number" min="0" max="100" />
              </label>
            </div>
          </div>

          <div v-if="country.politics.modifiers.length" class="adm-block">
            <span class="adm-label">国策与修正</span>
            <div v-for="m in country.politics.modifiers" :key="m.id" class="adm-mod">
              <p class="adm-mod-name">{{ m.name }}</p>
              <textarea v-model="form.modifiers[m.id].desc" rows="3" placeholder="说明" />
              <input v-model="form.modifiers[m.id].effect" placeholder="效果" />
            </div>
          </div>

          <div class="adm-actions">
            <button type="button" class="adm-btn primary" @click="save">保存修改</button>
            <button type="button" class="adm-btn" @click="reset">还原为原始</button>
            <a class="adm-btn" :href="withBase(`/countries/${country.slug}.html`)" target="_blank" rel="noreferrer">
              预览页面
            </a>
          </div>
          <p v-if="saved" class="adm-msg ok">{{ saved }}</p>
          <p v-if="error" class="adm-msg err">{{ error }}</p>
        </section>
      </div>

      <section class="adm-io">
        <h3>备份与迁移</h3>
        <p class="adm-sub">把 JSON 发给别人，对方在同一页面「导入」后即可看到同样的修改。</p>
        <div class="adm-io-row">
          <button type="button" class="adm-btn" @click="doExport">导出全部修改</button>
          <button type="button" class="adm-btn" @click="doImport">导入左侧内容</button>
        </div>
        <textarea v-model="io" rows="8" placeholder="JSON：" />
      </section>
    </template>
  </div>
</template>

<style scoped>
.adm {
  max-width: 1080px;
  margin: 0 auto;
}

.adm-gate {
  max-width: 460px;
  margin: 40px auto;
  padding: 28px;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
}

.adm-gate h2 {
  margin: 0 0 8px;
  font-size: 19px;
}

.adm-gate p {
  margin: 0 0 18px;
  font-size: 13.5px;
  color: var(--vp-c-text-2);
}

.adm-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.adm-head h2 {
  margin: 0;
  font-size: 22px;
}

.adm-sub {
  margin: 6px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.adm-badge {
  flex: 0 0 auto;
  padding: 5px 12px;
  font-size: 12px;
  color: #1f6f4f;
  background: rgba(47, 125, 99, 0.12);
  border-radius: 999px;
}

.adm-layout {
  display: grid;
  grid-template-columns: 210px minmax(0, 1fr);
  gap: 20px;
  align-items: start;
}

.adm-list {
  display: grid;
  gap: 4px;
  max-height: 620px;
  overflow: auto;
  padding: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.adm-list button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 10px;
  font-size: 13px;
  text-align: left;
  color: var(--vp-c-text-2);
  background: none;
  border: none;
  border-radius: 7px;
  cursor: pointer;
}

.adm-list button:hover {
  background: var(--vp-c-default-soft);
}

.adm-list button.on {
  color: var(--vp-c-text-1);
  font-weight: 600;
  background: var(--vp-c-bg);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.adm-list em {
  font-style: normal;
  font-size: 10.5px;
  color: #c08a2e;
}

.adm-form {
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.adm-form h3 {
  margin: 0 0 16px;
  font-size: 17px;
}

.adm-form h3 small {
  font-size: 12px;
  font-weight: 400;
  color: #c08a2e;
}

.adm-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.adm-form label,
.adm-block {
  display: grid;
  gap: 6px;
  margin-bottom: 12px;
}

.adm-form span {
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}

.adm-label {
  font-size: 12.5px;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.adm-form input,
.adm-form textarea,
.adm-io textarea {
  width: 100%;
  padding: 9px 11px;
  font: inherit;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  outline: none;
  resize: vertical;
}

.adm-form input:focus,
.adm-form textarea:focus,
.adm-io textarea:focus {
  border-color: var(--vp-c-brand-1);
}

.adm-factions {
  display: grid;
  gap: 6px;
}

.adm-factions label {
  display: grid;
  grid-template-columns: 10px minmax(0, 1fr) 80px;
  gap: 8px;
  align-items: center;
  margin: 0;
}

.adm-factions em {
  width: 10px;
  height: 10px;
  border-radius: 2px;
}

.adm-factions span {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.adm-mod {
  margin-bottom: 12px;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 9px;
  background: var(--vp-c-bg);
}

.adm-mod-name {
  margin: 0 0 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.adm-mod textarea,
.adm-mod input {
  margin-bottom: 6px;
}

.adm-actions,
.adm-io-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
}

.adm-btn {
  display: inline-flex;
  align-items: center;
  padding: 9px 16px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-decoration: none;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
}

.adm-btn.primary {
  color: #fff;
  background: var(--vp-c-brand-1);
  border-color: transparent;
}

.adm-btn:hover {
  opacity: 0.92;
}

.adm-msg {
  margin: 12px 0 0;
  padding: 9px 12px;
  font-size: 12.5px;
  border-radius: 7px;
}

.adm-msg.ok {
  color: #1f6f4f;
  background: rgba(47, 125, 99, 0.12);
}

.adm-msg.err {
  color: #9c4b4b;
  background: rgba(156, 75, 75, 0.12);
}

.adm-io {
  margin-top: 22px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.adm-io h3 {
  margin: 0 0 6px;
  font-size: 16px;
}

.adm-io textarea {
  margin-top: 12px;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
}

@media (max-width: 860px) {
  .adm-layout {
    grid-template-columns: minmax(0, 1fr);
  }

  .adm-list {
    max-height: 200px;
  }

  .adm-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
