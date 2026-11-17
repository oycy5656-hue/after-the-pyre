<script setup>
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import DATA from '../../data/cultures.mjs'

const cultures = computed(() => DATA.cultures.filter((c) => c.id !== 0))
const stateless = computed(() => DATA.cultures.find((c) => c.id === 0) || null)
const states = DATA.states

const keyword = ref('')
const active = ref(null)

const fmt = (n) => {
  if (n >= 1e8) return (n / 1e8).toFixed(2) + ' 亿'
  if (n >= 1e4) return (n / 1e4).toFixed(1) + ' 万'
  return String(Math.round(n))
}
const pct = (v) => (v * 100).toFixed(1) + '%'

const filtered = computed(() => {
  const kw = keyword.value.trim()
  if (!kw) return cultures.value
  return cultures.value.filter((c) => c.name.includes(kw))
})

const stats = computed(() => {
  const named = cultures.value
  const totalPop = named.reduce((n, c) => n + c.population, 0)
  return {
    count: named.length,
    totalPop,
    top: named.slice(0, 3),
    states: states.filter((s) => s.country).length
  }
})

const select = (c) => {
  active.value = active.value?.id === c.id ? null : c
}

const topCulturesOf = (row, n = 4) => row.cultures.filter((c) => c.id !== 0).slice(0, n)

const restShare = (row, n = 4) => {
  const top = topCulturesOf(row, n)
  const used = top.reduce((s, c) => s + c.share, 0)
  return Math.max(0, 1 - used)
}
</script>

<template>
  <div class="cl">
    <header class="cl-head">
      <p class="cl-lead">
        文化不随国界划分。同一个政权里往往并存数种文化，而一种文化也可能横跨多个国家。
        以下数据由地图地块的文化归属与各国官方人口分摊得出。
      </p>
      <ul class="cl-stats">
        <li><strong>{{ stats.count }}</strong><span>文化</span></li>
        <li><strong>{{ fmt(stats.totalPop) }}</strong><span>列名文化人口</span></li>
        <li><strong>{{ stateless ? fmt(stateless.population) : '—' }}</strong><span>无归属人口</span></li>
        <li><strong>{{ stats.states }}</strong><span>有档案政权</span></li>
      </ul>
    </header>

    <section class="cl-block">
      <h2>文化名录</h2>
      <p class="cl-sub">按人口排序。点击查看该文化在各国中的分布。</p>
      <input v-model="keyword" class="cl-search" placeholder="搜索文化名…" />

      <div class="cl-grid">
        <button
          v-for="c in filtered"
          :key="c.id"
          type="button"
          class="cl-card"
          :class="{ on: active?.id === c.id }"
          @click="select(c)"
        >
          <span class="cl-dot" :style="{ background: c.color }" />
          <span class="cl-name">{{ c.name }}</span>
          <span class="cl-pop">{{ fmt(c.population) }}</span>
          <span class="cl-meta">{{ c.cells }} 格 · {{ c.countries.length }} 国</span>
        </button>
      </div>

      <div v-if="active" class="cl-detail">
        <header>
          <span class="cl-dot" :style="{ background: active.color }" />
          <h3>{{ active.name }}</h3>
          <em>{{ fmt(active.population) }} 人 · {{ active.cells }} 格</em>
        </header>
        <p class="cl-label">主要分布</p>
        <ul class="cl-bars">
          <li v-for="c in active.countries" :key="c.name">
            <span class="cl-bar-name">{{ c.name }}</span>
            <span class="cl-bar"><i :style="{ width: (c.share * 100).toFixed(1) + '%', background: active.color }" /></span>
            <b>{{ pct(c.share) }}</b>
            <em>{{ fmt(c.pop) }}</em>
          </li>
        </ul>
      </div>
    </section>

    <section class="cl-block">
      <h2>各国文化构成</h2>
      <p class="cl-sub">百分比为该文化在本地块人口中的占比；总人口取国家档案数值。</p>

      <div class="cl-rows">
        <article v-for="row in states" :key="row.stateId" class="cl-row">
          <header class="cl-row-head">
            <a v-if="row.slug" :href="withBase('/countries/' + row.slug + '.html')">{{ row.country }}</a>
            <span v-else class="cl-raw">{{ row.stateName }}</span>
            <em v-if="row.officialPopulation">{{ fmt(row.officialPopulation) }} 人</em>
            <em v-else>地图人口 {{ row.cells }} 格</em>
          </header>

          <div class="cl-stack">
            <span
              v-for="c in topCulturesOf(row)"
              :key="c.id"
              :style="{ width: (c.share * 100).toFixed(1) + '%', background: c.color }"
              :title="`${c.name} ${pct(c.share)}`"
            />
            <span v-if="restShare(row) > 0.01" class="cl-stack-rest" :style="{ width: (restShare(row) * 100).toFixed(1) + '%' }" />
          </div>

          <ul class="cl-legend">
            <li v-for="c in topCulturesOf(row)" :key="c.id + '-l'">
              <i :style="{ background: c.color }" />{{ c.name }}<b>{{ pct(c.share) }}</b>
            </li>
            <li v-if="restShare(row) > 0.01" class="cl-legend-rest">其他 <b>{{ pct(restShare(row)) }}</b></li>
          </ul>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.cl {
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding-top: 24px;
}

.cl-lead {
  margin: 0 0 14px;
  font-size: 13px;
  line-height: 1.9;
  color: var(--vp-c-text-3);
}

.cl-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 8px;
  margin: 0 0 22px;
  padding: 0;
  list-style: none;
}

.cl-stats li {
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.cl-stats strong {
  display: block;
  font-size: 18px;
  color: var(--vp-c-text-1);
}

.cl-stats span {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.cl-block {
  margin-bottom: 34px;
}

.cl-block h2 {
  margin: 0 0 4px;
}

.cl-sub {
  margin: 0 0 12px;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.cl-search {
  width: 100%;
  max-width: 320px;
  margin-bottom: 12px;
  padding: 6px 12px;
  font-size: 12px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
}

.cl-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 8px;
}

.cl-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: 'dot name pop' 'meta meta meta';
  gap: 4px 7px;
  align-items: center;
  padding: 9px 12px;
  text-align: left;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  cursor: pointer;
}

.cl-card.on {
  border-color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
}

.cl-dot {
  grid-area: dot;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.cl-name {
  grid-area: name;
  font-size: 12.5px;
  color: var(--vp-c-text-1);
}

.cl-pop {
  grid-area: pop;
  font-size: 11px;
  color: var(--vp-c-text-2);
}

.cl-meta {
  grid-area: meta;
  font-size: 10px;
  color: var(--vp-c-text-3);
}

.cl-detail {
  margin-top: 14px;
  padding: 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.cl-detail header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.cl-detail h3 {
  margin: 0;
  font-size: 15px;
}

.cl-detail em {
  margin-left: auto;
  font-style: normal;
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.cl-label {
  margin: 0 0 8px;
  font-size: 10.5px;
  letter-spacing: 0.1em;
  color: var(--vp-c-text-3);
}

.cl-bars {
  display: grid;
  gap: 5px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.cl-bars li {
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr) 52px 74px;
  align-items: center;
  gap: 8px;
  font-size: 11.5px;
  color: var(--vp-c-text-2);
}

.cl-bar {
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.cl-bar i {
  display: block;
  height: 100%;
  border-radius: 999px;
}

.cl-bars b {
  text-align: right;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.cl-bars em {
  font-style: normal;
  text-align: right;
  color: var(--vp-c-text-3);
}

.cl-rows {
  display: grid;
  gap: 10px;
}

.cl-row {
  padding: 12px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.cl-row-head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 8px;
  font-size: 12.5px;
}

.cl-row-head a,
.cl-raw {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.cl-row-head em {
  margin-left: auto;
  font-style: normal;
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.cl-stack {
  display: flex;
  height: 10px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.06);
}

.cl-stack-rest {
  background: rgba(255, 255, 255, 0.14);
}

.cl-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 8px 0 0;
  padding: 0;
  list-style: none;
  font-size: 10.5px;
  color: var(--vp-c-text-3);
}

.cl-legend li {
  display: flex;
  align-items: center;
  gap: 4px;
}

.cl-legend i {
  width: 7px;
  height: 7px;
  border-radius: 2px;
}

.cl-legend b {
  font-weight: 600;
  color: var(--vp-c-text-2);
}

@media (max-width: 800px) {
  .cl-bars li {
    grid-template-columns: 70px minmax(0, 1fr) 46px;
  }
  .cl-bars em {
    display: none;
  }
}
</style>
