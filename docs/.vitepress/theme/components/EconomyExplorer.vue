<script setup>
import { computed, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
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
  countryTraits: clone(DEFAULT_COUNTRY_TRAITS)
})

const isAdminUser = ref(false)
const editing = ref(false)
const saving = ref(false)
const flash = ref('')
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
      countryTraits: clone(ov.countryTraits || DEFAULT_COUNTRY_TRAITS)
    }
  }
})

const rows = computed(() => buildRows(countries, map, cfg.value))
const goods = computed(() => cfg.value.goods)
const traitsList = computed(() => cfg.value.traits)
const listed = computed(() => rows.value.filter((r) => r.traitNames > 0))
const sortKey = ref('perCapitaSurplus')
const sorted = computed(() => [...rows.value].sort((a, b) => b[sortKey.value] - a[sortKey.value]))
const maxGross = computed(() => Math.max(...rows.value.map((r) => r.gross), 1))
const maxSurplus = computed(() => Math.max(...rows.value.map((r) => Math.abs(r.perCapitaSurplus)), 1))

const fmt = (n) => {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
  if (n >= 1e4) return (n / 1e4).toFixed(1) + '万'
  return String(Math.round(n))
}

const traitGroups = computed(() => {
  const m = new Map()
  for (const t of traitsList.value) {
    if (!m.has(t.group)) m.set(t.group, [])
    m.get(t.group).push(t)
  }
  return [...m.entries()]
})

const activeTraits = computed(() => {
  const country = listed.value[0]
  if (!country) return []
  return traitsList.value.filter((t) => country.traits.includes(t.name))
})

const alloc = computed(() => {
  if (!listed.value.length) return []
  const r = listed.value[0]
  return [
    { label: '上层抽取', value: r.extracted, color: '#9c6f6f' },
    { label: '神庙与仪式', value: r.ritual, color: '#c9a24a' },
    { label: '种子与损耗', value: r.upkeep, color: '#7f8c99' },
    { label: '可支配剩余', value: Math.max(0, r.surplus), color: '#2f7d63' }
  ]
})

const toggleTrait = (name) => {
  const list = cfg.value.countryTraits[traitCountry.value] || []
  const i = list.indexOf(name)
  if (i >= 0) list.splice(i, 1)
  else list.push(name)
  cfg.value.countryTraits[traitCountry.value] = list
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
    countryTraits: clone(DEFAULT_COUNTRY_TRAITS)
  }
  flash.value = '已恢复默认值（尚未保存）'
}
</script>

<template>
  <div v-if="isAdminUser" class="eco-toolbar">
      <button v-if="!editing" type="button" class="eco-btn" @click="editing = true">编辑经济参数</button>
      <template v-else>
        <button type="button" class="eco-btn primary" :disabled="saving" @click="saveCfg">{{ saving ? '保存中…' : '保存并生效' }}</button>
        <button type="button" class="eco-btn" @click="editing = false">退出编辑</button>
        <button type="button" class="eco-btn" @click="resetCfg">恢复默认</button>
        <span class="eco-tip">修改会实时反映到下方数字，保存后全站生效。</span>
      </template>
      <span v-if="flash" class="eco-flash">{{ flash }}</span>
    </div>

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
          <input
            v-for="(label, key) in PARAM_LABEL"
            :key="key"
            v-model.number="t.e[key]"
            type="number"
            step="0.01"
            placeholder="0"
          />
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

    <div class="eco">
    <!-- 口径 -->
    <section class="eco-block">
      <h2>统一口径：当量（D）</h2>
      <p class="eco-lead">
        这片大陆没有铸币，也没有信用票据。交易靠实物、劳役与面子，征税靠粮仓与布匹。
        要横向比较，就必须先钉死一把尺子：本系统以
        <strong>{{ unit.name }}</strong>
        为唯一记账单位——{{ unit.desc }}
        一切商品、劳役、贡赋先折算成 D，再进入统计。
      </p>
      <div class="eco-goods">
        <div v-for="g in goods" :key="g.name" class="eco-good">
          <p class="eco-good-name">{{ g.name }}</p>
          <p class="eco-good-bar"><span :style="{ width: Math.min(100, (g.value / 60) * 100) + '%' }"></span></p>
          <p class="eco-good-value">{{ g.value }} D<em>{{ g.note }}</em></p>
        </div>
      </div>
    </section>

    <!-- 天赋系数 -->
    <section class="eco-block">
      <h2>天赋如何进入账本</h2>
      <p class="eco-lead">
        天赋不是形容词，是系数。每一项登记在册的天赋都会改写六个参数中的若干个（乘性叠加），
        最终决定产出率、抽取率、交换半径与储蓄。下表是该文明当前生效的天赋及其账面影响。
      </p>
      <div class="eco-trait-groups">
        <div v-for="[group, items] in traitGroups" :key="group" class="eco-trait-group">
          <h3>{{ group }}</h3>
          <ul>
            <li v-for="t in items" :key="t.name" :class="{ on: activeTraits.some((a) => a.name === t.name) }">
              <span class="eco-trait-name">{{ t.name }}</span>
              <span class="eco-trait-eff">
                <em v-for="(v, k) in t.e" :key="k" :class="v > 0 ? 'up' : 'down'">
                  {{ PARAM_LABEL[k] }} {{ v > 0 ? '+' : '' }}{{ Math.round(v * 100) }}%
                </em>
              </span>
              <span class="eco-trait-desc">{{ t.desc }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 样本国家经济账 -->
    <section v-if="listed.length" class="eco-block">
      <h2>{{ listed[0].name }} · 年度经济账</h2>
      <div class="eco-kpi">
        <div><strong>{{ fmt(listed[0].gross) }}</strong><span>总产出（D）</span></div>
        <div><strong>{{ listed[0].perCapita }}</strong><span>人均产出（D/年）</span></div>
        <div><strong>{{ Math.round(listed[0].extractionRate * 100) }}%</strong><span>上层抽取率</span></div>
        <div><strong>{{ Math.round(listed[0].surplusRate * 100) }}%</strong><span>可支配剩余率</span></div>
        <div><strong>{{ listed[0].reserveMonths }} 月</strong><span>粮仓储备</span></div>
        <div><strong>{{ listed[0].radius }} km</strong><span>实物交换半径</span></div>
        <div><strong>{{ fmt(listed[0].levy) }}</strong><span>可动员人力</span></div>
        <div><strong>{{ listed[0].score }}</strong><span>经济体质（0-100）</span></div>
      </div>

      <div class="eco-bars">
        <h3>产出构成</h3>
        <div class="eco-stack">
          <span
            v-for="p in listed[0].parts"
            :key="p.label"
            :style="{ width: (p.value / listed[0].gross) * 100 + '%', background: p.color }"
            :title="`${p.label} ${fmt(p.value)} D`"
          ></span>
        </div>
        <ul class="eco-legend">
          <li v-for="p in listed[0].parts" :key="p.label">
            <i :style="{ background: p.color }"></i>{{ p.label }}<em>{{ fmt(p.value) }} D</em>
          </li>
        </ul>

        <h3>产出如何被分掉</h3>
        <div class="eco-stack">
          <span
            v-for="a in alloc"
            :key="a.label"
            :style="{ width: (a.value / listed[0].gross) * 100 + '%', background: a.color }"
            :title="`${a.label} ${fmt(a.value)} D`"
          ></span>
        </div>
        <ul class="eco-legend">
          <li v-for="a in alloc" :key="a.label">
            <i :style="{ background: a.color }"></i>{{ a.label }}<em>{{ fmt(a.value) }} D</em>
          </li>
        </ul>
      </div>
    </section>

    <!-- 全境对照 -->
    <section class="eco-block">
      <h2>全境经济对照</h2>
      <p class="eco-lead">
        按
        <button type="button" class="eco-sort" @click="sortKey = 'perCapitaSurplus'">人均剩余</button>
        /
        <button type="button" class="eco-sort" @click="sortKey = 'gross'">总产出</button>
        /
        <button type="button" class="eco-sort" @click="sortKey = 'score'">体质评分</button>
        排序。未登记天赋的国家只计基础盘，数值仅供参考。
      </p>
      <table class="eco-table">
        <thead>
          <tr>
            <th>国家</th>
            <th>人口</th>
            <th>地块面积</th>
            <th>总产出</th>
            <th>人均剩余</th>
            <th>储备</th>
            <th>交换半径</th>
            <th>评分</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in sorted" :key="r.name">
            <td class="eco-name">
              <a v-if="r.slug" :href="withBase(`/countries/${r.slug}.html`)">{{ r.name }}</a>
              <span v-else>{{ r.name }}</span>
              <em v-if="r.traitNames" class="eco-badge">天赋 {{ r.traitNames }} 项</em>
              <em v-else class="eco-badge muted">未录入</em>
            </td>
            <td class="num">{{ r.populationText }}</td>
            <td class="num">{{ r.area ?? '—' }}</td>
            <td class="num">
              <span class="eco-mini"><i :style="{ width: (r.gross / maxGross) * 100 + '%' }"></i></span>
              {{ fmt(r.gross) }}
            </td>
            <td class="num">
              <span class="eco-mini"><i :style="{ width: (Math.max(0, r.perCapitaSurplus) / maxSurplus) * 100 + '%' }"></i></span>
              {{ r.perCapitaSurplus }}
            </td>
            <td class="num">{{ r.reserveMonths }} 月</td>
            <td class="num">{{ r.radius }} km</td>
            <td class="num"><b v-if="r.score !== null" :class="r.score >= 70 ? 'good' : r.score >= 55 ? 'mid' : 'low'">{{ r.score }}</b><span v-else>—</span></td>
          </tr>
        </tbody>
      </table>
    </section>

    <details class="eco-method">
      <summary>计算方式（可复核）</summary>
      <pre>总产出 G = 人口 × 2000 D × (1 + 天赋产出修正 + 风土修正)
上层抽取 E = G × (18% + 抽取修正)
神庙与仪式 R = G × (6% + 仪式修正)
种子与损耗 K = G × 12%
可支配剩余 S = G − E − R − K
交换半径 = 35 + 9 × √城市数 × (0.6 + 交换效率 × 1.6)
储备（月）= 3.2 × (1 + 产出修正×1.4 − 抽取率 − 仪式率 + 0.2)
可动员人力 = 人口 × 2% × (1 + 动员修正)
经济体质 = 28×人均剩余 + 22×交换效率 + 20×储备 + 18×稳定 − 12×超额抽取 − 8×超额仪式 + 14（钳制在 1–100）</pre>
      <p>
        D 的口径固定：1 D = 一名成年人维持一天基本生活所需的商品与劳务。玉米 1 石 = 3.2 D 是整套折算的锚，
        其余商品按当地实际交换比挂靠。没有货币，所以「价格」实际是「劳役时间」的影子。
      </p>
    </details>
  </div>
</template>

<style scoped>
.eco {
  max-width: 100%;
}

.eco-block {
  margin-top: 36px;
}

.eco-block:first-child {
  margin-top: 8px;
}

.eco-block h2 {
  margin: 0 0 12px;
  padding-bottom: 7px;
  font-size: 21px;
  font-weight: 600;
  border-bottom: 1px solid var(--vp-c-divider);
}

.eco-lead {
  margin: 0 0 16px;
  font-size: 14.5px;
  line-height: 1.85;
  color: var(--vp-c-text-2);
}

/* 当量表 */
.eco-goods {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 12px;
}

.eco-good {
  padding: 12px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.eco-good-name {
  margin: 0 0 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.eco-good-bar {
  margin: 0 0 8px;
  height: 7px;
  border-radius: 4px;
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
  font-size: 13px;
  font-weight: 600;
  color: #b08a4f;
  font-variant-numeric: tabular-nums;
}

.eco-good-value em {
  display: block;
  margin-top: 3px;
  font-style: normal;
  font-weight: 400;
  font-size: 11.5px;
  color: var(--vp-c-text-3);
}

/* 天赋 */
.eco-trait-groups {
  display: grid;
  gap: 18px;
}

.eco-trait-group h3 {
  margin: 0 0 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-3);
  letter-spacing: 0.04em;
}

.eco-trait-group ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 6px;
}

.eco-trait-group li {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 4px 12px;
  padding: 9px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
  background: var(--vp-c-bg-soft);
  opacity: 0.55;
}

.eco-trait-group li.on {
  opacity: 1;
  border-color: color-mix(in srgb, #2f7d63 45%, var(--vp-c-divider));
  background: color-mix(in srgb, #2f7d63 6%, var(--vp-c-bg-soft));
}

.eco-trait-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.eco-trait-eff {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.eco-trait-eff em {
  font-style: normal;
  padding: 1px 6px;
  font-size: 11px;
  border-radius: 3px;
  font-variant-numeric: tabular-nums;
}

.eco-trait-eff .up {
  color: #1f6f4f;
  background: rgba(47, 125, 99, 0.12);
}

.eco-trait-eff .down {
  color: #9c4b4b;
  background: rgba(156, 75, 75, 0.12);
}

.eco-trait-desc {
  grid-column: 1 / -1;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

/* KPI */
.eco-kpi {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
  margin-bottom: 22px;
}

.eco-kpi > div {
  padding: 12px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.eco-kpi strong {
  display: block;
  font-size: 20px;
  line-height: 1.2;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}

.eco-kpi span {
  font-size: 11.5px;
  color: var(--vp-c-text-3);
}

/* 堆叠条 */
.eco-bars h3 {
  margin: 18px 0 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.eco-stack {
  display: flex;
  height: 26px;
  border-radius: 6px;
  overflow: hidden;
  background: var(--vp-c-default-soft);
}

.eco-stack span {
  display: block;
  height: 100%;
}

.eco-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 18px;
  margin: 8px 0 0;
  padding: 0;
  list-style: none;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.eco-legend i {
  display: inline-block;
  width: 9px;
  height: 9px;
  margin-right: 6px;
  border-radius: 2px;
}

.eco-legend em {
  margin-left: 4px;
  font-style: normal;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}

/* 表格 */
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
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.eco-table th {
  padding: 8px 10px;
  text-align: left;
  font-weight: 500;
  font-size: 12px;
  color: var(--vp-c-text-3);
  border-bottom: 1px solid var(--vp-c-divider);
  white-space: nowrap;
}

.eco-table td {
  padding: 9px 10px;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.eco-table .num {
  text-align: right;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.eco-name {
  min-width: 150px;
  color: var(--vp-c-text-1);
}

.eco-name a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.eco-badge {
  margin-left: 8px;
  padding: 1px 6px;
  font-style: normal;
  font-size: 10.5px;
  color: #1f6f4f;
  background: rgba(47, 125, 99, 0.12);
  border-radius: 3px;
}

.eco-badge.muted {
  color: var(--vp-c-text-3);
  background: var(--vp-c-default-soft);
}

.eco-mini {
  display: inline-block;
  width: 54px;
  height: 6px;
  margin-right: 6px;
  border-radius: 3px;
  background: var(--vp-c-default-soft);
  overflow: hidden;
  vertical-align: middle;
}

.eco-mini i {
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

/* 方法 */
.eco-method {
  margin-top: 28px;
  padding: 12px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.eco-method summary {
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.eco-method pre {
  margin: 12px 0;
  padding: 12px;
  font-size: 11.5px;
  line-height: 1.7;
  white-space: pre-wrap;
  background: var(--vp-c-bg);
  border-radius: 6px;
  color: var(--vp-c-text-2);
}

.eco-method p {
  margin: 0;
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}

@media (max-width: 800px) {
  .eco-trait-group li {
    grid-template-columns: minmax(0, 1fr);
  }
}

.eco-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin: 8px 0 4px;
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

.eco-edit {
  margin: 12px 0 22px;
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

</style>
