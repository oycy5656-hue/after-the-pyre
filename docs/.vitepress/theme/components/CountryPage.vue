<script setup>
import { computed, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import countries from '../../data/countries.mjs'
import { applyOverride, currentUser, getOverride, initAuth, loadEdits, saveOverride } from '../auth'
import { geoOf } from '../../data/geography.mjs'
import { deriveSpecialties } from '../../data/resources.mjs'
import { simulate } from '../../data/sim.mjs'
import { parsePopulation } from '../../data/economy-model.mjs'
import mapData from '../../data/map.mjs'
import { TRAITS_BY_COUNTRY } from '../../data/traits.mjs'
import { countryEffects } from '../../data/trait-economy.mjs'
import { metalTechOf } from '../../data/country-metal.mjs'
import { toggleEditMode } from '../editmode'

const props = defineProps({
  index: { type: Number, required: true }
})

const baseCountry = computed(() => countries[props.index] || countries[0])
const ov = ref(null)
onMounted(async () => {
  await initAuth()
  const u = currentUser()
  isAdminUser.value = !!u && u.role === 'admin'
  await loadEdits()
  ov.value = getOverride(baseCountry.value.slug)
})
const country = computed(() => applyOverride(baseCountry.value, ov.value))

const leaderAvatar = computed(() =>
  country.value.politics.leader.avatar ? withBase(country.value.politics.leader.avatar) : ''
)


const isAdminUser = ref(false)
const editing = ref(false)
const draft = ref(null)
const saving = ref(false)
const flash = ref('')

const startEdit = () => {
  draft.value = JSON.parse(JSON.stringify(country.value))
  editing.value = true
  toggleEditMode(true)
}

const cancelEdit = () => {
  draft.value = null
  editing.value = false
  toggleEditMode(false)
}

const saveAll = async () => {
  saving.value = true
  flash.value = ''
  try {
    const d = draft.value
    ov.value = await saveOverride(country.value.slug, {
      name: d.name,
      population: d.population,
      bio: d.bio,
      capital: d.capital,
      faith: d.faith,
      race: d.race,
      system: d.politics.system,
      regionDesc: d.region.desc,
      leaderName: d.politics.leader.name,
      leaderTitle: d.politics.leader.title,
      leaderBio: d.politics.leader.bio,
      factions: d.politics.factions,
      modifiers: d.politics.modifiers,
      wonders: d.politics.wonders,
      legions: d.military.legions
    })
    editing.value = false
    toggleEditMode(false)
    flash.value = '已保存'
    setTimeout(() => (flash.value = ''), 2600)
  } catch (e) {
    flash.value = '保存失败：' + e.message
  } finally {
    saving.value = false
  }
}


const econMods = computed(() => {
  const { mod } = countryEffects(country.value.name)
  const labels = { yield: '产出', extraction: '抽取', exchange: '交换', stability: '稳定', military: '军事', ritual: '仪式', labor: '劳力' }
  return Object.entries(labels)
    .map(([key, label]) => ({ key, label, value: mod[key] || 0 }))
    .filter((m) => Math.abs(m.value) > 0.001)
})

const econ = computed(() => {
  const c = country.value
  const geo = geoOf(c.name)
  const specs = deriveSpecialties(geo, { max: 16, tech: metalTechOf(c.name) })
  const st = mapData.states.find((x) => x.name === c.capital || c.name.startsWith(x.name) || x.name.startsWith(c.name))
  const sim = simulate({
    specs,
    population: parsePopulation(c.population),
    race: c.race,
    geo,
    area: st ? st.area : 120,
    mods: countryEffects(c.name).mod
  })
  return { sim, specs }
})

const traitCard = computed(() => {
  const c = country.value
  return TRAITS_BY_COUNTRY[c.name] || TRAITS_BY_COUNTRY[c.slug] || null
})

const traitGroups = computed(() => {
  const card = traitCard.value
  if (!card) return []
  const order = ['统帅', '文明', '军事', '地理']
  const map = new Map()
  for (const t of card.traits || []) {
    const k = t.section || '文明'
    if (!map.has(k)) map.set(k, [])
    map.get(k).push(t)
  }
  return [...map.entries()].sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]))
})

const traitTotal = computed(() => (traitCard.value?.traits || []).reduce((n, t) => n + (Number(t.points) || 0), 0))

const statLabels = {
  diplomacy: '外交',
  stewardship: '管理',
  martial: '军事',
  intrigue: '谋略',
  learning: '学识',
  prowess: '武艺'
}
const statKeys = Object.keys(statLabels)
const statMax = computed(() => Math.max(20, ...statKeys.map((k) => country.value.stats[k] || 0)))
const totalStats = computed(() => statKeys.reduce((sum, k) => sum + (country.value.stats[k] || 0), 0))

const populationText = computed(() => {
  const raw = String(country.value.population || '').trim()
  if (!raw) return ''
  const m = /^([\d.]+)\s*([KM]?)$/i.exec(raw)
  if (!m) return raw
  const n = Number(m[1]) * (m[2].toUpperCase() === 'K' ? 1e3 : m[2].toUpperCase() === 'M' ? 1e6 : 1)
  if (n >= 1e4) return raw + '（约 ' + (n / 1e4).toFixed(n < 1e5 ? 1 : 0) + ' 万）'
  return raw + '（约 ' + n.toLocaleString() + ' 人）'
})

const factions = computed(() => (country.value.politics && country.value.politics.factions) || [])
const regionTraits = computed(() => (country.value.region && country.value.region.traits) || [])
const leaderTraits = computed(() => (country.value.politics.leader && country.value.politics.leader.traits) || [])
const wonders = computed(() => (country.value.politics && country.value.politics.wonders) || [])
const modifiers = computed(() => (country.value.politics && country.value.politics.modifiers) || [])
const factionTotal = computed(() => factions.value.reduce((n, f) => n + (f.influence || 0), 0))

// 圆环图：把影响力换算成 stroke-dasharray
const RADIUS = 42
const CIRC = 2 * Math.PI * RADIUS
const donut = computed(() => {
  let acc = 0
  const total = factionTotal.value || 1
  return factions.value.map((f) => {
    const len = (f.influence / total) * CIRC
    const seg = { ...f, dash: `${len} ${CIRC - len}`, offset: -acc }
    acc += len
    return seg
  })
})

const legions = computed(() => (country.value.military && country.value.military.legions) || [])
const totalTroops = computed(() => legions.value.reduce((n, l) => n + (l.total || 0), 0))
const totalCards = computed(() => legions.value.reduce((n, l) => n + (l.cards || 0), 0))

const glossary = computed(() => {
  const traits = new Map()
  const gear = new Map()
  for (const legion of legions.value) {
    for (const card of legion.composition || []) {
      for (const t of card.traits || []) if (!traits.has(t.name)) traits.set(t.name, t)
      for (const g of card.gear || []) {
        const key = g.slot + '|' + g.name
        if (!gear.has(key)) gear.set(key, g)
      }
    }
  }
  return { traits: [...traits.values()], gear: [...gear.values()] }
})

const toc = computed(() => [
  ['overview', '概览'],
  ['region', '风土'],
  ['economy', '经济'],
  ['traits', '天赋'],
  ['ruler', '统治者'],
  ...(factions.value.length ? [['factions', '势力格局']] : []),
  ['military', '军事'],
  ...(wonders.value.length ? [['wonders', '奇观']] : []),
  ...(modifiers.value.length ? [['policies', '国策']] : [])
])
</script>

<template>
  <div class="wp-page" :style="{ '--accent': country.accent }">
    <div class="wp-main">
      <div v-if="isAdminUser && !editing" class="wp-edit-toggle">
        <button type="button" class="wp-btn" @click="startEdit">编辑本页</button>
      </div>
      <p v-if="flash" class="wp-flash">{{ flash }}</p>

<template v-if="editing && draft">
      <div class="wp-editbar">
        <span>编辑模式 · 正在修改「{{ draft.name }}」</span>
        <span class="wp-editbar-actions">
          <button type="button" class="wp-btn primary" :disabled="saving" @click="saveAll">{{ saving ? '保存中…' : '保存全部' }}</button>
          <button type="button" class="wp-btn" @click="cancelEdit">取消</button>
        </span>
      </div>

      <section class="wp-editsection">
        <h2>基本信息</h2>
        <div class="wp-editgrid">
          <label><span>国名</span><input v-model="draft.name" /></label>
          <label><span>人口</span><input v-model="draft.population" /></label>
          <label><span>种族</span><input v-model="draft.race" /></label>
          <label><span>首都</span><input v-model="draft.capital" /></label>
          <label><span>信仰</span><input v-model="draft.faith" /></label>
          <label><span>政体</span><input v-model="draft.politics.system" /></label>
        </div>
        <label class="wp-editblock"><span>国家简介</span><textarea v-model="draft.bio" rows="6" /></label>
        <label class="wp-editblock"><span>风土描述</span><input v-model="draft.region.desc" /></label>
      </section>

      <section class="wp-editsection">
        <h2>统治者</h2>
        <div class="wp-editgrid">
          <label><span>姓名</span><input v-model="draft.politics.leader.name" /></label>
          <label><span>头衔</span><input v-model="draft.politics.leader.title" /></label>
        </div>
        <label class="wp-editblock"><span>小传</span><textarea v-model="draft.politics.leader.bio" rows="3" /></label>
      </section>

      <section class="wp-editsection">
        <h2>势力格局</h2>
        <div class="wp-editrows">
          <div v-for="f in draft.politics.factions" :key="f.id" class="wp-editrow">
            <input v-model="f.name" class="w-name" placeholder="派系名" />
            <input v-model="f.leader" class="w-leader" placeholder="领袖" />
            <input v-model.number="f.influence" type="number" min="0" max="100" class="w-num" />
            <span class="wp-pct">%</span>
          </div>
        </div>
      </section>

      <section v-if="draft.politics.modifiers.length" class="wp-editsection">
        <h2>国策与修正</h2>
        <div v-for="m in draft.politics.modifiers" :key="m.id" class="wp-editcard">
          <input v-model="m.name" class="w-full" placeholder="名称" />
          <textarea v-model="m.desc" rows="3" placeholder="说明" />
          <input v-model="m.effect" placeholder="效果" />
        </div>
      </section>

      <section class="wp-editsection">
        <h2>军事</h2>
        <p v-if="!draft.military.legions.length" class="wp-empty">这个国家还没有军团记录。</p>
        <div v-for="legion in draft.military.legions" :key="legion.id" class="wp-editcard">
          <div class="wp-editgrid">
            <label><span>军团名</span><input v-model="legion.name" /></label>
            <label><span>训练</span><input v-model="legion.training" /></label>
            <label><span>忠诚</span><input v-model.number="legion.loyalty" type="number" min="1" max="5" /></label>
          </div>
          <div v-for="c in legion.composition" :key="c.name" class="wp-editrow comp">
            <input v-model="c.name" class="w-name" placeholder="兵牌名" />
            <input v-model.number="c.count" type="number" min="1" class="w-num" placeholder="数量" />
            <input v-model.number="c.size" type="number" min="1" class="w-num" placeholder="单牌人数" />
            <input v-model="c.role" class="w-role" placeholder="定位" />
            <input v-model="c.race" class="w-role" placeholder="种族" />
            <input v-model="c.modifiers" class="w-full" placeholder="特质，如【飞行】【激励友军】" />
          </div>
          <button type="button" class="wp-btn small" @click="legion.composition.push({ name: '新兵牌', count: 1, size: 100, role: '', race: '', modifiers: '' })">+ 添加兵牌</button>
        </div>
      </section>

      <section v-if="draft.politics.wonders.length" class="wp-editsection">
        <h2>奇观</h2>
        <div v-for="w in draft.politics.wonders" :key="w.id" class="wp-editcard">
          <input v-model="w.name" class="w-full" placeholder="名称" />
          <textarea v-model="w.desc" rows="2" placeholder="描述" />
        </div>
      </section>
    </template>

    <template v-else>
      <p id="overview" class="wp-lead">{{ country.bio }}</p>

      <section id="region" class="wp-section">
        <h2>风土</h2>
        <p>{{ country.region.desc }}</p>
        <ul v-if="regionTraits.length" class="wp-tags">
          <li v-for="t in regionTraits" :key="t">{{ t }}</li>
          <li v-if="country.region.customTag">{{ country.region.customTag }}</li>
        </ul>
      </section>

      <section id="economy" class="wp-section">
        <h2>经济</h2>
        <div class="wp-mil-stats">
          <div><strong>{{ (econ.sim.totals.gdp / 1e6).toFixed(1) }}M</strong><span>建筑产值（D）</span></div>
          <div>
            <strong>{{ Math.round(econ.sim.totals.gdp / Math.max(1, parsePopulation(country.population))) }}</strong>
            <span>人均产出（D）</span>
          </div>
          <div>
            <strong>{{ Math.round((econ.sim.totals.foodSupply / Math.max(1, econ.sim.totals.foodNeed)) * 100) }}%</strong>
            <span>口粮自给</span>
          </div>
          <div>
            <strong :class="econ.sim.totals.balance >= 0 ? 'wp-good' : 'wp-bad'">
              {{ econ.sim.totals.balance >= 0 ? '顺差' : '逆差' }} {{ (Math.abs(econ.sim.totals.balance) / 1e6).toFixed(1) }}M
            </strong>
            <span>贸易差额</span>
          </div>
        </div>

        <ul class="wp-trait-mods">
          <li v-for="m in econMods" :key="m.key">{{ m.label }} <em :class="{ pos: m.value > 0, neg: m.value < 0 }">{{ m.value > 0 ? '+' : '' }}{{ (m.value * 100).toFixed(0) }}%</em></li>
        </ul>

        <h3 class="wp-sub">物产</h3>
        <ul class="wp-tags">
          <li v-for="sp in econ.specs" :key="sp.id">{{ sp.icon }} {{ sp.name }} · {{ sp.value }} D/{{ sp.unit }}</li>
        </ul>

        <h3 class="wp-sub">主要产业</h3>
        <ul class="wp-econ-list">
          <li v-for="b in econ.sim.buildings.filter((x) => x.level > 0).sort((a, b) => b.value - a.value).slice(0, 5)" :key="b.id">
            <span>{{ b.name }}</span>
            <em>{{ b.level }} 级 · {{ (b.value / 1e6).toFixed(1) }}M D</em>
          </li>
        </ul>
        <p class="wp-econ-note">
          按地理与人口推导；详细账目见 <a :href="withBase('/economy/')">经济台账</a>。
        </p>
      </section>

      <section id="traits" class="wp-section">
        <h2>天赋</h2>

        <template v-if="traitCard">
          <div class="wp-trait-head">
            <div>
              <p class="wp-trait-civ">{{ traitCard.civilization }}<span v-if="traitCard.race">· {{ traitCard.race }}</span></p>
              <p v-if="traitCard.leader?.name" class="wp-trait-leader">
                {{ traitCard.leader.title || '领袖' }}：{{ traitCard.leader.name }}
              </p>
            </div>
            <div class="wp-trait-points">
              <strong>{{ traitTotal > 0 ? '+' + traitTotal : traitTotal }}</strong>
              <span>特质净变化</span>
            </div>
          </div>

          <p v-if="traitCard.leader?.background" class="wp-trait-bg">{{ traitCard.leader.background }}</p>

          <div v-for="[sec, items] in traitGroups" :key="sec" class="wp-trait-group">
            <h3 class="wp-sub">{{ sec }}</h3>
            <ul class="wp-trait-list">
              <li v-for="t in items" :key="sec + t.name" class="wp-trait-item" :class="{ neg: Number(t.points) < 0, pos: Number(t.points) > 0 }">
                <div class="wp-trait-main">
                  <span v-if="t.category" class="wp-trait-cat">{{ t.category }}</span>
                  <strong>{{ t.name }}</strong>
                  <p>{{ t.desc }}</p>
                </div>
                <em class="wp-trait-pt">{{ t.points }}</em>
              </li>
            </ul>
          </div>
        </template>

        <p v-else class="wp-econ-note">该政权尚未录入登记档案的天赋数据。</p>
      </section>

      <section id="ruler" class="wp-section">
        <h2>统治者</h2>
        <div class="wp-ruler">
          <div class="wp-ruler-info">
            <p class="wp-ruler-name">{{ country.politics.leader.name }}</p>
            <p class="wp-ruler-title">{{ country.politics.leader.title }}</p>
            <ul v-if="leaderTraits.length" class="wp-tags">
              <li v-for="t in leaderTraits" :key="t">{{ t }}</li>
            </ul>
            <blockquote v-if="country.politics.leader.bio">{{ country.politics.leader.bio }}</blockquote>
          </div>
          <table class="wp-stat-table">
            <tbody>
              <tr v-for="key in statKeys" :key="key">
                <th>{{ statLabels[key] }}</th>
                <td class="wp-stat-bar">
                  <span class="wp-bar"><i :style="{ width: ((country.stats[key] / statMax) * 100).toFixed(0) + '%' }"></i></span>
                </td>
                <td class="wp-stat-num">{{ country.stats[key] }}</td>
              </tr>
              <tr class="wp-stat-total">
                <th>合计</th>
                <td></td>
                <td class="wp-stat-num">{{ totalStats }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section v-if="factions.length" id="factions" class="wp-section">
        <h2>势力格局</h2>
        <div class="wp-factions">
          <svg class="wp-donut" viewBox="0 0 100 100" role="img" aria-label="派系影响力占比">
            <circle cx="50" cy="50" :r="RADIUS" fill="none" stroke="var(--vp-c-default-soft)" stroke-width="13" />
            <circle
              v-for="seg in donut"
              :key="seg.id"
              cx="50"
              cy="50"
              :r="RADIUS"
              fill="none"
              :stroke="seg.color"
              stroke-width="13"
              :stroke-dasharray="seg.dash"
              :stroke-dashoffset="seg.offset"
              transform="rotate(-90 50 50)"
            />
            <text x="50" y="46" text-anchor="middle" class="wp-donut-label">{{ factions.length }}</text>
            <text x="50" y="58" text-anchor="middle" class="wp-donut-sub">派系</text>
          </svg>
          <table class="wp-faction-table">
            <thead>
              <tr><th>派系</th><th>领袖</th><th>影响力</th></tr>
            </thead>
            <tbody>
              <tr v-for="f in factions" :key="f.id">
                <td><span class="wp-dot" :style="{ background: f.color }"></span>{{ f.name }}</td>
                <td class="wp-muted">{{ f.leader }}</td>
                <td class="wp-num">{{ f.influence }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="military" class="wp-section">
        <h2>军事</h2>
        <div class="wp-mil-stats">
          <div><strong>{{ legions.length }}</strong><span>军团</span></div>
          <div><strong>{{ totalTroops.toLocaleString() }}</strong><span>总兵力</span></div>
          <div><strong>{{ totalCards }}</strong><span>兵牌</span></div>
        </div>

        <template v-if="legions.length">
          <article v-for="legion in legions" :key="legion.id" class="wp-legion">
            <header class="wp-legion-head">
              <h3>{{ legion.name }}</h3>
              <p class="wp-legion-meta">
                <span v-if="legion.training">{{ legion.training }}</span>
                <span v-if="legion.loyalty !== null">忠诚 {{ legion.loyalty }}</span>
                <span>{{ legion.cards }} 张兵牌</span>
                <strong>{{ legion.total.toLocaleString() }} 人</strong>
              </p>
            </header>
            <div class="wp-cards">
              <div v-for="card in legion.composition || []" :key="card.name" class="wp-card">
                <p class="wp-card-name">{{ card.name }}<em>× {{ card.count }}</em></p>
                <p class="wp-card-meta">{{ card.role }} · {{ card.race }}</p>
                <ul v-if="card.traits && card.traits.length" class="wp-traits">
                  <li v-for="t in card.traits" :key="t.name" :title="t.desc">{{ t.name }}</li>
                </ul>
                <p v-if="card.gear && card.gear.length" class="wp-card-gear">
                  <span v-for="g in card.gear" :key="g.slot + g.name" :title="g.desc">{{ g.slotLabel }} {{ g.name }}</span>
                </p>
                <p class="wp-card-total">{{ card.size }} 人/牌 · 小计 {{ card.total.toLocaleString() }}</p>
              </div>
            </div>
          </article>
          <p class="wp-mil-total">全境合计 {{ legions.length }} 个军团 · {{ totalCards }} 张兵牌 · {{ totalTroops.toLocaleString() }} 人</p>

          <details class="wp-glossary">
            <summary>名词解释：特质与装备</summary>
            <div class="wp-glossary-body">
              <h4>特质</h4>
              <dl>
                <template v-for="t in glossary.traits" :key="t.name">
                  <dt>{{ t.name }}</dt>
                  <dd>{{ t.desc || '暂无说明' }}</dd>
                </template>
              </dl>
              <h4>装备</h4>
              <dl>
                <template v-for="g in glossary.gear" :key="g.slot + g.name">
                  <dt>{{ g.name }}<small>{{ g.slotLabel }}</small></dt>
                  <dd>{{ g.desc || '暂无说明' }}</dd>
                </template>
              </dl>
            </div>
          </details>
        </template>
        <p v-else class="wp-empty">尚无成建制的军团记录。</p>
      </section>

      <section v-if="wonders.length" id="wonders" class="wp-section">
        <h2>奇观</h2>
        <div class="wp-gallery">
          <figure v-for="w in wonders" :key="w.id">
            <img v-if="w.avatar" :src="withBase(w.avatar)" :alt="w.name" loading="lazy" />
            <figcaption>
              <strong>{{ w.name }}</strong>
              <span v-if="w.desc">{{ w.desc }}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section v-if="modifiers.length" id="policies" class="wp-section">
        <h2>国策与修正</h2>
        <div class="wp-mod-list">
          <article v-for="m in modifiers" :key="m.id" class="wp-mod">
            <h3>{{ m.name }}</h3>
            <p v-if="m.desc" class="wp-mod-desc">{{ m.desc }}</p>
            <p v-if="m.effect" class="wp-mod-effect"><span>效果</span>{{ m.effect }}</p>
          </article>
        </div>
      </section>

      <p class="wp-categories">
        分类：<a>{{ country.race }}</a> · <a>{{ country.politics.system }}</a> ·
        <a>{{ country.region.name }}</a> · <a>葬火之后国家</a>
      </p>
    </template>
    </div>

    <aside class="wp-aside">
      <div class="wp-infobox">
        <p class="wp-infobox-title">{{ country.name }}</p>
        <img v-if="leaderAvatar" class="wp-infobox-img" :src="leaderAvatar" :alt="country.politics.leader.name" />
        <p class="wp-infobox-caption">{{ country.politics.leader.title }} {{ country.politics.leader.name }}</p>
        <table>
          <tbody>
            <tr><th>种族</th><td>{{ country.race }}</td></tr>
            <tr><th>首都</th><td>{{ country.capital }}</td></tr>
            <tr><th>信仰</th><td>{{ country.faith }}</td></tr>
            <tr v-if="populationText"><th>人口</th><td>{{ populationText }}</td></tr>
            <tr><th>政体</th><td>{{ country.politics.system }}</td></tr>
            <tr><th>区域</th><td>{{ country.region.name }}</td></tr>
            <tr><th>派系</th><td>{{ factions.length }} 个</td></tr>
            <tr><th>军团</th><td>{{ legions.length }} 支 / {{ totalTroops.toLocaleString() }} 人</td></tr>
          </tbody>
        </table>
      </div>

      <nav class="wp-toc">
        <p class="wp-toc-title">目录</p>
        <ol>
          <li v-for="[id, label] in toc" :key="id"><a :href="'#' + id">{{ label }}</a></li>
        </ol>
      </nav>
    </aside>
  </div>
</template>

<style scoped>
.wp-page {
  --accent: #2f7d63;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 272px;
  gap: 32px;
  align-items: start;
  margin-top: 4px;
}

.wp-main {
  min-width: 0;
  font-size: 15px;
  line-height: 1.85;
}

.wp-lead {
  margin: 0 0 26px;
  font-size: 15.5px;
  color: var(--vp-c-text-1);
}

.wp-section {
  margin-top: 34px;
}

.wp-section h2 {
  margin: 0 0 14px;
  padding-bottom: 7px;
  font-size: 21px;
  font-weight: 600;
  border-bottom: 1px solid var(--vp-c-divider);
}

.wp-section p {
  margin: 0 0 12px;
  color: var(--vp-c-text-2);
}

.wp-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 10px 0 0;
  padding: 0;
  list-style: none;
}

.wp-tags li {
  padding: 2px 9px;
  font-size: 12.5px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

.wp-ruler {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 16px;
  padding: 18px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.wp-ruler-name {
  margin: 0;
  font-size: 19px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.wp-ruler-title {
  margin: 2px 0 10px;
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}

.wp-ruler blockquote {
  margin: 12px 0 0;
  padding: 2px 0 2px 12px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  border-left: 3px solid color-mix(in srgb, var(--accent) 50%, transparent);
}

.wp-stat-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 13px;
}

.wp-stat-table tr th {
  width: 62px;
  min-width: 62px;
  padding: 4px 0;
  font-size: 12.5px;
  white-space: nowrap;
  text-align: left;
  font-weight: 400;
  color: var(--vp-c-text-3);
}

.wp-stat-bar {
  width: 100%;
  padding: 4px 8px 4px 0;
}

.wp-bar {
  display: block;
  height: 8px;
  border-radius: 4px;
  background: var(--vp-c-default-soft);
  overflow: hidden;
}

.wp-bar i {
  display: block;
  height: 100%;
  background: var(--accent);
}

.wp-stat-num {
  width: 28px;
  text-align: right;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-1);
}

.wp-stat-total th,
.wp-stat-total td {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 7px;
  font-weight: 600;
}

.wp-factions {
  display: grid;
  grid-template-columns: 170px minmax(0, 1fr);
  gap: 34px;
  align-items: center;
}

.wp-donut {
  width: 180px;
  height: 180px;
}

.wp-donut-label {
  font-size: 15px;
  font-weight: 600;
  fill: var(--vp-c-text-1);
}

.wp-donut-sub {
  font-size: 9px;
  fill: var(--vp-c-text-3);
}

.wp-faction-table,
.wp-unit-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
}

.wp-faction-table th:nth-child(1),
.wp-faction-table td:nth-child(1) {
  width: 38%;
}

.wp-faction-table th:nth-child(2),
.wp-faction-table td:nth-child(2) {
  width: 40%;
}

.wp-faction-table td {
  word-break: keep-all;
}

.wp-faction-table th,
.wp-unit-table th {
  padding: 9px 14px;
  text-align: left;
  font-weight: 500;
  font-size: 12.5px;
  color: var(--vp-c-text-3);
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.wp-faction-table td,
.wp-unit-table td {
  padding: 11px 14px;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.wp-dot {
  display: inline-block;
  width: 9px;
  height: 9px;
  margin-right: 7px;
  border-radius: 2px;
  vertical-align: baseline;
}

.wp-num {
  text-align: right;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-1);
}

.wp-muted {
  color: var(--vp-c-text-3);
  font-size: 12.5px;
}

.wp-mil-stats {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.wp-mil-stats > div {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.wp-mil-stats strong {
  display: block;
  font-size: 22px;
  line-height: 1.1;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}

.wp-mil-stats span {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

/* 军团与兵牌 */
.wp-legion {
  margin-bottom: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
}

.wp-legion-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 10px;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.wp-legion-head h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.wp-legion-meta {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}

.wp-legion-meta strong {
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}

.wp-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 10px;
  padding: 14px 16px;
}

.wp-card {
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.wp-card-name {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin: 0;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.wp-card-name em {
  font-style: normal;
  color: var(--accent);
}

.wp-card-meta {
  margin: 3px 0 0;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.wp-traits {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin: 6px 0 0;
  padding: 0;
  list-style: none;
}

.wp-traits li {
  padding: 1px 7px;
  font-size: 11.5px;
  color: color-mix(in srgb, var(--accent) 85%, var(--vp-c-text-1));
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent);
  border-radius: 4px;
  cursor: help;
}

.wp-card-gear {
  display: flex;
  flex-wrap: wrap;
  gap: 2px 10px;
  margin: 7px 0 0;
  font-size: 11.5px;
  color: var(--vp-c-text-3);
}

.wp-card-gear span {
  cursor: help;
}

.wp-glossary {
  margin-top: 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.wp-glossary summary {
  padding: 10px 16px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.wp-glossary-body {
  padding: 4px 18px 16px;
}

.wp-glossary-body h4 {
  margin: 12px 0 6px;
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}

.wp-glossary-body dl {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 6px 14px;
  margin: 0;
  font-size: 12.5px;
}

.wp-glossary-body dt {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.wp-glossary-body dt small {
  margin-left: 6px;
  font-weight: 400;
  color: var(--vp-c-text-3);
}

.wp-glossary-body dd {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.wp-card-mods {
  margin: 6px 0 0;
  font-size: 12px;
  color: color-mix(in srgb, var(--accent) 80%, var(--vp-c-text-1));
}

.wp-card-total {
  margin: 8px 0 0;
  padding-top: 6px;
  border-top: 1px dashed var(--vp-c-divider);
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.wp-mil-total {
  margin: 2px 0 0;
  text-align: right;
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}

.wp-unit-name {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.wp-unit-name small {
  display: block;
  font-weight: 400;
  font-size: 11.5px;
  color: var(--vp-c-text-3);
}

.wp-unit-table tfoot th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.wp-empty {
  padding: 18px;
  text-align: center;
  font-size: 13.5px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 8px;
}

.wp-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.wp-gallery figure {
  margin: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.wp-gallery img {
  display: block;
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.wp-gallery figcaption {
  padding: 12px 14px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.wp-gallery figcaption strong {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.wp-mod-list {
  display: grid;
  gap: 12px;
}

.wp-mod {
  padding: 14px 18px;
  border: 1px solid var(--vp-c-divider);
  border-left: 3px solid color-mix(in srgb, var(--accent) 60%, transparent);
  border-radius: 0 8px 8px 0;
  background: var(--vp-c-bg-soft);
}

.wp-mod h3 {
  margin: 0 0 6px;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.wp-mod-desc {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.75;
  color: var(--vp-c-text-2);
}

.wp-mod-effect {
  display: flex;
  gap: 8px;
  align-items: baseline;
  margin: 10px 0 0;
  padding-top: 8px;
  border-top: 1px dashed var(--vp-c-divider);
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.wp-mod-effect span {
  flex: 0 0 auto;
  padding: 1px 7px;
  font-size: 11.5px;
  color: #fff;
  background: color-mix(in srgb, var(--accent) 80%, #000);
  border-radius: 4px;
}

.wp-categories {
  margin-top: 40px;
  padding-top: 14px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}

.wp-categories a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.wp-aside {
  position: sticky;
  top: 90px;
  font-size: 13px;
}

.wp-infobox {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}

.wp-infobox-title {
  margin: 0;
  padding: 10px 14px;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  color: #fff;
  background: var(--accent);
}

.wp-infobox-img {
  display: block;
  width: 100%;
  max-height: 220px;
  object-fit: cover;
}

.wp-infobox-caption {
  margin: 0;
  padding: 6px 12px;
  font-size: 11.5px;
  text-align: center;
  color: var(--vp-c-text-3);
  border-bottom: 1px solid var(--vp-c-divider);
}

.wp-infobox table {
  width: 100%;
  border-collapse: collapse;
}

.wp-infobox th,
.wp-infobox td {
  padding: 7px 12px;
  text-align: left;
  vertical-align: top;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 12.5px;
}

.wp-infobox th {
  width: 62px;
  font-weight: 500;
  color: var(--vp-c-text-3);
  background: color-mix(in srgb, var(--accent) 6%, transparent);
}

.wp-infobox td {
  color: var(--vp-c-text-1);
}

.wp-infobox tr:last-child th,
.wp-infobox tr:last-child td {
  border-bottom: none;
}

.wp-toc {
  margin-top: 18px;
  padding: 12px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.wp-toc-title {
  margin: 0 0 8px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--vp-c-text-3);
}

.wp-toc ol {
  margin: 0;
  padding-left: 18px;
  font-size: 12.5px;
}

.wp-toc li {
  margin: 4px 0;
}

.wp-toc a {
  color: var(--vp-c-text-2);
  text-decoration: none;
}

.wp-toc a:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}

@media (max-width: 1100px) {
  .wp-page {
    grid-template-columns: minmax(0, 1fr);
  }

  .wp-aside {
    position: static;
    order: -1;
  }

  .wp-ruler {
    grid-template-columns: minmax(0, 1fr);
  }

  .wp-factions {
    grid-template-columns: minmax(0, 1fr);
    justify-items: center;
  }
}

/* 编辑模式 */
.wp-edit-toggle {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.wp-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 14px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
  cursor: pointer;
}

.wp-btn.primary {
  color: #fff;
  background: var(--vp-c-brand-1);
  border-color: transparent;
}

.wp-btn.small {
  padding: 5px 10px;
  font-size: 11.5px;
}

.wp-btn:disabled {
  opacity: 0.6;
}

.wp-flash {
  margin: 0 0 10px;
  padding: 8px 12px;
  font-size: 12.5px;
  color: #1f6f4f;
  background: rgba(47, 125, 99, 0.12);
  border-radius: 7px;
}

.wp-editbar {
  position: sticky;
  top: 70px;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
  padding: 10px 14px;
  font-size: 12.5px;
  color: #fff;
  background: linear-gradient(100deg, #2f7d63, #245c4a);
  border-radius: 9px;
  box-shadow: 0 8px 20px rgba(16, 32, 28, 0.18);
}

.wp-editbar-actions {
  display: flex;
  gap: 8px;
}

.wp-editbar .wp-btn {
  color: #fff;
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.28);
}

.wp-editbar .wp-btn.primary {
  color: #10201c;
  background: #f0d9a4;
  border-color: transparent;
}

.wp-editsection {
  margin-top: 26px;
}

.wp-editsection h2 {
  margin: 0 0 12px;
  padding-bottom: 6px;
  font-size: 18px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.wp-editgrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
  margin-bottom: 12px;
}

.wp-editgrid label,
.wp-editblock {
  display: grid;
  gap: 5px;
}

.wp-editsection span {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.wp-editsection input,
.wp-editsection textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 7px 10px;
  font: inherit;
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px dashed color-mix(in srgb, var(--vp-c-brand-1) 45%, var(--vp-c-divider));
  border-radius: 6px;
  outline: none;
  resize: vertical;
}

.wp-editsection input:focus,
.wp-editsection textarea:focus {
  border-style: solid;
  border-color: var(--vp-c-brand-1);
}

.wp-editrows {
  display: grid;
  gap: 6px;
}

.wp-editrow {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 70px 16px;
  gap: 6px;
  align-items: center;
}

.wp-editrow.comp {
  grid-template-columns: minmax(0, 1.2fr) 60px 70px minmax(0, 1fr) 70px minmax(0, 1.4fr);
  margin: 6px 0;
}

.wp-editrow .w-full {
  grid-column: 1 / -1;
}

.wp-pct {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.wp-editcard {
  margin-bottom: 12px;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 9px;
  background: var(--vp-c-bg-soft);
}

.wp-editcard input,
.wp-editcard textarea {
  margin-bottom: 6px;
}


.wp-sub {
  margin: 18px 0 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.wp-econ-list {
  display: grid;
  gap: 5px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.wp-econ-list li {
  display: flex;
  justify-content: space-between;
  padding: 7px 11px;
  font-size: 13px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
  background: var(--vp-c-bg-soft);
}

.wp-econ-list em {
  font-style: normal;
  font-size: 12px;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}

.wp-econ-note {
  margin: 10px 0 0;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.wp-good {
  color: #1f6f4f;
}

.wp-bad {
  color: #9c4b4b;
}


.wp-trait-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.wp-trait-civ {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.wp-trait-civ span {
  font-weight: 400;
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}

.wp-trait-leader {
  margin: 4px 0 0;
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}

.wp-trait-points {
  display: grid;
  justify-items: end;
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.wp-trait-points strong {
  font-size: 20px;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-brand-1);
}

.wp-trait-points span {
  font-size: 10.5px;
  color: var(--vp-c-text-3);
}

.wp-trait-bg {
  margin: 0 0 14px;
  padding: 10px 14px;
  font-size: 12.5px;
  line-height: 1.8;
  color: var(--vp-c-text-3);
  border-left: 2px solid var(--vp-c-divider);
}

.wp-trait-group {
  margin-top: 14px;
}

.wp-trait-list {
  display: grid;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.wp-trait-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 9px;
  background: var(--vp-c-bg-soft);
}

.wp-trait-item.pos {
  border-color: rgba(47, 125, 99, 0.35);
}

.wp-trait-item.neg {
  border-color: rgba(156, 75, 75, 0.35);
}

.wp-trait-main {
  flex: 1;
}

.wp-trait-main strong {
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.wp-trait-main p {
  margin: 3px 0 0;
  font-size: 11.5px;
  line-height: 1.7;
  color: var(--vp-c-text-3);
}

.wp-trait-cat {
  margin-right: 6px;
  padding: 0 5px;
  font-size: 10px;
  color: var(--vp-c-text-3);
  border: 1px solid var(--vp-c-divider);
  border-radius: 3px;
}

.wp-trait-pt {
  flex: 0 0 auto;
  font-style: normal;
  font-size: 12.5px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-3);
}

.wp-trait-item.pos .wp-trait-pt {
  color: var(--vp-c-brand-1);
}

.wp-trait-item.neg .wp-trait-pt {
  color: #9c4b4b;
}

.wp-trait-mods {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0 0 14px;
  padding: 0;
  list-style: none;
}

.wp-trait-mods li {
  padding: 3px 10px;
  font-size: 11.5px;
  color: var(--vp-c-text-3);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
}

.wp-trait-mods em {
  font-style: normal;
  margin-left: 4px;
  font-variant-numeric: tabular-nums;
}

.wp-trait-mods em.pos {
  color: var(--vp-c-brand-1);
}

.wp-trait-mods em.neg {
  color: #b06a6a;
}
</style>
