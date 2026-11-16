<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter, withBase } from 'vitepress'
import mapData from '../../data/map.mjs'
import countries from '../../data/countries.mjs'

const router = useRouter()

const wrapEl = ref(null)
const stageEl = ref(null)
const overlayEl = ref(null)
const loading = ref(true)
const errorMsg = ref('')
const showBurgs = ref(true)
const showPanel = ref(true)
const zoom = ref(1)
const flipped = ref(false)
const offset = ref({ x: 0, y: 0 })
const activeState = ref(null)
const view = ref('terrain')
const tooltip = ref({ visible: false, x: 0, y: 0, title: '', lines: [], slug: null })

const VIEWS = [
  { key: 'terrain', label: '地形', file: 'terrain.png' },
  { key: 'states', label: '势力', file: 'states.png' },
  { key: 'cultures', label: '文化', file: 'cultures.png' }
]

const viewImage = computed(() => {
  const v = VIEWS.find((x) => x.key === view.value) || VIEWS[0]
  return withBase(`/map/${v.file}`)
})

const stateByIndex = new Map(mapData.states.map((s) => [s.i, s]))
const burgById = new Map(mapData.burgs.map((b) => [b.i, b]))
const countryBySlug = new Map(countries.map((c) => [c.slug, c]))
const burgDots = []
const labelItems = []

const states = computed(() => [...mapData.states].sort((a, b) => b.area - a.area))

const stats = computed(() => ({
  states: mapData.states.length,
  burgs: mapData.burgs.length,
  linked: mapData.states.filter((s) => s.slug).length
}))

const stageStyle = computed(() => ({
  transform: `scale(${zoom.value}) scaleY(${flipped.value ? -1 : 1}) translate(${offset.value.x}px, ${offset.value.y}px)`
}))

function resetView() {
  zoom.value = 1
  offset.value = { x: 0, y: 0 }
}

function zoomBy(factor, originEvent) {
  const rect = wrapEl.value?.getBoundingClientRect()
  if (!rect) return
  const cx = originEvent ? originEvent.clientX - rect.left : rect.width / 2
  const cy = originEvent ? originEvent.clientY - rect.top : rect.height / 2
  const next = Math.min(8, Math.max(0.6, zoom.value * factor))
  const ratio = next / zoom.value
  offset.value = { x: cx - (cx - offset.value.x) * ratio, y: cy - (cy - offset.value.y) * ratio }
  zoom.value = next
}

function onWheel(event) {
  event.preventDefault()
  zoomBy(event.deltaY < 0 ? 1.15 : 1 / 1.15, event)
}

let dragging = false
let moved = false
let start = { x: 0, y: 0 }
let originOffset = { x: 0, y: 0 }
const DRAG_THRESHOLD = 6

function onPointerDown(event) {
  if (event.button !== 0) return
  dragging = true
  moved = false
  start = { x: event.clientX, y: event.clientY }
  originOffset = { ...offset.value }
  event.preventDefault()
}

function onPointerMove(event) {
  if (!dragging) return
  const dx = event.clientX - start.x
  const dy = event.clientY - start.y
  // 以「按下点」为基准判断是否算拖动，避免一点点抖动被当成点击
  if (!moved && Math.abs(dx) + Math.abs(dy) > DRAG_THRESHOLD) moved = true
  if (!moved) return
  offset.value = { x: originOffset.x + dx, y: originOffset.y + dy }
}

function onPointerUp(event) {
  const wasDragging = dragging
  const wasMoved = moved
  dragging = false
  moved = false
  if (!wasDragging || wasMoved) return
  const el = document.elementFromPoint(event.clientX, event.clientY)
  handleClickAt(el)
}

function handleClickAt(el) {
  const burgIdx = burgIndexFrom(el)
  if (burgIdx) {
    const burg = burgById.get(burgIdx)
    const state = burg && stateByIndex.get(burg.state)
    if (state?.slug) return go(state.slug)
  }
  const idx = stateIndexFrom(el)
  if (idx) {
    const state = stateByIndex.get(idx)
    if (state?.slug) return go(state.slug)
  }
}

function stateIndexFrom(target) {
  const el = target?.closest?.('[data-state-index]')
  if (!el) return null
  return Number(el.getAttribute('data-state-index'))
}

function burgIndexFrom(target) {
  const el = target?.closest?.('[data-burg]')
  return el ? Number(el.getAttribute('data-burg')) : null
}

function go(slug) {
  router.go(withBase(`/countries/${slug}`))
}

function showStateTooltip(event, state) {
  const country = state.slug ? countryBySlug.get(state.slug) : null
  const lines = []
  if (state.capital) lines.push(`首都 · ${state.capital.name}`)
  if (country) {
    lines.push(`${country.race} · ${country.politics.system}`)
    lines.push(`${country.politics.leader.title} ${country.politics.leader.name}`)
    lines.push(`${country.politics.factions.length} 个派系 · ${country.military.units.length} 支军团`)
  } else {
    lines.push(`城市 ${state.burgCount} 座`)
  }
  tooltip.value = { visible: true, x: event.clientX, y: event.clientY, title: state.name, lines, slug: state.slug }
}

function showBurgTooltip(event, burg) {
  const state = stateByIndex.get(burg.state)
  const lines = [`人口 ${Math.round(burg.population * 1000).toLocaleString()}`]
  if (state) lines.push(state.name)
  if (burg.capital) lines.unshift('首府')
  tooltip.value = { visible: true, x: event.clientX, y: event.clientY, title: burg.name, lines, slug: state?.slug || null }
}

function onStageMove(event) {
  if (dragging) {
    tooltip.value.visible = false
    return
  }
  const burgIdx = burgIndexFrom(event.target)
  if (burgIdx) {
    const burg = burgById.get(burgIdx)
    if (burg) return showBurgTooltip(event, burg)
  }
  const idx = stateIndexFrom(event.target)
  if (idx) {
    const state = stateByIndex.get(idx)
    if (state) return showStateTooltip(event, state)
  }
  tooltip.value.visible = false
  activeState.value = null
}

function onStageLeave() {
  tooltip.value.visible = false
  activeState.value = null
}

function focusState(state) {
  activeState.value = state
}

function layoutLabels() {
  const stage = stageEl.value
  if (!stage || !labelItems.length) return
  const width = stage.clientWidth || 1
  const pxPerUnit = (width * zoom.value) / mapData.width
  const fontUnits = 11 / pxPerUnit
  const strokeUnits = 2.4 / pxPerUnit
  const placed = []
  const sorted = [...labelItems].sort((a, b) => b.state.area - a.state.area)
  const maxLabels = zoom.value < 1.4 ? 16 : labelItems.length

  for (const item of sorted) {
    const el = item.el
    el.setAttribute('font-size', String(fontUnits))
    el.setAttribute('stroke-width', String(strokeUnits))
    const sx = item.state.capital.x * pxPerUnit
    const sy = (item.state.capital.y - 7) * pxPerUnit
    const halfW = (item.state.name.length * 11) / 2
    const overlap =
      placed.length >= maxLabels ||
      placed.some((p) => Math.abs(p.x - sx) < p.halfW + halfW + 12 && Math.abs(p.y - sy) < 18)
    if (overlap) {
      el.style.display = 'none'
    } else {
      el.style.display = ''
      placed.push({ x: sx, y: sy, halfW })
    }
  }

  for (const dot of burgDots) {
    const size = dot.capital ? 4.2 : 1.8
    dot.el.setAttribute('r', String(size / pxPerUnit))
    dot.el.setAttribute('stroke-width', String(0.9 / pxPerUnit))
  }
}

watch(zoom, () => layoutLabels())

onMounted(() => {
  const SVG_NS = 'http://www.w3.org/2000/svg'
  const svg = overlayEl.value
  if (!svg) return

  const dotLayer = document.createElementNS(SVG_NS, 'g')
  dotLayer.setAttribute('id', 'mv-burgs')
  for (const burg of mapData.burgs) {
    const dot = document.createElementNS(SVG_NS, 'circle')
    dot.setAttribute('cx', String(burg.x))
    dot.setAttribute('cy', String(burg.y))
    dot.setAttribute('r', '2')
    dot.setAttribute('fill', burg.capital ? '#ffffff' : '#5a5446')
    dot.setAttribute('stroke', burg.capital ? '#2a2a2a' : '#5a5446')
    dot.setAttribute('stroke-width', '0.8')
    dot.setAttribute('data-burg', String(burg.i))
    dot.setAttribute('pointer-events', 'all')
    dotLayer.appendChild(dot)
    burgDots.push({ el: dot, capital: burg.capital })
  }
  svg.appendChild(dotLayer)

  const labelLayer = document.createElementNS(SVG_NS, 'g')
  labelLayer.setAttribute('id', 'mv-labels')
  for (const state of mapData.states) {
    if (!state.capital) continue
    const text = document.createElementNS(SVG_NS, 'text')
    text.setAttribute('x', String(state.capital.x))
    text.setAttribute('y', String(state.capital.y - 7))
    text.setAttribute('text-anchor', 'middle')
    text.setAttribute('font-size', '11')
    text.setAttribute('font-family', "'PingFang SC','Microsoft YaHei',sans-serif")
    text.setAttribute('fill', '#14202a')
    text.setAttribute('stroke', 'rgba(255,255,255,0.92)')
    text.setAttribute('stroke-width', '2.4')
    text.setAttribute('paint-order', 'stroke')
    text.setAttribute('letter-spacing', '0.3')
    text.setAttribute('data-state-index', String(state.i))
    text.setAttribute('class', state.slug ? 'mv-label mv-label-link' : 'mv-label')
    text.setAttribute('pointer-events', 'all')
    text.textContent = state.name
    labelLayer.appendChild(text)
    labelItems.push({ el: text, state })
  }
  svg.appendChild(labelLayer)
  layoutLabels()

  loading.value = false
  window.addEventListener('resize', layoutLabels)
})

onBeforeUnmount(() => {
  tooltip.value.visible = false
  window.removeEventListener('resize', layoutLabels)
})
</script>

<template>
  <div class="map-viewer">
    <div class="mv-toolbar">
      <div class="mv-stats">
        <span><strong>{{ stats.states }}</strong> 政权</span>
        <span><strong>{{ stats.linked }}</strong> 有档案</span>
        <span><strong>{{ stats.burgs }}</strong> 城市</span>
      </div>
      <div class="mv-views">
        <button
          v-for="v in VIEWS"
          :key="v.key"
          type="button"
          :class="{ on: view === v.key }"
          @click="view = v.key"
        >
          {{ v.label }}
        </button>
      </div>
      <div class="mv-actions">
        <button type="button" title="放大" @click="zoomBy(1.3)">＋</button>
        <button type="button" title="缩小" @click="zoomBy(1 / 1.3)">－</button>
        <button type="button" title="重置视图" @click="resetView">还原</button>
        <button type="button" :class="{ on: flipped }" title="上下翻转地图" @click="flipped = !flipped">翻转</button>
        <button type="button" :class="{ on: showBurgs }" @click="showBurgs = !showBurgs">城市</button>
        <button type="button" :class="{ on: showPanel }" @click="showPanel = !showPanel">列表</button>
      </div>
    </div>

    <div class="mv-body" :class="{ 'with-panel': showPanel }">
      <div
        ref="wrapEl"
        class="mv-stage-wrap"
        @wheel="onWheel"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
        @mousemove="onStageMove"
        @mouseleave="onStageLeave"
      >
        <div ref="stageEl" class="mv-stage" :class="{ 'burgs-off': !showBurgs }" :style="stageStyle">
          <img class="mv-img" :src="viewImage" alt="世界地图" draggable="false" />
          <svg ref="overlayEl" class="mv-overlay" viewBox="0 0 1912 956" preserveAspectRatio="none"></svg>
        </div>
        <p v-if="loading" class="mv-loading">地图加载中…</p>
        <p v-if="errorMsg" class="mv-error">{{ errorMsg }}</p>
        <p class="mv-hint">滚轮缩放 · 拖动平移 · 点击政权查看档案</p>
      </div>

      <aside v-if="showPanel" class="mv-panel">
        <h3>政权一览</h3>
        <ul>
          <li v-for="s in states" :key="s.i">
            <button
              type="button"
              class="mv-state"
              :class="{ active: activeState && activeState.i === s.i, linked: !!s.slug }"
              @mouseenter="focusState(s)"
              @mouseleave="activeState = null"
              @click="s.slug ? go(s.slug) : focusState(s)"
            >
              <i :style="{ background: s.color }"></i>
              <span class="mv-state-name">{{ s.name }}</span>
              <span v-if="s.slug" class="mv-arrow">→</span>
            </button>
          </li>
        </ul>
      </aside>
    </div>

    <div
      v-if="tooltip.visible"
      class="mv-tooltip"
      :style="{ left: tooltip.x + 14 + 'px', top: tooltip.y + 14 + 'px' }"
    >
      <strong>{{ tooltip.title }}</strong>
      <span v-for="(line, i) in tooltip.lines" :key="i">{{ line }}</span>
      <em v-if="tooltip.slug">点击查看档案</em>
    </div>
  </div>
</template>

<style scoped>
.map-viewer {
  --mv-border: var(--vp-c-divider);
  margin-top: 8px;
}

.mv-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}

.mv-stats {
  display: flex;
  gap: 14px;
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}

.mv-stats strong {
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}

.mv-views {
  display: flex;
  gap: 6px;
  margin-left: 10px;
}

.mv-views button,
.mv-actions button {
  padding: 5px 12px;
  font-size: 12.5px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--mv-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.mv-views button:hover,
.mv-actions button:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-brand-1);
}

.mv-views button.on,
.mv-actions button.on {
  color: #fff;
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.mv-actions {
  display: flex;
  gap: 6px;
  margin-left: auto;
}

.mv-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 14px;
  align-items: start;
}

.mv-body.with-panel {
  grid-template-columns: minmax(0, 1fr) 210px;
}

.mv-stage-wrap {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--mv-border);
  border-radius: 14px;
  background: #e9f0f4;
  cursor: grab;
  touch-action: none;
}

.mv-stage-wrap:active {
  cursor: grabbing;
}

.mv-stage {
  position: relative;
  transform-origin: center center;
  transition: transform 0.08s linear;
  will-change: transform;
}

.mv-img {
  display: block;
  width: 100%;
  height: auto;
  user-select: none;
  -webkit-user-drag: none;
}

.mv-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
}

.mv-stage :deep(#mv-labels text.mv-label-link) {
  cursor: pointer;
}

.mv-stage :deep(#mv-labels text.mv-label-link:hover) {
  fill: var(--vp-c-brand-1);
}

.mv-stage.burgs-off :deep(#mv-burgs) {
  display: none;
}

.mv-loading {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  margin: 0;
  font-size: 13px;
  color: #26323a;
}

.mv-hint {
  position: absolute;
  left: 10px;
  bottom: 8px;
  margin: 0;
  padding: 3px 8px;
  font-size: 11.5px;
  color: #1f2b33;
  background: rgba(255, 255, 255, 0.72);
  border-radius: 6px;
  pointer-events: none;
}

.mv-panel {
  min-width: 0;
}

.mv-panel h3 {
  margin: 0 0 8px;
  font-size: 13px;
  color: var(--vp-c-text-3);
  font-weight: 500;
  border: none;
  padding: 0;
}

.mv-panel ul {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 520px;
  overflow-y: auto;
  border: 1px solid var(--mv-border);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.mv-state {
  display: flex;
  align-items: center;
  gap: 7px;
  width: 100%;
  padding: 7px 9px;
  font-size: 12.5px;
  color: var(--vp-c-text-2);
  background: none;
  border: none;
  border-bottom: 1px solid var(--mv-border);
  cursor: pointer;
  text-align: left;
}

.mv-panel li:last-child .mv-state {
  border-bottom: none;
}

.mv-state:hover,
.mv-state.active {
  background: color-mix(in srgb, var(--vp-c-brand-1) 10%, transparent);
  color: var(--vp-c-text-1);
}

.mv-state i {
  width: 9px;
  height: 9px;
  border-radius: 3px;
  flex: 0 0 auto;
}

.mv-state-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mv-arrow {
  margin-left: auto;
  color: var(--vp-c-brand-1);
}

.mv-tooltip {
  position: fixed;
  z-index: 60;
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-width: 260px;
  padding: 9px 12px;
  font-size: 12.5px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--mv-border);
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
  pointer-events: none;
}

.mv-tooltip strong {
  font-size: 14px;
  margin-bottom: 2px;
}

.mv-tooltip span {
  color: var(--vp-c-text-2);
}

.mv-tooltip em {
  margin-top: 4px;
  font-style: normal;
  font-size: 11.5px;
  color: var(--vp-c-brand-1);
}

@media (max-width: 767px) {
  .mv-body.with-panel {
    grid-template-columns: minmax(0, 1fr);
  }

  .mv-panel ul {
    max-height: 260px;
  }
}
</style>
