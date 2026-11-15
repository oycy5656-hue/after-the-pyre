<script setup>
import { computed } from 'vue'
import { withBase, useData } from 'vitepress'
import countries from '../../data/countries.mjs'
import map from '../../data/map.mjs'

const { isDark } = useData()

const stats = computed(() => {
  const factions = countries.reduce((n, c) => n + (c.politics.factions?.length || 0), 0)
  const legions = countries.reduce((n, c) => n + (c.military.legions?.length || 0), 0)
  const troops = countries.reduce(
    (n, c) => n + (c.military.legions || []).reduce((m, l) => m + (l.total || 0), 0),
    0
  )
  const races = new Set(countries.map((c) => c.race))
  const population = countries.reduce((n, c) => {
    const m = /^([\d.]+)\s*([KM]?)$/i.exec(String(c.population || '').trim())
    if (!m) return n
    const v = Number(m[1]) * (m[2].toUpperCase() === 'K' ? 1e3 : m[2].toUpperCase() === 'M' ? 1e6 : 1)
    return n + v
  }, 0)
  return {
    countries: countries.length,
    factions,
    legions,
    races: races.size,
    population: Math.round(population),
    burgs: map.burgs.length,
    states: map.states.length
  }
})

const fmtPop = (n) => (n >= 1e4 ? (n / 1e4).toFixed(0) + ' 万' : n.toLocaleString())

const entries = computed(() => [
  {
    title: '国家档案',
    desc: '二十二个政权，每个都有统治者六维、派系影响力与军团编制。可按种族筛选，也能搜国名、首都或君主。',
    to: '/countries/',
    tag: `${stats.value.countries} 个政权`,
    icon: 'book'
  },
  {
    title: '世界地图',
    desc: '地形、势力、文化三套视图。滚轮缩放、拖动平移，点地图上的国名直接进入档案。',
    to: '/map/',
    tag: `${stats.value.states} 政权 · ${stats.value.burgs} 城邑`,
    icon: 'map'
  },
  {
    title: '经济台账',
    desc: '没有货币的大陆，用「当量」记账。天赋折算成系数，算出各国的产出、抽取与可支配剩余。',
    to: '/economy/',
    tag: '统一口径',
    icon: 'chart'
  }
])

const races = computed(() => {
  const m = new Map()
  for (const c of countries) m.set(c.race, (m.get(c.race) || 0) + 1)
  return [...m.entries()].sort((a, b) => b[1] - a[1])
})

const maxRace = computed(() => Math.max(...races.value.map((r) => r[1])))

const spotlight = computed(() =>
  [...countries]
    .sort((a, b) => (b.politics.factions?.length || 0) - (a.politics.factions?.length || 0))
    .slice(0, 4)
)

const ICONS = {
  book: 'M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5Zm0 0v15',
  map: 'M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20V6.5Zm6-2.5v13.5m6-11V20',
  chart: 'M4 20V9m5 11V4m5 16v-7m5 7V7'
}
</script>

<template>
  <div class="hm" :class="{ 'hm-dark': isDark }">
    <!-- HERO -->
    <section class="hm-hero">
      <div class="hm-hero-bg" aria-hidden="true">
        <img :src="withBase('/map/terrain.png')" alt="" />
      </div>
      <div class="hm-hero-inner">
        <p class="hm-kicker">THE PYRE · 世界设定集</p>
        <h1 class="hm-title">葬火之后</h1>
        <p class="hm-sub">
          焦土之上重新长出城邦。<strong>{{ stats.countries }}</strong> 个政权并立于一片大陆，各有其神祇、君主与算计。
        </p>
        <div class="hm-actions">
          <a class="hm-btn primary" :href="withBase('/countries/')">
            进入国家档案
            <svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </a>
          <a class="hm-btn ghost" :href="withBase('/map/')">查看世界地图</a>
        </div>

        <dl class="hm-stats">
          <div><dt>{{ stats.countries }}</dt><dd>政权</dd></div>
          <div><dt>{{ stats.states }}</dt><dd>地图势力</dd></div>
          <div><dt>{{ fmtPop(stats.population) }}</dt><dd>总人口</dd></div>
          <div><dt>{{ stats.factions }}</dt><dd>派系</dd></div>
          <div><dt>{{ stats.legions }}</dt><dd>军团</dd></div>
        </dl>
      </div>
    </section>

    <!-- ENTRIES -->
    <section class="hm-section">
      <header class="hm-head">
        <h2>从这里开始</h2>
        <p>三个入口，对应三种读法：查人、看地、算账。</p>
      </header>
      <div class="hm-cards">
        <a v-for="e in entries" :key="e.to" class="hm-card" :href="withBase(e.to)">
          <span class="hm-card-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
              <path :d="ICONS[e.icon]" />
            </svg>
          </span>
          <span class="hm-card-tag">{{ e.tag }}</span>
          <h3>{{ e.title }}</h3>
          <p>{{ e.desc }}</p>
          <span class="hm-card-more">打开 →</span>
        </a>
      </div>
    </section>

    <!-- SPLIT -->
    <section class="hm-section hm-split">
      <a class="hm-mapcard" :href="withBase('/map/')">
        <img :src="withBase('/map/terrain.png')" alt="世界地图" loading="lazy" />
        <span class="hm-mapcard-cap">
          <em>世界地图</em>
          <small>地形 / 势力 / 文化</small>
        </span>
      </a>

      <div class="hm-panel">
        <h3>种族构成</h3>
        <ul class="hm-race">
          <li v-for="[name, n] in races" :key="name">
            <span class="hm-race-name">{{ name }}</span>
            <span class="hm-race-bar"><i :style="{ width: (n / maxRace) * 100 + '%' }"></i></span>
            <span class="hm-race-num">{{ n }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- SPOTLIGHT -->
    <section class="hm-section">
      <header class="hm-head">
        <h2>派系最杂的几个政权</h2>
        <p>席位越多，桌上的算计越密。</p>
      </header>
      <div class="hm-list">
        <a v-for="c in spotlight" :key="c.slug" class="hm-row" :href="withBase(`/countries/${c.slug}.html`)">
          <span class="hm-row-no">{{ String(c.index).padStart(2, '0') }}</span>
          <span class="hm-row-main">
            <strong>{{ c.name }}</strong>
            <small>{{ c.politics.leader.title }} {{ c.politics.leader.name }} · {{ c.politics.system }}</small>
          </span>
          <span class="hm-row-meta">
            <em>{{ c.politics.factions.length }} 派系</em>
            <small v-if="c.population">人口 {{ c.population }}</small>
          </span>
        </a>
      </div>
    </section>

    <footer class="hm-foot">
      <p>葬火之后 · 世界设定集</p>
      <p class="hm-foot-sub">地图由 Azgaar 幻想地图生成器绘制，数据来自世界资料集。</p>
    </footer>
  </div>
</template>

<style scoped>
.hm {
  --hm-ink: #10201c;
  --hm-accent: #2f7d63;
  --hm-accent-2: #c8a24a;
  --hm-line: var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

/* HERO */
.hm-hero {
  position: relative;
  overflow: hidden;
  margin: -32px -24px 0;
  padding: 112px 24px 76px;
  border-radius: 0 0 28px 28px;
  background:
    radial-gradient(1200px 420px at 18% 0%, rgba(200, 162, 74, 0.22), transparent 60%),
    radial-gradient(900px 420px at 88% 12%, rgba(47, 125, 99, 0.35), transparent 62%),
    linear-gradient(160deg, #14231f 0%, #172a26 40%, #0f1a17 100%);
}

.hm-hero-bg {
  position: absolute;
  inset: 0;
  opacity: 0.16;
  mask-image: radial-gradient(70% 70% at 50% 30%, #000 0%, transparent 78%);
}

.hm-hero-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
  filter: saturate(0.7) contrast(1.05);
}

.hm-hero-inner {
  position: relative;
  max-width: 1080px;
  margin: 0 auto;
  text-align: center;
  color: #f2f6f4;
}

.hm-kicker {
  margin: 0 0 18px;
  font-size: 12px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(242, 246, 244, 0.62);
}

.hm-title {
  margin: 0;
  font-size: clamp(44px, 7vw, 86px);
  line-height: 1.02;
  font-weight: 700;
  letter-spacing: 0.04em;
  background: linear-gradient(100deg, #ffffff 10%, #e8d3a0 45%, #8fd6bb 90%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hm-sub {
  max-width: 620px;
  margin: 22px auto 0;
  font-size: 15.5px;
  line-height: 1.85;
  color: rgba(242, 246, 244, 0.78);
}

.hm-sub strong {
  color: #f0d9a4;
  font-weight: 600;
}

.hm-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-top: 30px;
}

.hm-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 999px;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}

.hm-btn.primary {
  color: #0f1a17;
  background: linear-gradient(120deg, #f0d9a4, #8fd6bb);
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.28);
}

.hm-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.34);
}

.hm-btn.ghost {
  color: #eef4f1;
  border: 1px solid rgba(238, 244, 241, 0.28);
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(6px);
}

.hm-btn.ghost:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px);
}

.hm-stats {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
  max-width: 760px;
  margin: 46px auto 0;
  padding: 18px 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

.hm-stats > div {
  text-align: center;
}

.hm-stats dt {
  font-size: 22px;
  font-weight: 700;
  color: #f4e9c8;
  font-variant-numeric: tabular-nums;
}

.hm-stats dd {
  margin: 4px 0 0;
  font-size: 11.5px;
  color: rgba(242, 246, 244, 0.6);
}

/* SECTIONS */
.hm-section {
  max-width: 1080px;
  margin: 64px auto 0;
  padding: 0 4px;
}

.hm-head h2 {
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.hm-head p {
  margin: 8px 0 0;
  font-size: 14px;
  color: var(--vp-c-text-3);
}

.hm-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 24px;
}

.hm-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 22px 22px 20px;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--hm-line);
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.hm-card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--hm-accent) 45%, var(--hm-line));
  box-shadow: 0 16px 34px rgba(16, 32, 28, 0.12);
}

.hm-card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  color: #2f7d63;
  background: linear-gradient(140deg, rgba(47, 125, 99, 0.16), rgba(200, 162, 74, 0.18));
}

.hm-card-tag {
  position: absolute;
  top: 24px;
  right: 22px;
  font-size: 11.5px;
  color: var(--vp-c-text-3);
}

.hm-card h3 {
  margin: 18px 0 8px;
  font-size: 18px;
  font-weight: 650;
  color: var(--vp-c-text-1);
}

.hm-card p {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.75;
  color: var(--vp-c-text-2);
}

.hm-card-more {
  margin-top: 16px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--hm-accent);
}

/* SPLIT */
.hm-split {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: 18px;
  align-items: stretch;
}

.hm-mapcard {
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid var(--hm-line);
  text-decoration: none;
  background: #dfeaf0;
}

.hm-mapcard img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 260px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.hm-mapcard:hover img {
  transform: scale(1.04);
}

.hm-mapcard-cap {
  position: absolute;
  left: 16px;
  bottom: 16px;
  display: flex;
  flex-direction: column;
  padding: 10px 14px;
  border-radius: 10px;
  background: rgba(12, 24, 21, 0.7);
  backdrop-filter: blur(8px);
}

.hm-mapcard-cap em {
  font-style: normal;
  font-size: 14px;
  font-weight: 600;
  color: #f2f6f4;
}

.hm-mapcard-cap small {
  font-size: 11.5px;
  color: rgba(242, 246, 244, 0.66);
}

.hm-panel {
  padding: 22px;
  border: 1px solid var(--hm-line);
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
}

.hm-panel h3 {
  margin: 0 0 16px;
  font-size: 15px;
  font-weight: 650;
}

.hm-race {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.hm-race li {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr) 28px;
  gap: 10px;
  align-items: center;
  font-size: 12.5px;
}

.hm-race-name {
  color: var(--vp-c-text-2);
}

.hm-race-bar {
  height: 7px;
  border-radius: 4px;
  background: var(--vp-c-default-soft);
  overflow: hidden;
}

.hm-race-bar i {
  display: block;
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, #2f7d63, #74c9a8);
}

.hm-race-num {
  text-align: right;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}

/* LIST */
.hm-list {
  display: grid;
  gap: 8px;
  margin-top: 22px;
}

.hm-row {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  padding: 14px 18px;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--hm-line);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.18s ease, transform 0.18s ease;
}

.hm-row:hover {
  transform: translateX(3px);
  border-color: color-mix(in srgb, var(--hm-accent) 45%, var(--hm-line));
}

.hm-row-no {
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-3);
}

.hm-row-main strong {
  display: block;
  font-size: 15px;
  color: var(--vp-c-text-1);
}

.hm-row-main small {
  display: block;
  margin-top: 3px;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.hm-row-meta {
  text-align: right;
}

.hm-row-meta em {
  display: block;
  font-style: normal;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--hm-accent);
}

.hm-row-meta small {
  font-size: 11.5px;
  color: var(--vp-c-text-3);
}

/* FOOT */
.hm-foot {
  max-width: 1080px;
  margin: 72px auto 0;
  padding: 26px 4px 40px;
  border-top: 1px solid var(--hm-line);
  text-align: center;
}

.hm-foot p {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.hm-foot-sub {
  margin-top: 6px !important;
  font-size: 11.5px !important;
  color: var(--vp-c-text-3) !important;
}

@media (max-width: 960px) {
  .hm-cards,
  .hm-split {
    grid-template-columns: minmax(0, 1fr);
  }

  .hm-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .hm-hero {
    margin: -24px -20px 0;
    padding: 72px 20px 52px;
  }
}
</style>
