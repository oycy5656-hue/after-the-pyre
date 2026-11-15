<script setup>
import { computed, onMounted, ref } from 'vue'
import countries from '../../data/countries.mjs'
import map from '../../data/map.mjs'
import { buildRows, DEFAULT_BASE, DEFAULT_COUNTRY_TRAITS, DEFAULT_GOODS, DEFAULT_TRAITS } from '../../data/economy-model.mjs'
import { currentUser, getOverride, initAuth, loadEdits, saveOverride } from '../auth'

const unit = { name: 'D（当量）', desc: '一名成年人维持一天基本生活所需的商品与劳务。全大陆通用，不依赖货币。' }

const clone = (v) => JSON.parse(JSON.stringify(v))
const cfg = ref({
  base: clone(DEFAULT_BASE),
  goods: clone(DEFAULT_GOODS),
  traits: clone(DEFAULT_TRAITS),
  countryTraits: clone(DEFAULT_COUNTRY_TRAITS),
  populations: {},
  countryOverrides: {}
})

const isAdminUser = ref(false)
const editing = ref(false)
const saving = ref(false)
const flash = ref('')
const traitCountry = ref('玉海国')
const selected = ref('玉海国')

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

onMounted(async () => {
  await initAuth()
  const u = currentUser()
  isAdminUser.value = !!u && u.role === 'admin'
  await loadEdits()
  const ov = getOverride('__economy__')
  if (ov) {
    cfg.value = {
      base: { ...DEFAULT_BASE, ...(ov.base || {}) },
      goods: clone(ov.goods || DEFAULT_GOODS),
      traits: clone(ov.traits || DEFAULT_TRAITS),
      countryTraits: clone(ov.countryTraits || DEFAULT_COUNTRY_TRAITS),
      populations: clone(ov.populations || {}),
      countryOverrides: clone(ov.countryOverrides || {})
    }
  }
})

const rows = computed(() => buildRows(countries, map, cfg.value))
const goods = computed(() => cfg.value.goods)
const traitsList = computed(() => cfg.value.traits)
const listed = computed(() => rows.value.filter((r) => r.traitNames > 0))

const current = computed(
  () => rows.value.find((r) => r.name === selected.value) || listed.value[0] || rows.value[0]
)

const sortKey = ref('perCapitaSurplus')
const sorted = computed(() => [...rows.value].sort((a, b) => b[sortKey.value] - a[sortKey.value]))
const maxGross = computed(() => Math.max(...rows.value.map((r) => r.gross), 1))
const maxSurplus = computed(() => Math.max(...rows.value.map((r) => Math.abs(r.perCapitaSurplus)), 1))

const fmt = (n) => {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
  if (n >= 1e4) return (n / 1e4).toFixed(1) + '万'
  return String(Math.round(n))
}

const alloc = computed(() => {
  const r = current.value
  if (!r) return []
  return [
    { label: '上层抽取', value: r.extracted, color: '#9c6f6f' },
    { label: '神庙与仪式', value: r.ritual, color: '#c9a24a' },
    { label: '种子与损耗', value: r.upkeep, color: '#7f8c99' },
    { label: '可支配剩余', value: Math.max(0, r.surplus), color: '#2f7d63' }
  ]
})

const pick = (name) => {
  selected.value = name
  traitCountry.value = name
}

const toggleTrait = (name) => {
  const list = cfg.value.countryTraits[traitCountry.value] || []
  const i = list.indexOf(name)
  if (i >= 0) list.splice(i, 1)
  else list.push(name)
  cfg.value.countryTraits[traitCountry.value] = list
}

const toggleTraitFor = (countryName, traitName) => {
  const list = cfg.value.countryTraits[countryName] || []
  const i = list.indexOf(traitName)
  if (i >= 0) list.splice(i, 1)
  else list.push(traitName)
  cfg.value.countryTraits[countryName] = list
}

const setManual = (countryName, key, raw) => {
  const bucket = cfg.value.countryOverrides[countryName] || {}
  if (raw === '' || raw === null || raw === undefined) delete bucket[key]
  else bucket[key] = Number(raw)
  if (Object.keys(bucket).length) cfg.value.countryOverrides[countryName] = bucket
  else delete cfg.value.countryOverrides[countryName]
}

const clearManual = (countryName) => {
  delete cfg.value.countryOverrides[countryName]
}

const manualOf = (countryName, key, fallback) => {
  const v = cfg.value.countryOverrides?.[countryName]?.[key]
  return v === undefined ? fallback : v
}

const saveCfg = async () => {
  saving.value = true
  flash.value = ''
  try {
    await saveOverride('__economy__', cfg.value)
    flash.value = '已保存经济参数，全站生效'
    editing.value = false
  } catch (e) {
    flash.value = '保存失败：' + e.message
  } finally {
    saving.value = false
  }
}

const resetCfg = () => {
  cfg.value = {
    base: clone(DEFAULT_BASE),
    goods: clone(DEFAULT_GOODS),
    traits: clone(DEFAULT_TRAITS),
    countryTraits: clone(DEFAULT_COUNTRY_TRAITS),
    populations: {},
    countryOverrides: {}
  }
  flash.value = '已恢复默认值（尚未保存）'
}
</script>

<template>
  <div class="eco">
    <div v-if="isAdminUser" class="eco-toolbar">
      <button v-if="!editing" type="button" class="eco-btn" @click="editing = true">编辑经济参数</button>
      <template v-else>
        <button type="button" class="eco-btn primary" :disabled="saving" @click="saveCfg">{{ saving ? '保存中…' : '保存并生效' }}</button>
        <button type="button" class="eco-btn" @click="editing = false">退出编辑</button>
        <button type="button" class="eco-btn" @click="resetCfg">恢复默认</button>
        <span class="eco-tip">改动实时反映到数字，保存后全站生效。</span>
      </template>
      <span v-if="flash" class="eco-flash">{{ flash }}</span>
    </div>

    <div class="eco-layout">
      <!-- 左栏：单国经济 -->
      <aside class="eco-rail">
        <h3>国家经济</h3>
        <p class="eco-rail-hint">点国家查看单国账目</p>
        <ul class="eco-country-list">
          <li v-for="r in sorted" :key="r.name">
            <button type="button" :class="{ on: r.name === selected }" @click="pick(r.name)">
              <span class="eco-cn">{{ r.name }}</span>
              <span class="eco-cv">{{ r.perCapitaSurplus }}</span>
              <span class="eco-cd" :class="r.score >= 70 ? 'good' : r.score >= 55 ? 'mid' : 'low'">{{ r.score ?? '—' }}</span>
            </button>
          </li>
        </ul>

        <div v-if="current" class="eco-card">
          <h4>{{ current.name }}</h4>
          <p v-if="!editing" class="eco-card-sub">
            人口 {{ current.populationText }} · 面积 {{ current.area ?? '—' }} · {{ current.traitNames }} 项天赋
          </p>
          <div v-else class="eco-card-edit">
            <label class="eco-rail-pop">
              <span>人口</span>
              <input
                :value="cfg.populations[current.name] ?? current.populationText"
                placeholder="如 203K"
                @input="cfg.populations[current.name] = $event.target.value"
              />
            </label>
            <p class="eco-rail-traits-title">该国的天赋（勾选生效）</p>
            <div class="eco-rail-traits">
              <label v-for="t in cfg.traits" :key="t.name">
                <input
                  type="checkbox"
                  :checked="(cfg.countryTraits[current.name] || []).includes(t.name)"
                  @change="toggleTraitFor(current.name, t.name)"
                />
                <span>{{ t.name }}</span>
              </label>
            </div>
          </div>
          <dl v-if="!editing" class="eco-kpi-mini">
            <div><dt>{{ fmt(current.gross) }}</dt><dd>总产出</dd></div>
            <div><dt>{{ current.perCapita }}</dt><dd>人均产出</dd></div>
            <div><dt>{{ Math.round(current.extractionRate * 100) }}%</dt><dd>抽取率</dd></div>
            <div><dt>{{ Math.round(current.surplusRate * 100) }}%</dt><dd>剩余率</dd></div>
            <div><dt>{{ current.reserveMonths }} 月</dt><dd>储备</dd></div>
            <div><dt>{{ current.radius }} km</dt><dd>交换半径</dd></div>
            <div><dt>{{ fmt(current.levy) }}</dt><dd>可动员</dd></div>
            <div><dt>{{ current.score ?? '—' }}</dt><dd>体质</dd></div>
          </dl>

          <div v-else class="eco-kpi-edit">
            <label>
              <span>总产出 (D)</span>
              <input type="number" :value="manualOf(current.name, 'gross', current.gross)" @input="setManual(current.name, 'gross', $event.target.value)" />
            </label>
            <label>
              <span>人均产出</span>
              <input type="number" :value="manualOf(current.name, 'perCapita', current.perCapita)" @input="setManual(current.name, 'perCapita', $event.target.value)" />
            </label>
            <label>
              <span>抽取率 %</span>
              <input type="number" step="1" :value="manualOf(current.name, 'extractionPct', Math.round(current.extractionRate * 100))" @input="setManual(current.name, 'extractionPct', $event.target.value)" />
            </label>
            <label>
              <span>剩余率 %</span>
              <input type="number" step="1" :value="manualOf(current.name, 'surplusPct', Math.round(current.surplusRate * 100))" @input="setManual(current.name, 'surplusPct', $event.target.value)" />
            </label>
            <label>
              <span>储备（月）</span>
              <input type="number" step="0.1" :value="manualOf(current.name, 'reserveMonths', current.reserveMonths)" @input="setManual(current.name, 'reserveMonths', $event.target.value)" />
            </label>
            <label>
              <span>交换半径 km</span>
              <input type="number" :value="manualOf(current.name, 'radius', current.radius)" @input="setManual(current.name, 'radius', $event.target.value)" />
            </label>
            <label>
              <span>可动员</span>
              <input type="number" :value="manualOf(current.name, 'levy', current.levy)" @input="setManual(current.name, 'levy', $event.target.value)" />
            </label>
            <label>
              <span>体质评分</span>
              <input type="number" :value="manualOf(current.name, 'score', current.score ?? '')" @input="setManual(current.name, 'score', $event.target.value)" />
            </label>
            <button type="button" class="eco-btn small" @click="clearManual(current.name)">清除手填</button>
          </div>
          <p v-if="!editing && current.manual" class="eco-manual-tag">含手工设定的数值</p>

          <p class="eco-mini-title">产出构成</p>
          <div class="eco-stack slim">
            <span
              v-for="p in current.parts"
              :key="p.label"
              :style="{ width: (p.value / current.gross) * 100 + '%', background: p.color }"
              :title="p.label + ' ' + fmt(p.value) + ' D'"
            ></span>
          </div>
          <ul class="eco-legend tight">
            <li v-for="p in current.parts" :key="p.label"><i :style="{ background: p.color }"></i>{{ p.label }}</li>
          </ul>

          <p class="eco-mini-title">产出如何分掉</p>
          <div class="eco-stack slim">
            <span
              v-for="a in alloc"
              :key="a.label"
              :style="{ width: (a.value / current.gross) * 100 + '%', background: a.color }"
              :title="a.label + ' ' + fmt(a.value) + ' D'"
            ></span>
          </div>
          <ul class="eco-legend tight">
            <li v-for="a in alloc" :key="a.label"><i :style="{ background: a.color }"></i>{{ a.label }}</li>
          </ul>
        </div>
      </aside>

      <!-- 右栏 -->
      <div class="eco-main">
        <section class="eco-block">
          <h2>统一口径：当量（D）</h2>
          <p class="eco-lead">
            这片大陆没有铸币，也没有信用票据。本系统以 <strong>{{ unit.name }}</strong> 为唯一记账单位——{{ unit.desc }}
            商品与劳役先折算成 D，再进入统计。
          </p>
          <div class="eco-goods">
            <div v-for="g in goods" :key="g.name" class="eco-good">
              <p class="eco-good-name">{{ g.name }}</p>
              <p class="eco-good-bar"><span :style="{ width: Math.min(100, (g.value / 60) * 100) + '%' }"></span></p>
              <p class="eco-good-value">{{ g.value }} D</p>
            </div>
          </div>
        </section>

        <section class="eco-block">
          <h2>全境经济对照</h2>
          <p class="eco-lead">
            按
            <button type="button" class="eco-sort" @click="sortKey = 'perCapitaSurplus'">人均剩余</button> /
            <button type="button" class="eco-sort" @click="sortKey = 'gross'">总产出</button> /
            <button type="button" class="eco-sort" @click="sortKey = 'score'">体质评分</button>
            排序。点任意一行可在左侧查看该国账目。
          </p>
          <table class="eco-table">
            <thead>
              <tr>
                <th>国家</th>
                <th>人口</th>
                <th>面积</th>
                <th>总产出</th>
                <th>人均剩余</th>
                <th>储备</th>
                <th>半径</th>
                <th>评分</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in sorted" :key="r.name" :class="{ on: r.name === selected }" @click="pick(r.name)">
                <td class="eco-name">
                  <span>{{ r.name }}</span>
                  <em v-if="r.traitNames" class="eco-badge">{{ r.traitNames }} 项</em>
                  <em v-else class="eco-badge muted">未录入</em>
                </td>
                <td class="num">{{ r.populationText }}</td>
                <td class="num">{{ r.area ?? '—' }}</td>
                <td class="num">
                  <span class="eco-mini-bar"><i :style="{ width: (r.gross / maxGross) * 100 + '%' }"></i></span>
                  {{ fmt(r.gross) }}
                </td>
                <td class="num">
                  <span class="eco-mini-bar"><i :style="{ width: (Math.max(0, r.perCapitaSurplus) / maxSurplus) * 100 + '%' }"></i></span>
                  {{ r.perCapitaSurplus }}
                </td>
                <td class="num">{{ r.reserveMonths }} 月</td>
                <td class="num">{{ r.radius }} km</td>
                <td class="num"><b :class="r.score >= 70 ? 'good' : r.score >= 55 ? 'mid' : 'low'">{{ r.score ?? '—' }}</b></td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>

    <!-- 底部：天赋数值表 -->
    <section class="eco-block eco-traits-section">
      <h2>天赋数值表</h2>
      <p class="eco-lead">
        每项天赋对六个经济参数的加减（0.05 = +5%）。高亮行是 <strong>{{ current?.name }}</strong> 当前生效的
        {{ current?.traits.length || 0 }} 项。
      </p>
      <table class="eco-trait-table">
        <thead>
          <tr>
            <th>天赋</th>
            <th v-for="(label, key) in PARAM_LABEL" :key="key">{{ label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in traitsList" :key="t.name" :class="{ on: current?.traits.includes(t.name) }">
            <td class="eco-trait-name">{{ t.name }}</td>
            <td v-for="(label, key) in PARAM_LABEL" :key="key" class="num">
              <span v-if="t.e[key] !== undefined" :class="t.e[key] > 0 ? 'up' : 'down'">
                {{ t.e[key] > 0 ? '+' : '' }}{{ Math.round(t.e[key] * 100) }}%
              </span>
              <span v-else class="dim">—</span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- 编辑面板 -->
    <section v-if="editing" class="eco-edit">
      <h3>基础参数</h3>
      <div class="eco-edit-grid">
        <label v-for="[key, label] in PARAM_KEYS" :key="key">
          <span>{{ label }}</span>
          <input v-model.number="cfg.base[key]" type="number" step="0.01" />
        </label>
      </div>

      <h3>当量折算表</h3>
      <div class="eco-edit-goods">
        <label v-for="g in cfg.goods" :key="g.name">
          <span>{{ g.name }}</span>
          <input v-model.number="g.value" type="number" step="0.1" />
        </label>
      </div>

      <h3>天赋系数</h3>
      <div class="eco-edit-traits">
        <div class="eco-trait-head">
          <span>天赋</span>
          <span v-for="(label, key) in PARAM_LABEL" :key="key">{{ label }}</span>
        </div>
        <div v-for="t in cfg.traits" :key="t.name" class="eco-trait-line">
          <span>{{ t.name }}</span>
          <input v-for="(label, key) in PARAM_LABEL" :key="key" v-model.number="t.e[key]" type="number" step="0.01" placeholder="0" />
        </div>
      </div>

      <h3>各国生效的天赋</h3>
      <div class="eco-edit-country">
        <select v-model="traitCountry">
          <option v-for="c in countries" :key="c.name" :value="c.name">{{ c.name }}</option>
        </select>
        <div class="eco-checks">
          <label v-for="t in cfg.traits" :key="t.name">
            <input type="checkbox" :checked="(cfg.countryTraits[traitCountry] || []).includes(t.name)" @change="toggleTrait(t.name)" />
            <span>{{ t.name }}</span>
          </label>
        </div>
      </div>
    </section>

    <details class="eco-method">
      <summary>计算方式（可复核）</summary>
      <pre>总产出 G = 人口 × 人均年产出 × (1 + 天赋产出修正 + 政体 + 集聚 + 风土)
上层抽取 E = G × (基准抽取 + 抽取修正)
神庙与仪式 R = G × (基准仪式 + 仪式修正)
种子与损耗 K = G × 种子损耗率
可支配剩余 S = G − E − R − K
交换半径 = 12 + 140 × √(面积/1000) × (0.4 + 交换效率)
储备（月）= 基准储备 × (1 + 产出修正×1.4 − 抽取率 − 仪式率 + 0.2)
可动员人力 = 人口 × 动员率 × (1 + 动员修正)
体质评分 = 20 + 35×剩余率 + 15×交换 + 15×储备 + 10×稳定 − 60×超额抽取 − 40×超额仪式</pre>
    </details>
  </div>
</template>

<style scoped>
.eco {
  max-width: 100%;
}

.eco-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin: 4px 0 14px;
}

.eco-btn {
  padding: 7px 14px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
  cursor: pointer;
}

.eco-btn.primary {
  color: #fff;
  background: var(--vp-c-brand-1);
  border-color: transparent;
}

.eco-tip,
.eco-flash {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.eco-flash {
  color: #1f6f4f;
}

.eco-layout {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  gap: 26px;
  align-items: start;
}

.eco-rail {
  position: sticky;
  top: 84px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.eco-rail h3 {
  margin: 0;
  font-size: 14px;
}

.eco-rail-hint {
  margin: 4px 0 10px;
  font-size: 11.5px;
  color: var(--vp-c-text-3);
}

.eco-country-list {
  display: grid;
  gap: 2px;
  max-height: 330px;
  overflow: auto;
  margin: 0 0 14px;
  padding: 0;
  list-style: none;
}

.eco-country-list button {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 52px 26px;
  gap: 6px;
  align-items: center;
  width: 100%;
  padding: 5px 8px;
  font-size: 12.5px;
  text-align: left;
  color: var(--vp-c-text-2);
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.eco-country-list button:hover {
  background: var(--vp-c-default-soft);
}

.eco-country-list button.on {
  color: var(--vp-c-text-1);
  font-weight: 600;
  background: var(--vp-c-bg);
}

.eco-cv,
.eco-cd {
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.eco-cd {
  font-size: 11.5px;
}

.eco-card {
  padding-top: 14px;
  border-top: 1px solid var(--vp-c-divider);
}

.eco-card h4 {
  margin: 0;
  font-size: 15px;
}

.eco-card-sub {
  margin: 4px 0 12px;
  font-size: 11.5px;
  color: var(--vp-c-text-3);
}

.eco-kpi-mini {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin: 0 0 14px;
}

.eco-kpi-mini div {
  padding: 7px 9px;
  border-radius: 7px;
  background: var(--vp-c-bg);
}

.eco-kpi-mini dt {
  font-size: 15px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}

.eco-kpi-mini dd {
  margin: 1px 0 0;
  font-size: 10.5px;
  color: var(--vp-c-text-3);
}

.eco-mini-title {
  margin: 12px 0 6px;
  font-size: 11.5px;
  color: var(--vp-c-text-3);
}

.eco-stack {
  display: flex;
  height: 22px;
  border-radius: 5px;
  overflow: hidden;
  background: var(--vp-c-default-soft);
}

.eco-stack.slim {
  height: 14px;
}

.eco-stack span {
  display: block;
  height: 100%;
}

.eco-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 12px;
  margin: 6px 0 0;
  padding: 0;
  list-style: none;
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.eco-legend.tight {
  gap: 3px 10px;
  font-size: 10.5px;
}

.eco-legend i {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 5px;
  border-radius: 2px;
}

.eco-block {
  margin-top: 0;
}

.eco-block + .eco-block {
  margin-top: 34px;
}

.eco-block h2 {
  margin: 0 0 10px;
  padding-bottom: 6px;
  font-size: 19px;
  font-weight: 600;
  border-bottom: 1px solid var(--vp-c-divider);
}

.eco-lead {
  margin: 0 0 14px;
  font-size: 13.5px;
  line-height: 1.8;
  color: var(--vp-c-text-2);
}

.eco-goods {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 8px;
}

.eco-good {
  padding: 9px 11px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.eco-good-name {
  margin: 0 0 6px;
  font-size: 11.5px;
  color: var(--vp-c-text-2);
}

.eco-good-bar {
  margin: 0 0 5px;
  height: 5px;
  border-radius: 3px;
  background: var(--vp-c-default-soft);
  overflow: hidden;
}

.eco-good-bar span {
  display: block;
  height: 100%;
  background: #b08a4f;
}

.eco-good-value {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  color: #b08a4f;
  font-variant-numeric: tabular-nums;
}

.eco-sort {
  padding: 0 2px;
  font: inherit;
  color: var(--vp-c-brand-1);
  background: none;
  border: none;
  border-bottom: 1px dashed currentColor;
  cursor: pointer;
}

.eco-table {
  display: table;
  width: 100%;
  border-collapse: collapse;
  font-size: 12.5px;
}

.eco-table th {
  padding: 7px 8px;
  text-align: left;
  font-weight: 500;
  font-size: 11.5px;
  color: var(--vp-c-text-3);
  border-bottom: 1px solid var(--vp-c-divider);
  white-space: nowrap;
}

.eco-table td {
  padding: 7px 8px;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.eco-table tbody tr {
  cursor: pointer;
}

.eco-table tbody tr:hover td {
  background: var(--vp-c-bg-soft);
}

.eco-table tbody tr.on td {
  background: color-mix(in srgb, var(--vp-c-brand-1) 8%, transparent);
  color: var(--vp-c-text-1);
}

.eco-table .num {
  text-align: right;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.eco-name {
  min-width: 130px;
  color: var(--vp-c-text-1);
}

.eco-badge {
  margin-left: 6px;
  padding: 1px 5px;
  font-style: normal;
  font-size: 10px;
  color: #1f6f4f;
  background: rgba(47, 125, 99, 0.12);
  border-radius: 3px;
}

.eco-badge.muted {
  color: var(--vp-c-text-3);
  background: var(--vp-c-default-soft);
}

.eco-mini-bar {
  display: inline-block;
  width: 42px;
  height: 5px;
  margin-right: 5px;
  border-radius: 3px;
  background: var(--vp-c-default-soft);
  overflow: hidden;
  vertical-align: middle;
}

.eco-mini-bar i {
  display: block;
  height: 100%;
  background: #2f7d63;
}

.good {
  color: #1f6f4f;
}

.mid {
  color: #a07b25;
}

.low {
  color: #9c4b4b;
}

.eco-traits-section {
  margin-top: 40px;
}

.eco-trait-table {
  display: table;
  width: 100%;
  border-collapse: collapse;
  font-size: 12.5px;
}

.eco-trait-table th {
  padding: 6px 8px;
  text-align: left;
  font-weight: 500;
  font-size: 11.5px;
  color: var(--vp-c-text-3);
  border-bottom: 1px solid var(--vp-c-divider);
}

.eco-trait-table td {
  padding: 6px 8px;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-3);
}

.eco-trait-table tbody tr.on td {
  color: var(--vp-c-text-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 7%, transparent);
}

.eco-trait-name {
  color: var(--vp-c-text-2);
}

.eco-trait-table .num {
  text-align: right;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.up {
  color: #1f6f4f;
}

.down {
  color: #9c4b4b;
}

.dim {
  color: var(--vp-c-text-3);
}

.eco-edit {
  margin: 22px 0 0;
  padding: 18px;
  border: 1px dashed color-mix(in srgb, var(--vp-c-brand-1) 45%, var(--vp-c-divider));
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.eco-edit h3 {
  margin: 18px 0 8px;
  font-size: 14px;
}

.eco-edit h3:first-child {
  margin-top: 0;
}

.eco-edit label {
  display: grid;
  gap: 4px;
}

.eco-edit span {
  font-size: 11.5px;
  color: var(--vp-c-text-3);
}

.eco-edit input,
.eco-edit select {
  width: 100%;
  box-sizing: border-box;
  padding: 6px 9px;
  font: inherit;
  font-size: 12.5px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  outline: none;
}

.eco-edit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 10px;
}

.eco-edit-goods {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 8px;
}

.eco-edit-goods label {
  grid-template-columns: minmax(0, 1fr) 80px;
  align-items: center;
}

.eco-edit-traits {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.eco-trait-head,
.eco-trait-line {
  display: grid;
  grid-template-columns: minmax(88px, 1.2fr) repeat(7, minmax(0, 1fr));
  gap: 4px;
  align-items: center;
  padding: 5px 8px;
}

.eco-trait-head {
  font-size: 10.5px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.eco-trait-line {
  border-bottom: 1px solid var(--vp-c-divider);
}

.eco-trait-line:last-child {
  border-bottom: none;
}

.eco-trait-line span {
  font-size: 12px;
  color: var(--vp-c-text-1);
}

.eco-trait-line input {
  padding: 3px 5px;
  font-size: 11.5px;
  text-align: right;
}

.eco-edit-country {
  display: grid;
  gap: 10px;
}

.eco-edit-country select {
  max-width: 220px;
}

.eco-checks {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 4px 12px;
}

.eco-checks label {
  display: flex;
  align-items: center;
  gap: 6px;
}

.eco-checks input {
  width: auto;
}

.eco-checks span {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.eco-method {
  margin-top: 26px;
  padding: 12px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.eco-method summary {
  cursor: pointer;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.eco-method pre {
  margin: 10px 0 0;
  font-size: 11px;
  line-height: 1.7;
  white-space: pre-wrap;
  color: var(--vp-c-text-2);
}

@media (max-width: 1080px) {
  .eco-layout {
    grid-template-columns: minmax(0, 1fr);
  }

  .eco-rail {
    position: static;
  }

  .eco-country-list {
    max-height: 200px;
  }
}

/* 左栏编辑态 */
.eco-card-edit {
  margin: 10px 0 4px;
  padding: 10px;
  border: 1px dashed color-mix(in srgb, var(--vp-c-brand-1) 45%, var(--vp-c-divider));
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.eco-rail-pop {
  display: grid;
  gap: 4px;
}

.eco-rail-pop span {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.eco-rail-pop input {
  width: 100%;
  box-sizing: border-box;
  padding: 5px 8px;
  font: inherit;
  font-size: 12.5px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  outline: none;
}

.eco-rail-traits-title {
  margin: 10px 0 6px;
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.eco-rail-traits {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2px;
  max-height: 210px;
  overflow: auto;
  padding-right: 4px;
}

.eco-rail-traits label {
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 20px;
  cursor: pointer;
}

.eco-rail-traits input {
  flex: 0 0 auto;
  width: 13px;
  height: 13px;
  margin: 0;
}

.eco-rail-traits span {
  font-size: 11.5px;
  line-height: 1.4;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}


.eco-kpi-edit {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin: 0 0 12px;
}

.eco-kpi-edit label {
  display: grid;
  gap: 3px;
}

.eco-kpi-edit span {
  font-size: 10.5px;
  color: var(--vp-c-text-3);
}

.eco-kpi-edit input {
  width: 100%;
  box-sizing: border-box;
  padding: 5px 8px;
  font: inherit;
  font-size: 12.5px;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  outline: none;
}

.eco-kpi-edit .eco-btn.small {
  grid-column: 1 / -1;
  justify-self: start;
  padding: 5px 10px;
  font-size: 11.5px;
}

.eco-manual-tag {
  margin: 0 0 10px;
  font-size: 10.5px;
  color: #a07b25;
}

</style>
