<script setup>
import { computed, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import countries from '../../data/countries.mjs'
import { DEFAULT_BASE, DEFAULT_COUNTRY_TRAITS, DEFAULT_GOODS, DEFAULT_TRAITS } from '../../data/economy-model.mjs'
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

const tab = ref('country')
const econ = ref(null)
const econMsg = ref('')
const econErr = ref('')
const traitCountry = ref(countries[0].name)

const PARAM_KEYS = [
  ['perCapita', '人均年产出 (D)'],
  ['extraction', '上层抽取率'],
  ['ritual', '神庙仪式率'],
  ['upkeep', '种子损耗率'],
  ['exchangeBase', '交换效率基准'],
  ['reserveMonths', '基准储备（月）'],
  ['mobilization', '动员率'],
  ['laborShare', '劳力参与率']
]

const PARAM_LABEL = { yield: '产出', extraction: '抽取', ritual: '仪式', exchange: '交换', stability: '稳定', military: '动员', labor: '劳役' }

const buildEcon = (ov) => ({
  base: { ...DEFAULT_BASE, ...(ov?.base || {}) },
  goods: (ov?.goods || DEFAULT_GOODS).map((g) => ({ ...g })),
  traits: (ov?.traits || DEFAULT_TRAITS).map((t) => ({ ...t, e: { ...t.e } })),
  countryTraits: JSON.parse(JSON.stringify(ov?.countryTraits || DEFAULT_COUNTRY_TRAITS))
})

const saveEcon = async () => {
  econErr.value = ''
  try {
    await saveOverride('__economy__', econ.value)
    econMsg.value = `已保存经济参数：${new Date().toLocaleTimeString()}`
  } catch (e) {
    econErr.value = e.message
  }
}

const resetEcon = async () => {
  econErr.value = ''
  try {
    await clearOverride('__economy__')
    econ.value = buildEcon(null)
    econMsg.value = '已还原为默认经济模型'
  } catch (e) {
    econErr.value = e.message
  }
}

const toggleTrait = (name) => {
  const list = econ.value.countryTraits[traitCountry.value] || []
  const idx = list.indexOf(name)
  if (idx >= 0) list.splice(idx, 1)
  else list.push(name)
  econ.value.countryTraits[traitCountry.value] = list
}

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
  econ.value = buildEcon(getOverrides()['__economy__'])
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

      <div class="adm-tabs">
        <button type="button" :class="{ on: tab === 'country' }" @click="tab = 'country'">国家档案</button>
        <button type="button" :class="{ on: tab === 'economy' }" @click="tab = 'economy'">经济参数</button>
      </div>

      <div v-if="tab === 'country'" class="adm-layout">
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

      <section v-if="tab === 'country'" class="adm-io">
        <h3>备份与迁移</h3>
        <p class="adm-sub">把 JSON 发给别人，对方在同一页面「导入」后即可看到同样的修改。</p>
        <div class="adm-io-row">
          <button type="button" class="adm-btn" @click="doExport">导出全部修改</button>
          <button type="button" class="adm-btn" @click="doImport">导入左侧内容</button>
        </div>
        <textarea v-model="io" rows="8" placeholder="JSON：" />
      </section>
    </template>

      <section v-if="tab === 'economy' && econ" class="adm-econ">
        <h3>基础参数</h3>
        <p class="adm-sub">全境通用的口径。改这里会影响所有国家的产出、抽取与评分。</p>
        <div class="adm-grid">
          <label v-for="[key, label] in PARAM_KEYS" :key="key">
            <span>{{ label }}</span>
            <input v-model.number="econ.base[key]" type="number" step="0.01" />
          </label>
        </div>

        <h3>当量折算表</h3>
        <p class="adm-sub">锚定 1 D 的商品交换比。改玉米会整体缩放所有数字。</p>
        <div class="adm-goods">
          <label v-for="g in econ.goods" :key="g.name">
            <span>{{ g.name }}</span>
            <input v-model.number="g.value" type="number" step="0.1" />
            <em>D</em>
          </label>
        </div>

        <h3>天赋系数</h3>
        <p class="adm-sub">每项天赋对六个参数的加减（0.05 = +5%）。</p>
        <div class="adm-trait-table">
          <div class="adm-trait-head">
            <span>天赋</span>
            <span v-for="(label, key) in PARAM_LABEL" :key="key">{{ label }}</span>
          </div>
          <div v-for="t in econ.traits" :key="t.name" class="adm-trait-row">
            <span class="adm-trait-name">{{ t.name }}</span>
            <input
              v-for="(label, key) in PARAM_LABEL"
              :key="key"
              v-model.number="t.e[key]"
              type="number"
              step="0.01"
              :placeholder="'0'"
            />
          </div>
        </div>

        <h3>各国生效的天赋</h3>
        <p class="adm-sub">没勾选的国家按基础盘计算（对照表里标「未录入」）。</p>
        <div class="adm-trait-country">
          <select v-model="traitCountry">
            <option v-for="c in countries" :key="c.name" :value="c.name">{{ c.name }}</option>
          </select>
          <div class="adm-trait-checks">
            <label v-for="t in econ.traits" :key="t.name">
              <input
                type="checkbox"
                :checked="(econ.countryTraits[traitCountry] || []).includes(t.name)"
                @change="toggleTrait(t.name)"
              />
              <span>{{ t.name }}</span>
            </label>
          </div>
        </div>

        <div class="adm-actions">
          <button type="button" class="adm-btn primary" @click="saveEcon">保存经济参数</button>
          <button type="button" class="adm-btn" @click="resetEcon">还原默认模型</button>
          <a class="adm-btn" :href="withBase('/economy/')" target="_blank" rel="noreferrer">预览经济页</a>
        </div>
        <p v-if="econMsg" class="adm-msg ok">{{ econMsg }}</p>
        <p v-if="econErr" class="adm-msg err">{{ econErr }}</p>
      </section>
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


.adm-tabs {
  display: inline-flex;
  gap: 4px;
  margin-bottom: 16px;
  padding: 4px;
  border-radius: 10px;
  background: var(--vp-c-default-soft);
}

.adm-tabs button {
  padding: 7px 16px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.adm-tabs button.on {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.adm-econ {
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.adm-econ h3 {
  margin: 22px 0 4px;
  font-size: 15px;
}

.adm-econ h3:first-child {
  margin-top: 0;
}

.adm-econ .adm-grid label {
  display: grid;
  gap: 6px;
  margin-bottom: 10px;
}

.adm-econ .adm-grid label span {
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}

.adm-econ .adm-grid input {
  width: 100%;
  padding: 8px 10px;
  font: inherit;
  font-size: 13.5px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  outline: none;
}

.adm-goods {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 8px;
  margin-top: 12px;
}

.adm-goods label {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 74px 16px;
  gap: 8px;
  align-items: center;
  margin: 0;
  font-size: 12.5px;
}

.adm-goods label span {
  color: var(--vp-c-text-2);
}

.adm-goods em {
  font-style: normal;
  font-size: 11.5px;
  color: var(--vp-c-text-3);
}

.adm-trait-table {
  margin-top: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 9px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.adm-trait-head,
.adm-trait-row {
  display: grid;
  grid-template-columns: minmax(90px, 1.2fr) repeat(7, minmax(0, 1fr));
  gap: 4px;
  align-items: center;
  padding: 6px 10px;
}

.adm-trait-head {
  font-size: 11px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.adm-trait-row {
  border-bottom: 1px solid var(--vp-c-divider);
}

.adm-trait-row:last-child {
  border-bottom: none;
}

.adm-trait-name {
  font-size: 12.5px;
  color: var(--vp-c-text-1);
}

.adm-trait-row input {
  width: 100%;
  padding: 4px 6px;
  font-size: 12px;
  text-align: right;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
}

.adm-trait-country {
  margin-top: 12px;
}

.adm-trait-country select {
  padding: 7px 10px;
  font: inherit;
  font-size: 13px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.adm-trait-checks {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 4px 12px;
  margin-top: 12px;
}

.adm-trait-checks label {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  font-size: 12.5px;
  color: var(--vp-c-text-2);
  cursor: pointer;
}

.adm-trait-checks input {
  width: auto;
  margin: 0;
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
