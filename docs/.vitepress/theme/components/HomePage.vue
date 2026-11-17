<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'
import countries from '../../data/countries.mjs'
import map from '../../data/map.mjs'

const stats = computed(() => {
  const factions = countries.reduce((n, c) => n + (c.politics.factions?.length || 0), 0)
  const legions = countries.reduce((n, c) => n + (c.military.legions?.length || 0), 0)
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
    desc: '二十二个政权，统治者六维、派系影响力与军团编制，一页读完。',
    to: '/countries/',
    tag: `${stats.value.countries} 政权`,
    num: '01'
  },
  {
    title: '世界地图',
    desc: '地形、势力、文化三套视图，缩放平移，点国名直接进档案。',
    to: '/tiles/',
    tag: `${stats.value.states} 政权 · ${stats.value.burgs} 城邑`,
    num: '02'
  },
  {
    title: '经济台账',
    desc: '没有货币的大陆，用「当量」记账：产出、抽取、剩余与贸易。',
    to: '/economy/',
    tag: '统一口径',
    num: '03'
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

const marquee = computed(() => countries.map((c) => c.name))
</script>

<template>
  <div class="hm">
    <!-- ============ HERO ============ -->
    <section class="hm-hero">
      <div class="hm-grid" aria-hidden="true" />
      <div class="hm-glow" aria-hidden="true" />
      <div class="hm-orbit-field" aria-hidden="true">
        <svg class="hm-orbits" viewBox="-450 -450 900 900" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="sat-glow">
              <stop offset="0%" stop-color="#fff8ec" />
              <stop offset="55%" stop-color="#f0c48a" />
              <stop offset="100%" stop-color="rgba(224,138,78,0)" />
            </radialGradient>
            <path id="orbit-a" d="M -338,0 a 338,118 0 1,1 676,0 a 338,118 0 1,1 -676,0" />
            <path id="orbit-b" d="M -430,0 a 430,168 0 1,1 860,0 a 430,168 0 1,1 -860,0" />
            <path id="orbit-c" d="M -252,0 a 252,88 0 1,1 504,0 a 252,88 0 1,1 -504,0" />
          </defs>

          <g class="hm-ring-group">
            <g transform="rotate(-18)">
              <use class="hm-ring r1" href="#orbit-a" />
              <circle class="hm-sat" r="4.5">
                <animateMotion dur="22s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#orbit-a" />
                </animateMotion>
              </circle>
            </g>

            <g transform="rotate(26)">
              <use class="hm-ring r2" href="#orbit-b" />
              <circle class="hm-sat warm" r="3.2">
                <animateMotion dur="34s" repeatCount="indefinite" begin="-8s" rotate="auto">
                  <mpath href="#orbit-b" />
                </animateMotion>
              </circle>
            </g>

            <g transform="rotate(-42)">
              <use class="hm-ring r3" href="#orbit-c" />
              <circle class="hm-sat dim" r="2.6">
                <animateMotion dur="15s" repeatCount="indefinite" begin="-3s" rotate="auto">
                  <mpath href="#orbit-c" />
                </animateMotion>
              </circle>
            </g>
          </g>
        </svg>

        <div class="hm-orb" />
      </div>

      <div class="hm-hero-inner">
        <p class="hm-kicker"><span class="hm-dash" />THE PYRE · 世界设定集</p>

        <h1 class="hm-title">
          葬火<span class="hm-title-2">之后</span>
        </h1>

        <p class="hm-sub">
          焦土之上重新长出城邦。<strong>{{ stats.countries }}</strong> 个政权并立于同一片大陆，
          各有其神祇、君主与算计。
        </p>

        <div class="hm-actions">
          <a class="hm-btn primary" :href="withBase('/countries/')">进入档案</a>
          <a class="hm-btn ghost" :href="withBase('/tiles/')">查看地块地图</a>
        </div>

        <dl class="hm-stats">
          <div>
            <dt>{{ stats.countries }}</dt>
            <dd>政权</dd>
          </div>
          <div>
            <dt>{{ fmtPop(stats.population) }}</dt>
            <dd>人口</dd>
          </div>
          <div>
            <dt>{{ stats.races }}</dt>
            <dd>种族</dd>
          </div>
          <div>
            <dt>{{ stats.burgs }}</dt>
            <dd>城邑</dd>
          </div>
        </dl>
      </div>

      <div class="hm-side" aria-hidden="true">
        <p>For those who survived the pyre.</p>
        <p>For cities that refuse to fall.</p>
      </div>

      <div class="hm-corner hm-corner-l" aria-hidden="true"><span>REGION</span> nowhere &nbsp; <span>LAT</span> ∞</div>
      <div class="hm-corner hm-corner-r" aria-hidden="true">THE PYRE · EST. 1003</div>

      <div class="hm-marquee" aria-hidden="true">
        <div class="hm-marquee-track">
          <span v-for="(n, i) in marquee" :key="'a' + i">{{ n }}</span>
          <span v-for="(n, i) in marquee" :key="'b' + i">{{ n }}</span>
        </div>
      </div>
    </section>

    <!-- ============ 入口 ============ -->
    <section class="hm-section">
      <header class="hm-head">
        <p class="hm-eyebrow">INDEX</p>
        <h2>从这里开始</h2>
      </header>

      <div class="hm-cards">
        <a v-for="e in entries" :key="e.to" class="hm-card" :href="withBase(e.to)">
          <div class="hm-card-top">
            <span class="hm-card-num">{{ e.num }}</span>
            <span class="hm-card-tag">{{ e.tag }}</span>
          </div>
          <h3>{{ e.title }}</h3>
          <p>{{ e.desc }}</p>
          <span class="hm-card-go">进入 →</span>
        </a>
      </div>
    </section>

    <!-- ============ 种族 ============ -->
    <section class="hm-section">
      <header class="hm-head">
        <p class="hm-eyebrow">DEMOGRAPHY</p>
        <h2>谁还活着</h2>
      </header>

      <div class="hm-races">
        <div v-for="[name, count] in races" :key="name" class="hm-race">
          <div class="hm-race-row">
            <span class="hm-race-name">{{ name }}</span>
            <span class="hm-race-count">{{ count }}</span>
          </div>
          <div class="hm-race-bar">
            <i :style="{ width: Math.max(6, (count / maxRace) * 100) + '%' }" />
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 聚光 ============ -->
    <section class="hm-section">
      <header class="hm-head">
        <p class="hm-eyebrow">SPOTLIGHT</p>
        <h2>派系最多的政权</h2>
      </header>

      <div class="hm-spot">
        <a v-for="c in spotlight" :key="c.slug" class="hm-spot-item" :href="withBase('/countries/' + encodeURIComponent(c.name) + '.html')">
          <span class="hm-spot-race">{{ c.race }}</span>
          <strong>{{ c.name }}</strong>
          <em>{{ c.politics.factions?.length || 0 }} 个派系 · {{ c.capital }}</em>
        </a>
      </div>
    </section>

    <section class="hm-cta">
      <h2>大陆还在烧，故事才刚开始。</h2>
      <div class="hm-actions">
        <a class="hm-btn primary" :href="withBase('/forum/')">去论坛聊聊</a>
        <a class="hm-btn ghost" :href="withBase('/policy/')">锁定一个国家</a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hm {
  --hm-bg: #060908;
  --hm-ink: #eef3f0;
  --hm-dim: rgba(238, 243, 240, 0.56);
  --hm-line: rgba(238, 243, 240, 0.12);
  --hm-gold: #d8b878;
  --hm-ember: #e08a4e;
  --hm-green: #6fd0ab;
  --hm-mono: 'JetBrains Mono', 'SFMono-Regular', ui-monospace, Menlo, monospace;
  color: var(--hm-ink);
}

/* ============ HERO ============ */
.hm-hero {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: calc(100vh - 64px);
  padding: 96px 64px 120px;
  overflow: hidden;
  background: radial-gradient(120% 100% at 50% 40%, #0a1210 0%, #060908 55%, #040605 100%);
  border-bottom: 1px solid var(--hm-line);
}

.hm-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(238, 243, 240, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(238, 243, 240, 0.045) 1px, transparent 1px);
  background-size: 78px 78px;
  mask-image: radial-gradient(circle at 50% 45%, #000 20%, transparent 78%);
  pointer-events: none;
}

.hm-glow {
  position: absolute;
  left: 50%;
  top: 44%;
  width: 900px;
  height: 900px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(224, 138, 78, 0.16) 0%, rgba(111, 208, 171, 0.06) 38%, transparent 68%);
  filter: blur(10px);
  pointer-events: none;
}

.hm-orb {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 34px;
  height: 34px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle at 40% 35%, #fff 0%, #ffe9c9 40%, rgba(224, 138, 78, 0) 72%);
  box-shadow: 0 0 60px 24px rgba(224, 138, 78, 0.32), 0 0 160px 70px rgba(224, 138, 78, 0.14);
  pointer-events: none;
}

/* ---------- 轨道 ---------- */
.hm-orbit-field {
  position: absolute;
  left: 50%;
  top: 41%;
  width: 900px;
  height: 900px;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.hm-orbits {
  width: 100%;
  height: 100%;
  overflow: visible;
  animation: hm-orbit-drift 90s linear infinite;
}

.hm-ring {
  fill: none;
  stroke: rgba(238, 243, 240, 0.16);
  stroke-width: 1;
}

.hm-ring.r1 {
  stroke: rgba(238, 243, 240, 0.22);
}

.hm-ring.r2 {
  stroke: rgba(216, 184, 120, 0.2);
  stroke-dasharray: 2 6;
}

.hm-ring.r3 {
  stroke: rgba(111, 208, 171, 0.18);
}

.hm-sat {
  fill: #fff6e8;
  filter: drop-shadow(0 0 6px rgba(255, 214, 160, 0.9));
}

.hm-sat.warm {
  fill: #f3cf9a;
  filter: drop-shadow(0 0 5px rgba(216, 184, 120, 0.85));
}

.hm-sat.dim {
  fill: rgba(238, 243, 240, 0.75);
  filter: drop-shadow(0 0 4px rgba(238, 243, 240, 0.6));
}

@keyframes hm-orbit-drift {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.hm-hero-inner {
  position: relative;
  z-index: 2;
  max-width: 720px;
}

.hm-kicker {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 26px;
  font-family: var(--hm-mono);
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--hm-dim);
}

.hm-dash {
  display: inline-block;
  width: 26px;
  height: 1px;
  background: var(--hm-gold);
}

.hm-title {
  margin: 0;
  font-size: clamp(56px, 9vw, 118px);
  font-weight: 800;
  line-height: 0.92;
  letter-spacing: -0.03em;
  color: #fff;
}

.hm-title-2 {
  display: block;
  background: linear-gradient(100deg, #ffffff 10%, #9fb3aa 60%, #4c635a 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hm-sub {
  max-width: 460px;
  margin: 26px 0 0;
  font-size: 15px;
  line-height: 1.9;
  color: var(--hm-dim);
}

.hm-sub strong {
  color: var(--hm-gold);
  font-weight: 600;
}

.hm-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
}

.hm-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 26px;
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-decoration: none;
  border-radius: 999px;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.hm-btn.primary {
  color: #0a1410;
  background: #f3f6f4;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
}

.hm-btn.primary:hover {
  transform: translateY(-2px);
  background: #fff;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
}

.hm-btn.ghost {
  color: var(--hm-ink);
  border: 1px solid rgba(238, 243, 240, 0.24);
  background: rgba(238, 243, 240, 0.04);
  backdrop-filter: blur(6px);
}

.hm-btn.ghost:hover {
  transform: translateY(-2px);
  border-color: var(--hm-gold);
  color: var(--hm-gold);
}

.hm-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  max-width: 520px;
  margin: 64px 0 0;
  padding-top: 22px;
  border-top: 1px solid var(--hm-line);
}

.hm-stats dt {
  font-family: var(--hm-mono);
  font-size: 22px;
  font-weight: 600;
  color: #fff;
}

.hm-stats dd {
  margin: 4px 0 0;
  font-family: var(--hm-mono);
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--hm-dim);
}

.hm-side {
  position: absolute;
  right: 64px;
  top: 42%;
  z-index: 2;
  max-width: 220px;
  text-align: right;
  font-family: var(--hm-mono);
  font-size: 11px;
  line-height: 1.9;
  color: rgba(238, 243, 240, 0.34);
}

.hm-side p {
  margin: 0;
}

.hm-corner {
  position: absolute;
  bottom: 76px;
  z-index: 2;
  font-family: var(--hm-mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(238, 243, 240, 0.34);
}

.hm-corner-l {
  left: 64px;
}

.hm-corner-r {
  right: 64px;
}

.hm-corner span {
  color: var(--hm-gold);
}

.hm-marquee {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  overflow: hidden;
  border-top: 1px solid var(--hm-line);
  background: rgba(4, 6, 5, 0.6);
}

.hm-marquee-track {
  display: flex;
  gap: 42px;
  padding: 12px 0;
  width: max-content;
  animation: hm-slide 48s linear infinite;
}

.hm-marquee-track span {
  font-family: var(--hm-mono);
  font-size: 10.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(238, 243, 240, 0.36);
  white-space: nowrap;
}

@keyframes hm-slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

/* ============ 通用区块 ============ */
.hm-section {
  max-width: 1180px;
  margin: 0 auto;
  padding: 84px 32px;
}

.hm-head {
  margin-bottom: 34px;
}

.hm-eyebrow {
  margin: 0 0 10px;
  font-family: var(--hm-mono);
  font-size: 10.5px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--hm-gold);
}

.hm-head h2,
.hm-cta h2 {
  margin: 0;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #fff;
}

.hm-section :deep(a) {
  text-decoration: none;
}

/* ============ 入口卡 ============ */
.hm-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.hm-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 24px;
  border: 1px solid var(--hm-line);
  border-radius: 16px;
  background: linear-gradient(160deg, rgba(238, 243, 240, 0.055), rgba(238, 243, 240, 0.012));
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.hm-card::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 17px;
  padding: 1px;
  background: linear-gradient(140deg, rgba(216, 184, 120, 0.5), transparent 40%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
}

.hm-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.45);
}

.hm-card:hover::after {
  opacity: 1;
}

.hm-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
}

.hm-card-num {
  font-family: var(--hm-mono);
  font-size: 11px;
  color: var(--hm-gold);
}

.hm-card-tag {
  padding: 3px 9px;
  font-family: var(--hm-mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  color: rgba(238, 243, 240, 0.66);
  border: 1px solid var(--hm-line);
  border-radius: 999px;
}

.hm-card h3 {
  margin: 0 0 10px;
  font-size: 19px;
  font-weight: 650;
  color: #fff;
}

.hm-card p {
  margin: 0 0 22px;
  font-size: 13px;
  line-height: 1.8;
  color: var(--hm-dim);
}

.hm-card-go {
  margin-top: auto;
  font-family: var(--hm-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--hm-gold);
}

/* ============ 种族 ============ */
.hm-races {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px 28px;
}

.hm-race-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 7px;
}

.hm-race-name {
  font-size: 13.5px;
  color: var(--hm-ink);
}

.hm-race-count {
  font-family: var(--hm-mono);
  font-size: 11px;
  color: var(--hm-dim);
}

.hm-race-bar {
  height: 4px;
  border-radius: 999px;
  background: rgba(238, 243, 240, 0.08);
  overflow: hidden;
}

.hm-race-bar i {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--hm-green), var(--hm-gold));
}

/* ============ 聚光 ============ */
.hm-spot {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 12px;
}

.hm-spot-item {
  display: grid;
  gap: 4px;
  padding: 18px;
  border: 1px solid var(--hm-line);
  border-radius: 14px;
  background: rgba(238, 243, 240, 0.035);
  transition: border-color 0.22s ease, transform 0.22s ease;
}

.hm-spot-item:hover {
  transform: translateY(-3px);
  border-color: rgba(216, 184, 120, 0.55);
}

.hm-spot-race {
  font-family: var(--hm-mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--hm-green);
}

.hm-spot-item strong {
  font-size: 16px;
  font-weight: 650;
  color: #fff;
}

.hm-spot-item em {
  font-style: normal;
  font-size: 11.5px;
  color: var(--hm-dim);
}

/* ============ 底部 CTA ============ */
.hm-cta {
  max-width: 1180px;
  margin: 0 auto 60px;
  padding: 56px 32px;
  text-align: center;
  border: 1px solid var(--hm-line);
  border-radius: 20px;
  background:
    radial-gradient(600px 200px at 50% 0%, rgba(216, 184, 120, 0.12), transparent 70%),
    rgba(238, 243, 240, 0.03);
}

.hm-cta .hm-actions {
  justify-content: center;
}

/* ============ 响应式 ============ */
@media (max-width: 1280px) {
  .hm-orbit-field {
    width: 720px;
    height: 720px;
  }
}

@media (max-width: 1024px) {
  .hm-orbit-field {
    width: 560px;
    height: 560px;
    opacity: 0.75;
  }

  .hm-side,
  .hm-corner {
    display: none;
  }

  .hm-hero {
    padding: 80px 32px 110px;
  }

  .hm-cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .hm-hero {
    min-height: auto;
    padding: 64px 22px 96px;
  }

  .hm-title {
    font-size: clamp(46px, 15vw, 72px);
  }

  .hm-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    margin-top: 44px;
  }

  .hm-cards {
    grid-template-columns: minmax(0, 1fr);
  }

  .hm-section {
    padding: 56px 22px;
  }

  .hm-head h2,
  .hm-cta h2 {
    font-size: 23px;
  }

  .hm-cta {
    margin: 0 22px 40px;
    padding: 40px 20px;
  }
}
</style>
