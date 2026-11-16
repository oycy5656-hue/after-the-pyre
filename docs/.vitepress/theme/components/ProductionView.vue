<script setup>
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import countries from '../../data/countries.mjs'
import { CLIMATES, RESOURCES, RESOURCE_GROUPS, SEASON_HINT, SEASON_LABEL, deriveSpecialties } from '../../data/resources.mjs'
import { BUILDINGS, BUILDING_GROUPS } from '../../data/buildings.mjs'
import { metalTechOf } from '../../data/country-metal.mjs'
import { geoOf } from '../../data/geography.mjs'
import { simulate } from '../../data/sim.mjs'

const selected = ref(countries[0].name)
const climate = ref('全部')
const season = ref('全部')

const climateOptions = computed(() => ['全部', ...Object.keys(CLIMATES)])
const seasonOptions = ['全部', 'spring', 'summer', 'autumn', 'winter', 'year']

const filtered = computed(() =>
  RESOURCES.filter((r) => {
    if (climate.value !== '全部' && r.climate !== climate.value) return false
    if (season.value !== '全部' && r.season !== season.value) return false
    return true
  })
)

const grouped = computed(() => {
  const m = new Map()
  for (const r of filtered.value) {
    if (!m.has(r.group)) m.set(r.group, [])
    m.get(r.group).push(r)
  }
  return [...m.entries()]
})

const buildingGroups = computed(() => {
  const m = new Map()
  for (const b of BUILDINGS) {
    if (!m.has(b.group)) m.set(b.group, [])
    m.get(b.group).push(b)
  }
  return [...m.entries()]
})

const specialties = computed(() =>
  countries.map((c) => {
    const geo = geoOf(c.name)
    const tech = metalTechOf(c.name)
    const specs = deriveSpecialties(geo, { tech })
    return { name: c.name, tech, items: specs }
  })
)

const currentSim = computed(() => {
  const c = countries.find((x) => x.name === selected.value)
  if (!c) return null
  const geo = geoOf(c.name)
  const tech = metalTechOf(c.name)
  const specs = deriveSpecialties(geo, { tech })
  const pop = (() => {
    const m = /^([\d.]+)\s*([KM]?)$/i.exec(String(c.population || '10K').trim())
    return m ? Number(m[1]) * (m[2].toUpperCase() === 'K' ? 1e3 : m[2].toUpperCase() === 'M' ? 1e6 : 1) : 20000
  })()
  return simulate({ specs, population: pop, race: c.race, geo, area: 200, system: c.politics?.system })
})

const activeRows = computed(() => (currentSim.value?.buildings || []).filter((b) => b.level > 0))

const RES_NAME = new Map(RESOURCES.map((r) => [r.id, r.name]))
const resName = (id) => (id ? RES_NAME.get(id) || id : '服务')

const fmt = (n) => (n >= 1e4 ? (n / 1e4).toFixed(1) + ' 万' : String(n))
</script>

<template>
  <div class="pv">
    <section class="pv-block">
      <h2>物产与当量</h2>
      <p class="pv-lead">
        这片大陆没有铸币，也没有信用票据。全域以 D（当量）记账——一名成年人维持一天基本生活所需的商品与劳务。
        下列 {{ RESOURCES.length }} 种物产各有定价，商品与劳役先折算成 D，再进入统计。
      </p>
      <p class="pv-rate">
        <span>普通劳役 1 D/人·日</span>
        <span>工匠劳役 2.4 D/人·日</span>
        <span>祭司劳役 3 D/人·日</span>
      </p>

      <div class="pv-filter">
        <div class="pv-row">
          <span class="pv-label">气候</span>
          <button
            v-for="c in climateOptions"
            :key="c"
            type="button"
            class="pv-chip"
            :class="{ on: climate === c }"
            @click="climate = c"
          >
            <i v-if="c !== '全部'" :style="{ background: CLIMATES[c] }" />
            {{ c }}
          </button>
        </div>
        <div class="pv-row">
          <span class="pv-label">季节</span>
          <button
            v-for="k in seasonOptions"
            :key="k"
            type="button"
            class="pv-chip"
            :class="{ on: season === k }"
            @click="season = k"
          >
            {{ k === '全部' ? '全部' : SEASON_LABEL[k] }}
          </button>
          <span class="pv-count">{{ filtered.length }} / {{ RESOURCES.length }} 种</span>
        </div>
      </div>

      <div class="pv-groups">
        <div v-for="[group, items] in grouped" :key="group" class="pv-group">
          <h4><i :style="{ background: RESOURCE_GROUPS[group] }"></i>{{ group }}<em>{{ items.length }}</em></h4>
          <div class="pv-chips">
            <span v-for="r in items" :key="r.id" class="pv-chip-item" :title="r.climate + ' · ' + SEASON_HINT[r.season]">
              <b>{{ r.icon }}</b>{{ r.name }}<em>{{ SEASON_LABEL[r.season] }}</em><strong>{{ r.value }}</strong>
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="pv-block">
      <h2>生产建筑</h2>
      <p class="pv-lead">
        住宅以外的生产设施。每级占一格、吃一份劳力；带投入的建筑若原料不足会直接停工，而不是硬撑。
        需要金属的建筑只有在对应金属科技下才能建造。
      </p>

      <div v-for="[group, items] in buildingGroups" :key="group" class="pv-bgroup">
        <h3><i :style="{ background: BUILDING_GROUPS[group] }"></i>{{ group }}<em>{{ items.length }}</em></h3>
        <div class="pv-bcards">
          <div v-for="b in items" :key="b.id" class="pv-bcard">
            <p class="pv-bname">
              <i :style="{ background: BUILDING_GROUPS[b.group] }"></i>{{ b.name }}
              <em v-if="b.race">{{ b.race }}</em>
            </p>
            <p class="pv-bmeta">{{ b.labor }} 人/级 · {{ b.slots }} 格</p>
            <p class="pv-bnote">{{ b.note }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="pv-block">
      <h2>各国建筑运行</h2>
      <p class="pv-lead">选择国家查看当前开工的建筑、原料与效率；未开工的建筑不列入。</p>
      <div class="pv-select">
        <select v-model="selected">
          <option v-for="c in countries" :key="c.name" :value="c.name">{{ c.name }}</option>
        </select>
        <span class="pv-count">{{ activeRows.length }} 座开工</span>
      </div>
      <table class="pv-table">
        <thead>
          <tr><th>建筑</th><th>产出</th><th>等级</th><th>用工</th><th>效率</th><th>产值</th></tr>
        </thead>
        <tbody>
          <tr v-for="b in activeRows" :key="b.id">
            <td>{{ b.name }}</td>
            <td>{{ resName(b.outRes) }}<em v-if="b.inRes" class="pv-in"> ← {{ resName(b.inRes) }}</em></td>
            <td>{{ b.level }}</td>
            <td>{{ fmt((b.labor || 0) * b.level) }}</td>
            <td>{{ b.input ? Math.round((b.eff || 0) * 100) + '%' : '—' }}</td>
            <td>{{ b.value ? (b.value / 1e6).toFixed(1) + 'M' : '—' }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="pv-block">
      <h2>各国物产</h2>
      <p class="pv-lead">
        按地形与气候推导：湿地多稻米与淡水鱼，针叶林带出木材与树脂，高海拔出金属矿与玉石，
        热带雨林出香料、硬木与羽毛。金属矿只出现在拥有对应科技的政权。
      </p>
      <table class="pv-table">
        <thead>
          <tr><th>国家</th><th>金属科技</th><th>物产</th></tr>
        </thead>
        <tbody>
          <tr v-for="row in specialties" :key="row.name">
            <td>{{ row.name }}</td>
            <td>{{ row.tech === 'iron' ? '铁器' : row.tech === 'bronze' ? '青铜' : '石器' }}</td>
            <td class="pv-spec">
              <span v-for="sp in row.items" :key="sp.id">{{ sp.icon }} {{ sp.name }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
.pv {
  max-width: 1120px;
  margin: 0 auto;
}

.pv-block {
  margin-bottom: 48px;
}

.pv-block h2 {
  margin: 0 0 10px;
}

.pv-lead {
  margin: 0 0 12px;
  font-size: 13px;
  line-height: 1.9;
  color: var(--vp-c-text-3);
}

.pv-rate {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0 0 16px;
}

.pv-rate span {
  padding: 3px 10px;
  font-size: 11.5px;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
}

.pv-filter {
  display: grid;
  gap: 8px;
  margin: 0 0 18px;
  padding: 12px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.pv-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.pv-label {
  margin-right: 4px;
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--vp-c-text-3);
}

.pv-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  font-size: 11.5px;
  color: var(--vp-c-text-2);
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  cursor: pointer;
}

.pv-chip i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.pv-chip.on {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent);
}

.pv-count {
  margin-left: auto;
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.pv-groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 14px;
}

.pv-group {
  padding: 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.pv-group h4 {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 0 10px;
  font-size: 12.5px;
  color: var(--vp-c-text-2);
}

.pv-group h4 i,
.pv-bgroup h3 i {
  width: 3px;
  height: 13px;
  border-radius: 2px;
}

.pv-group h4 em,
.pv-bgroup h3 em {
  margin-left: auto;
  font-style: normal;
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.pv-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.pv-chip-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  font-size: 11.5px;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.pv-chip-item b {
  font-size: 12px;
}

.pv-chip-item em {
  font-style: normal;
  font-size: 10px;
  color: var(--vp-c-text-3);
}

.pv-chip-item strong {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.pv-bgroup {
  margin-bottom: 20px;
}

.pv-bgroup h3 {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 0 10px;
  font-size: 13.5px;
  color: var(--vp-c-text-2);
}

.pv-bcards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 10px;
}

.pv-bcard {
  padding: 13px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 11px;
  background: var(--vp-c-bg-soft);
}

.pv-bname {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.pv-bname i {
  width: 3px;
  height: 12px;
  border-radius: 2px;
}

.pv-bname em {
  padding: 1px 6px;
  font-style: normal;
  font-size: 10px;
  font-weight: 400;
  color: #8a6a1f;
  background: rgba(192, 138, 46, 0.16);
  border-radius: 4px;
}

.pv-bmeta {
  margin: 0 0 4px;
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.pv-bnote {
  margin: 0;
  font-size: 11.5px;
  line-height: 1.7;
  color: var(--vp-c-text-3);
}

.pv-select {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 12px;
}

.pv-select select {
  padding: 7px 12px;
  font: inherit;
  font-size: 13px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.pv-in {
  font-style: normal;
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.pv-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12.5px;
}

.pv-table th {
  padding: 8px 10px;
  font-size: 11.5px;
  text-align: left;
  color: var(--vp-c-text-3);
  border-bottom: 1px solid var(--vp-c-divider);
}

.pv-table td {
  padding: 8px 10px;
  vertical-align: top;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.pv-spec {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.pv-spec span {
  padding: 1px 7px;
  font-size: 11px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
}
</style>
