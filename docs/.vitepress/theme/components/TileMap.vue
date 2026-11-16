<script setup>
import { computed, ref } from 'vue'
import map from '../../data/map.mjs'
import countries from '../../data/countries.mjs'
import { RESOURCES, deriveSpecialties } from '../../data/resources.mjs'
import { geoOf } from '../../data/geography.mjs'
import { metalTechOf } from '../../data/country-metal.mjs'
import { BUILDINGS } from '../../data/buildings.mjs'
import { simulate } from '../../data/sim.mjs'

const selectedState = ref(null)
const selectedTile = ref(null)

const RES_NAME = new Map(RESOURCES.map((r) => [r.id, r.name]))
const BUILD_NAME = new Map(BUILDINGS.map((b) => [b.id, b.name]))

/** 州 → 国家档案 */
const stateNameToCountry = computed(() => {
  const m = new Map()
  for (const c of countries) m.set(c.name, c)
  return m
})

const countryOfState = (state) => {
  if (!state) return null
  const direct = stateNameToCountry.value.get(state.name)
  if (direct) return direct
  for (const [name, c] of stateNameToCountry.value) {
    if (state.name.includes(name) || name.includes(state.name)) return c
  }
  return null
}

/** 每个城邑 → 地块 */
const statePath = (id) => map.stateShapes?.[id]?.d || ''

const bboxCache = new Map()
const bboxOf = (id) => {
  if (bboxCache.has(id)) return bboxCache.get(id)
  const d = statePath(id)
  const nums = (d.match(/-?\d+(\.\d+)?/g) || []).map(Number)
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (let i = 0; i + 1 < nums.length; i += 2) {
    minX = Math.min(minX, nums[i])
    maxX = Math.max(maxX, nums[i])
    minY = Math.min(minY, nums[i + 1])
    maxY = Math.max(maxY, nums[i + 1])
  }
  const box = Number.isFinite(minX) ? { minX, minY, maxX, maxY } : null
  bboxCache.set(id, box)
  return box
}

const tilesOfState = computed(() => {
  const state = map.states.find((x) => x.i === selectedState.value)
  if (!state) return []
  const country = countryOfState(state)
  const geo = country ? geoOf(country.name) : null
  const tech = country ? metalTechOf(country.name) : 'stone'
  const specs = country ? deriveSpecialties(geo, { tech }) : []
  const biomeList = geo && geo.biomes && geo.biomes.length ? geo.biomes : [['温带落叶阔叶林', 1]]

  const burgs = (map.burgs || []).filter((b) => b.state === state.i)
  const box = bboxOf(state.i)
  const want = Math.max(3, Math.min(9, Math.round((state.area || 60) / 28)))
  const extra = []
  if (box && burgs.length < want) {
    const cx = (box.minX + box.maxX) / 2
    const cy = (box.minY + box.maxY) / 2
    const rx = Math.max(8, (box.maxX - box.minX) * 0.3)
    const ry = Math.max(8, (box.maxY - box.minY) * 0.3)
    const need = want - burgs.length
    for (let k = 0; k < need; k++) {
      const ang = (Math.PI * 2 * k) / need + (state.i % 7) * 0.4
      extra.push({
        i: 900000 + state.i * 100 + k,
        name: (state.name || '无名') + ' 聚落 ' + (k + 1),
        x: cx + Math.cos(ang) * rx * (0.55 + (k % 3) * 0.15),
        y: cy + Math.sin(ang) * ry * (0.55 + (k % 2) * 0.2),
        state: state.i,
        capital: false,
        port: false,
        population: 0
      })
    }
  }

  const allTiles = [...burgs, ...extra]
  const buildPool = BUILDINGS.filter((b) => !b.race || b.race === country?.race)

  return allTiles.map((burg, idx) => {
    const resources = []
    for (let k = 0; k < 2; k++) {
      const sp = specs[(idx * 2 + k) % Math.max(1, specs.length)]
      if (sp && !resources.some((r) => r.id === sp.id)) resources.push(sp)
    }

    const buildings = []
    for (let k = 0; k < 3; k++) {
      const b = buildPool[(idx * 3 + k + state.i) % Math.max(1, buildPool.length)]
      if (b && !buildings.some((x) => x.id === b.id)) {
        buildings.push({ id: b.id, name: b.name, level: 1 + ((idx + k) % 5), out: b.outputs ? b.outputs[0] : null })
      }
    }

    const biome = biomeList[(idx + (burg.i % 5)) % biomeList.length]
    return {
      id: burg.i,
      name: burg.name,
      burg,
      capital: !!burg.capital,
      port: !!burg.port,
      population: burg.population,
      terrain: biome ? biome[0] : '平原',
      resources,
      buildings
    }
  })
})

const states = computed(() => map.states)

const scale = computed(() => ({ w: map.width, h: map.height }))

const selectStateById = (id) => {
  selectedState.value = id
  selectedTile.value = null
}

const fillOf = (id) => {
  const s = map.states.find((x) => x.i === id)
  const base = s?.color || '#3c9a7a'
  return id === selectedState.value ? 'rgba(201,162,74,0.42)' : base + '55'
}

const burgsOfSelected = computed(() => tilesOfState.value)

const pickTile = (t) => {
  selectedTile.value = t
}
</script>

<template>
  <div class="tm">
    <div class="tm-map">
      <svg :viewBox="`0 0 ${scale.w} ${scale.h}`" preserveAspectRatio="xMidYMid meet">
        <g>
          <path
            v-for="s in states"
            :key="s.i"
            :d="statePath(s.i)"
            :data-name="s.name"
            :fill="fillOf(s.i)"
            stroke="rgba(238,243,240,0.22)"
            stroke-width="1"
            class="tm-state"
            @click="selectStateById(s.i)"
          />
        </g>
        <g v-for="t in burgsOfSelected" :key="t.id">
          <circle
            :cx="t.burg.x"
            :cy="t.burg.y"
            :r="t.capital ? 7 : 4.5"
            :fill="selectedTile?.id === t.id ? '#f3d9a4' : t.capital ? '#d8b878' : '#8fd6bb'"
            stroke="rgba(6,9,8,0.75)"
            stroke-width="1.5"
            class="tm-burg"
            @click="pickTile(t)"
          />
          <text
            v-if="t.capital"
            :x="t.burg.x + 10"
            :y="t.burg.y + 4"
            class="tm-label"
          >{{ t.name }}</text>
        </g>
      </svg>
    </div>

    <aside class="tm-side">
      <template v-if="!selectedState">
        <p class="tm-hint">点击地图上的国家，查看它的地块与建筑。</p>
      </template>

      <template v-else>
        <h3>{{ map.states.find((s) => s.i === selectedState)?.name }}</h3>
        <p class="tm-sub">
          {{ countryOfState(map.states.find((s) => s.i === selectedState))?.race || '未知种族' }}
          · {{ burgsOfSelected.length }} 个地块
        </p>

        <div class="tm-tiles">
          <button
            v-for="t in burgsOfSelected"
            :key="t.id"
            type="button"
            class="tm-tile"
            :class="{ on: selectedTile?.id === t.id }"
            @click="pickTile(t)"
          >
            <span class="tm-tile-name">{{ t.name }}<em v-if="t.capital">都城</em><em v-else-if="t.port">港</em></span>
            <span class="tm-tile-sub">{{ t.terrain }} · {{ t.buildings.length }} 座建筑</span>
          </button>
        </div>

        <template v-if="selectedTile">
          <div class="tm-detail">
            <h4>{{ selectedTile.name }}</h4>
            <p class="tm-detail-meta">
              {{ selectedTile.terrain }}
              <span v-if="selectedTile.population">· 人口 {{ selectedTile.population.toLocaleString() }}</span>
            </p>

            <p class="tm-detail-title">本地原料</p>
            <ul class="tm-chips">
              <li v-for="r in selectedTile.resources" :key="r.id">{{ r.icon }} {{ r.name }}</li>
            </ul>

            <p class="tm-detail-title">地块建筑</p>
            <ul class="tm-list">
              <li v-for="b in selectedTile.buildings" :key="b.id">
                <span>{{ b.name }}</span>
                <em>{{ b.here }} 级<span v-if="b.out"> · {{ RES_NAME.get(b.out) || b.out }}</span></em>
              </li>
            </ul>
          </div>
        </template>
        <p v-else class="tm-hint">点一个地块查看原料与建筑。</p>
      </template>
    </aside>
  </div>
</template>

<style scoped>
.tm {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 18px;
  max-width: 1400px;
  margin: 0 auto;
  align-items: start;
}

.tm-map {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: radial-gradient(120% 100% at 50% 30%, #0a1210, #060908);
  overflow: hidden;
}

.tm-map svg {
  display: block;
  width: 100%;
  height: auto;
  min-height: 480px;
}

.tm-state {
  cursor: pointer;
  transition: fill 0.18s ease;
}

.tm-state:hover {
  fill: rgba(216, 184, 120, 0.3);
}

.tm-burg {
  cursor: pointer;
}

.tm-label {
  font-size: 11px;
  fill: rgba(238, 243, 240, 0.8);
  pointer-events: none;
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

.tm-sub {
  margin: 0 0 12px;
  font-size: 11.5px;
  color: var(--vp-c-text-3);
}

.tm-hint {
  margin: 0;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.tm-tiles {
  display: grid;
  gap: 4px;
  max-height: 300px;
  overflow: auto;
  margin-bottom: 12px;
}

.tm-tile {
  display: grid;
  gap: 2px;
  padding: 7px 10px;
  text-align: left;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
}

.tm-tile.on {
  border-color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
}

.tm-tile-name {
  font-size: 12.5px;
  color: var(--vp-c-text-1);
}

.tm-tile-name em {
  margin-left: 6px;
  padding: 0 5px;
  font-style: normal;
  font-size: 10px;
  color: #8a6a1f;
  background: rgba(192, 138, 46, 0.16);
  border-radius: 3px;
}

.tm-tile-sub {
  font-size: 10.5px;
  color: var(--vp-c-text-3);
}

.tm-detail {
  padding-top: 10px;
  border-top: 1px solid var(--vp-c-divider);
}

.tm-detail h4 {
  margin: 0 0 2px;
  font-size: 14px;
}

.tm-detail-meta {
  margin: 0 0 10px;
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.tm-detail-title {
  margin: 10px 0 6px;
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
