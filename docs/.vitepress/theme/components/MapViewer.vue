<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter, withBase } from 'vitepress'
import mapData from '../../data/map.mjs'
import countries from '../../data/countries.mjs'

const router = useRouter()

const wrapEl = ref(null)
const stageEl = ref(null)
const loading = ref(true)
const errorMsg = ref('')
const showBurgs = ref(true)
const showPanel = ref(true)
const zoom = ref(1)
const offset = ref({ x: 0, y: 0 })
const activeState = ref(null)
const tooltip = ref({ visible: false, x: 0, y: 0, title: '', lines: [], slug: null })

const stateByIndex = new Map(mapData.states.map((s) => [s.i, s]))
const countryBySlug = new Map(countries.map((c) => [c.slug, c]))

const states = computed(() =>
  [...mapData.states].sort((a, b) => b.area - a.area)
)

const stats = computed(() => ({
  states: mapData.states.length,
  burgs: mapData.burgs.length,
  linked: mapData.states.filter((s) => s.slug).length
}))

const stageStyle = computed(() => ({
  transform: `translate(${offset.value.x}px, ${offset.value.y}px) scale(${zoom.value})`
}))

function setTransform(scale, x = offset.value.x, y = offset.value.y) {
  const next = Math.min(8, Math.max(0.6, scale))
  zoom.value = next
  offset.value = { x, y }
}

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
  offset.value = {
    x: cx - (cx - offset.value.x) * ratio,
    y: cy - (cy - offset.value.y) * ratio
  }
  zoom.value = next
}

function onWheel(event) {
  event.preventDefault()
  zoomBy(event.deltaY < 0 ? 1.15 : 1 / 1.15, event)
}

let dragging = false
let last = { x: 0, y: 0 }
let moved = false

function onPointerDown(event) {
  if (event.button !== 0) return
  dragging = true
  moved = false
  last = { x: event.clientX, y: event.clientY }
}

function onPointerMove(event) {
  if (!dragging) return
  const dx = event.clientX - last.x
  const dy = event.clientY - last.y
  if (Math.abs(dx) + Math.abs(dy) > 3) moved = true
  offset.value = { x: offset.value.x + dx, y: offset.value.y + dy }
  last = { x: event.clientX, y: event.clientY }
}

function onPointerUp(event) {
  const wasDragging = dragging
  const wasMoved = moved
  dragging = false
  moved = false
  if (!wasDragging || wasMoved) return
  // 没有拖动 => 当作点击：用坐标取元素，避免 pointer 捕获导致拿不到真正的目标
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
  tooltip.value = {
    visible: true,
    x: event.clientX,
    y: event.clientY,
    title: state.name,
    lines,
    slug: state.slug
  }
}

function showBurgTooltip(event, burg) {
  const state = stateByIndex.get(burg.state)
  const lines = [`人口 ${Math.round(burg.population * 1000).toLocaleString()}`]
  if (state) lines.push(state.name)
  if (burg.capital) lines.unshift('首府')
  tooltip.value = {
    visible: true,
    x: event.clientX,
    y: event.clientY,
    title: burg.name,
    lines,
    slug: state?.slug || null
  }
}

function onStageMove(event) {
  if (dragging) {
    tooltip.value.visible = false
    return
  }
  const burgIdx = burgIndexFrom(event.target)
  if (burgIdx) {
    const burg = mapData.burgs.find((b) => b.i === burgIdx)
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

function go(slug) {
  router.go(withBase(`/countries/${slug}`))
}

function focusState(state) {
  activeState.value = state
}

const burgById = new Map(mapData.burgs.map((b) => [b.i, b]))
const burgDots = []

// 国名标签：字号固定为屏幕上的 11px，并做简单避让，避免挤成一团
const labelItems = []

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
    const overlap = placed.length >= maxLabels || placed.some((p) => Math.abs(p.x - sx) < p.halfW + halfW + 12 && Math.abs(p.y - sy) < 18)
    if (overlap) {
      el.style.display = 'none'
    } else {
      el.style.display = ''
      placed.push({ x: sx, y: sy, halfW })
    }
  }

  // 城市圆点也按屏幕尺寸绘制，放大后不会变成大圆斑
  for (const dot of burgDots) {
    const size = dot.capital ? 4 : 2.4
    dot.el.setAttribute('r', String(size / pxPerUnit))
    dot.el.setAttribute('stroke-width', String(0.9 / pxPerUnit))
  }
}

watch(zoom, () => layoutLabels())

onMounted(() => window.addEventListener('resize', layoutLabels))

onMounted(async () => {
  try {
    const res = await fetch(`${withBase('/map/world.svg')}?v=${mapData.seed || '1'}`, { cache: 'no-cache' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const svgText = await res.text()
    if (!stageEl.value) return
    stageEl.value.innerHTML = svgText
    const svg = stageEl.value.querySelector('svg')
    if (!svg) throw new Error('SVG 解析失败')

    // 原文件的 svg 没有 viewBox，尺寸靠 width/height 属性；这里换成自适应
    svg.setAttribute('viewBox', `0 0 ${mapData.width} ${mapData.height}`)
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')
    svg.removeAttribute('width')
    svg.removeAttribute('height')
    svg.setAttribute('style', 'width:100%;height:auto;display:block')

    // 关掉几层装饰性图层
    for (const id of ['gridOverlay', 'coordinates', 'cellIndexes', 'temperature', 'provs', 'zones', 'relig', 'cults']) {
      const layer = svg.querySelector(`#${id}`)
      if (layer) layer.style.display = 'none'
    }

    // 隐藏原生的城市图标，改用我们自己画的圆点（方便挂事件）
    const nativeBurgs = svg.querySelector('#burgIcons')
    if (nativeBurgs) nativeBurgs.style.display = 'none'

    // 原图把政权图层藏在隐藏的 cells 图层里，存档里只剩零散的小块路径，
    // 因此这里不再画多边形，改为在首都位置放可点击的国名标签 + 城市圆点
    const NS = 'http://www.w3.org/2000/svg'

    const layer = document.createElementNS(NS, 'g')
    layer.setAttribute('id', 'mv-burgs')
    for (const burg of mapData.burgs) {
      const dot = document.createElementNS(NS, 'circle')
      dot.setAttribute('cx', String(burg.x))
      dot.setAttribute('cy', String(burg.y))
      dot.setAttribute('r', burg.capital ? '3.4' : '1.9')
      dot.setAttribute('fill', burg.capital ? '#ffffff' : '#f4f1e6')
      dot.setAttribute('stroke', '#2a2a2a')
      dot.setAttribute('stroke-width', burg.capital ? '1.1' : '0.6')
      dot.setAttribute('data-burg', String(burg.i))
      layer.appendChild(dot)
      burgDots.push({ el: dot, capital: burg.capital })
    }
    svg.appendChild(layer)

    // 原生的地名标注层在缩小时会糊成一片，换成我们自己的国名标注
    const nativeLabels = svg.querySelector('#labels')
    if (nativeLabels) nativeLabels.style.display = 'none'

    const labelLayer = document.createElementNS(NS, 'g')
    labelLayer.setAttribute('id', 'mv-labels')
    for (const state of mapData.states) {
      const anchor = state.capital || null
      if (!anchor) continue
      const text = document.createElementNS(NS, 'text')
      text.setAttribute('x', String(anchor.x))
      text.setAttribute('y', String(anchor.y - 7))
      text.setAttribute('text-anchor', 'middle')
      text.setAttribute('font-size', '11')
      text.setAttribute('font-family', "'PingFang SC','Microsoft YaHei',sans-serif")
      text.setAttribute('fill', '#14202a')
      text.setAttribute('stroke', 'rgba(255,255,255,0.9)')
      text.setAttribute('stroke-width', '2.4')
      text.setAttribute('paint-order', 'stroke')
      text.setAttribute('letter-spacing', '0.3')
      text.setAttribute('data-state-index', String(state.i))
      text.setAttribute('class', state.slug ? 'mv-label mv-label-link' : 'mv-label')
      text.textContent = state.name
      labelLayer.appendChild(text)
      labelItems.push({ el: text, state })
    }
    svg.appendChild(labelLayer)
    layoutLabels()

    loading.value = false
  } catch (err) {
    errorMsg.value = `地图加载失败：${err.message}`
    loading.value = false
  }
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
      <div class="mv-actions">
        <button type="button" title="放大" @click="zoomBy(1.3)">＋</button>
        <button type="button" title="缩小" @click="zoomBy(1 / 1.3)">－</button>
        <button type="button" title="重置视图" @click="resetView">还原</button>
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
        <div ref="stageEl" class="mv-stage" :class="{ 'burgs-off': !showBurgs }" :style="stageStyle"></div>
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
  justify-content: space-between;
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

.mv-actions {
  display: flex;
  gap: 6px;
}

.mv-actions button {
  min-width: 34px;
  padding: 5px 10px;
  font-size: 12.5px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--mv-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.mv-actions button:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-brand-1);
}

.mv-actions button.on {
  color: #fff;
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
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
  background: #9ec7d8;
  cursor: grab;
  touch-action: none;
}

.mv-stage-wrap:active {
  cursor: grabbing;
}

.mv-stage {
  transform-origin: 0 0;
  transition: transform 0.08s linear;
  will-change: transform;
}

.mv-stage :deep(svg) {
  display: block;
  width: 100%;
  height: auto;
}

/* 地形保持原色，标签可点 */
.mv-stage :deep(#mv-labels text.mv-label-link) {
  cursor: pointer;
}

.mv-stage :deep(#mv-labels text.mv-label-link:hover) {
  fill: var(--vp-c-brand-1);
}

.mv-stage :deep(#statesBody path) {
  transition: opacity 0.15s ease;
}

.mv-stage :deep(#statesBody path:hover) {
  opacity: 0.85;
}

.mv-stage :deep(#gridOverlay),
.mv-stage :deep(#coordinates),
.mv-stage :deep(#cellIndexes) {
  display: none;
}

.mv-stage.burgs-off :deep(#mv-burgs) {
  display: none;
}

.mv-loading,
.mv-error {
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
