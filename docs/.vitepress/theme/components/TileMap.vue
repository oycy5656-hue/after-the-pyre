<script setup>
import { computed, ref } from 'vue'
import map from '../../data/map.mjs'
import countries from '../../data/countries.mjs'
import { CELLS, CELL_VIEW } from '../../data/cells.mjs'
import { RESOURCES, deriveSpecialties } from '../../data/resources.mjs'
import { geoOf } from '../../data/geography.mjs'
import { metalTechOf } from '../../data/country-metal.mjs'
import { BUILDINGS } from '../../data/buildings.mjs'

const zoom = ref(1)
const offset = ref({ x: 0, y: 0 })
const dragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const selectedId = ref(null)
const hoverId = ref(null)

const RES_NAME = new Map(RESOURCES.map((r) => [r.id, r.name]))
const stateById = new Map(map.states.map((s) => [s.i, s]))
const countryByState = new Map()
for (const [id, st] of stateById) {
  const c = countries.find((x) => x.name === st.name) || countries.find((x) => st.name.includes(x.name) || x.name.includes(st.name))
  if (c) countryByState.set(id, c)
}

const popOf = (c) => {
  const m = /^([\d.]+)\s*([KM]?)$/i.exec(String(c?.population || '10K').trim())
  return m ? Number(m[1]) * (m[2].toUpperCase() === 'K' ? 1e3 : m[2].toUpperCase() === 'M' ? 1e6 : 1) : 20000
}

const BIOME_WEIGHT = {
  热带雨林: 0.6,
  热带季雨林: 0.8,
  热带草原: 0.9,
  热带沙漠: 0.15,
  亚热带常绿阔叶林带: 1.2,
  温带落叶阔叶林: 1.3,
  草原: 1.1,
  寒漠: 0.15,
  苔原: 0.2,
  亚寒带针叶林: 0.7,
  湿地: 0.9,
  高山: 0.3,
  冰川: 0.05
}

const BIOME_RES = {
  热带雨林: ['hardwood', 'spice', 'pepper', 'herb', 'feather'],
  热带季雨林: ['rice', 'dye', 'spice', 'bamboo', 'hardwood'],
  热带草原: ['cattle', 'goat', 'millet', 'cotton'],
  热带沙漠: ['date', 'natron', 'sulphur', 'salt', 'camel'],
  亚热带常绿阔叶林带: ['olive', 'grape', 'fig', 'cork', 'bay', 'timber'],
  温带落叶阔叶林: ['wheat', 'barley', 'apple', 'timber', 'flax', 'honey'],
  草原: ['wheat', 'barley', 'sheep', 'horse', 'wool'],
  寒漠: ['fur', 'peat', 'stone'],
  苔原: ['fur', 'peat', 'rye'],
  亚寒带针叶林: ['timber', 'birch', 'resin', 'rye', 'salmon'],
  湿地: ['rice', 'clay', 'riverfish', 'herb'],
  高山: ['stone', 'iron', 'copper', 'jade', 'obsidian'],
  冰川: ['stone']
}

const weightOfState = computed(() => {
  const w = new Map()
  for (const c of CELLS) w.set(c[2], (w.get(c[2]) || 0) + (BIOME_WEIGHT[c[3]] || 0.5))
  return w
})

const statePopulation = computed(() => {
  const m = new Map()
  for (const [sid, c] of countryByState) m.set(sid, popOf(c))
  return m
})

const cells = computed(() =>
  CELLS.map(([x, y, sid, biome], idx) => {
    const state = stateById.get(sid)
    const country = countryByState.get(sid)
    const totalW = weightOfState.value.get(sid) || 1
    const myW = BIOME_WEIGHT[biome] || 0.5
    const pop = country ? Math.round(((statePopulation.value.get(sid) || 0) * myW) / totalW) : 0
    return { idx, x, y, sid, biome, stateName: state?.name || '无主之地', color: state?.color || '#3c9a7a', country, pop }
  })
)

const selected = computed(() => (selectedId.value == null ? null : cells.value[selectedId.value]))

const detail = computed(() => {
  const c = selected.value
  if (!c) return null
  const ids = BIOME_RES[c.biome] || []
  const resIds = new Set(
    c.country ? deriveSpecialties(geoOf(c.country.name), { tech: metalTechOf(c.country.name) }).map((r) => r.id) : []
  )
  const candidates = ids.filter((id) => RES_NAME.has(id)).map((id) => ({ id, name: RES_NAME.get(id) }))
  const local = candidates.filter((r) => resIds.has(r.id))
  const use = local.length ? local : candidates
  const buildings = BUILDINGS.filter((b) => b.outputs && b.outputs.some((o) => use.some((u) => u.id === o)))
  return { ...c, resources: use, buildings: buildings.slice(0, 4) }
})

const onWheel = (e) => {
  e.preventDefault()
  const factor = e.deltaY < 0 ? 1.18 : 1 / 1.18
  zoom.value = Math.min(6, Math.max(1, zoom.value * factor))
}

const onDown = (e) => {
  dragging.value = true
  dragStart.value = { x: e.clientX - offset.value.x, y: e.clientY - offset.value.y }
}
const onMove = (e) => {
  if (!dragging.value) return
  offset.value = { x: e.clientX - dragStart.value.x, y: e.clientY - dragStart.value.y }
}
const onUp = () => {
  dragging.value = false
}

const zoomIn = () => { zoom.value = Math.min(6, zoom.value * 1.25) }
const zoomOut = () => { zoom.value = Math.max(1, zoom.value / 1.25) }
const reset = () => {
  zoom.value = 1
  offset.value = { x: 0, y: 0 }
}

const bounds = (() => {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const c of CELLS) {
    minX = Math.min(minX, c[0])
    maxX = Math.max(maxX, c[0])
    minY = Math.min(minY, c[1])
    maxY = Math.max(maxY, c[1])
  }
  const pad = 24
  return { x: minX - pad, y: minY - pad, w: maxX - minX + pad * 2, h: maxY - minY + pad * 2 }
})()

const cellSize = 15
</script>

<template>
  <div class="tm">
    <div class="tm-stage">
      <div class="tm-tools">
        <button type="button" @click="zoomOut">−</button>
        <span>{{ zoom.toFixed(2) }}×</span>
        <button type="button" @click="zoomIn">+</button>
        <button type="button" class="tm-reset" @click="reset">复位</button>
      </div>

      <svg
        class="tm-svg"
        :viewBox="`${bounds.x} ${bounds.y} ${bounds.w} ${bounds.h}`"
        preserveAspectRatio="xMidYMid meet"
        @wheel="onWheel"
        @mousedown="onDown"
        @mousemove="onMove"
        @mouseup="onUp"
        @mouseleave="onUp"
      >
        <g :transform="`translate(${offset.x / zoom} ${offset.y / zoom}) scale(${1 / zoom})`">
          <rect
            v-for="c in cells"
            :key="c.idx"
            :x="c.x - cellSize / 2"
            :y="c.y - cellSize / 2"
            :width="cellSize"
            :height="cellSize"
            :fill="c.color"
            :fill-opacity="selectedId === c.idx ? 0.95 : hoverId === c.idx ? 0.75 : 0.45"
            class="tm-cell"
            @mouseenter="hoverId = c.idx"
            @mouseleave="hoverId = null"
            @click="selectedId = c.idx"
          />
        </g>
      </svg>
    </div>

    <aside class="tm-side">
      <template v-if="!detail">
        <p class="tm-hint">滚轮缩放、拖动平移；点击任意地块查看人口、原料与建筑。</p>
        <p class="tm-total">共 {{ cells.length }} 个地块 · {{ stateById.size }} 个政权</p>
      </template>
      <template v-else>
        <h3>{{ detail.stateName }}</h3>
        <p class="tm-sub">{{ detail.biome }} · 人口约 {{ detail.pop.toLocaleString() }}</p>

        <p class="tm-label">本地原料</p>
        <ul class="tm-chips">
          <li v-for="r in detail.resources" :key="r.id">{{ r.name }}</li>
        </ul>

        <p class="tm-label">可用建筑</p>
        <ul class="tm-list">
          <li v-for="b in detail.buildings" :key="b.id">
            <span>{{ b.name }}</span>
            <em>{{ b.labor }} 人/级</em>
          </li>
        </ul>
        <p v-if="!detail.buildings.length" class="tm-hint">此地只有采集，没有加工设施。</p>
      </template>
    </aside>
  </div>
</template>

<style scoped>
.tm {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 16px;
  max-width: 1500px;
  margin: 0 auto;
  align-items: start;
}

.tm-stage {
  position: relative;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: #060908;
  overflow: hidden;
}

.tm-svg {
  display: block;
  width: 100%;
  min-height: 560px;
  cursor: grab;
  user-select: none;
}

.tm-svg:active {
  cursor: grabbing;
}

.tm-cell {
  cursor: pointer;
}

.tm-tools {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 8px;
  font-size: 11.5px;
  color: var(--vp-c-text-2);
  background: rgba(6, 9, 8, 0.72);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
}

.tm-tools button {
  width: 22px;
  height: 22px;
  font-size: 13px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 50%;
  cursor: pointer;
}

.tm-reset {
  width: auto !important;
  padding: 0 8px;
  border-radius: 999px !important;
}

.tm-side {
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
}

.tm-side h3 {
  margin: 0 0 2px;
  font-size: 16px;
}

.tm-sub,
.tm-hint,
.tm-total {
  margin: 0 0 10px;
  font-size: 11.5px;
  color: var(--vp-c-text-3);
}

.tm-label {
  margin: 12px 0 6px;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-3);
}

.tm-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tm-chips li {
  padding: 2px 8px;
  font-size: 11px;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
}

.tm-list {
  display: grid;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tm-list li {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 9px;
  font-size: 11.5px;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
  background: var(--vp-c-bg);
}

.tm-list em {
  font-style: normal;
  color: var(--vp-c-text-3);
}

@media (max-width: 900px) {
  .tm {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
