<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'
import countries from '../../data/countries.mjs'

const props = defineProps({
  index: { type: Number, required: true }
})

const country = computed(() => countries[props.index] || countries[0])

const leaderAvatar = computed(() =>
  country.value.politics.leader.avatar ? withBase(country.value.politics.leader.avatar) : ''
)

const statLabels = {
  diplomacy: '外交',
  stewardship: '管理',
  martial: '军事',
  intrigue: '谋略',
  learning: '学识',
  prowess: '武艺'
}
const statKeys = Object.keys(statLabels)
const statMax = computed(() => Math.max(20, ...statKeys.map((k) => country.value.stats[k] || 0)))
const totalStats = computed(() => statKeys.reduce((sum, k) => sum + (country.value.stats[k] || 0), 0))
const leaderInitial = computed(() => (country.value.politics.leader.name || '?').slice(0, 1))

function unitGear(unit) {
  const eq = unit.equipment
  if (!eq || typeof eq !== 'object') return []
  const names = []
  for (const [slot, value] of Object.entries(eq)) {
    if (!value) continue
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item?.name && item.name !== '无') names.push(item.name)
      }
    } else if (value.name && value.name !== '无') {
      names.push(value.name)
    }
  }
  return [...new Set(names)]
}
</script>

<template>
  <div class="country-page" :style="{ '--accent': country.accent }">
    <section class="cp-hero">
      <div class="cp-hero-glow"></div>
      <div class="cp-hero-body">
        <p class="cp-eyebrow">国家档案 · No.{{ String(country.index).padStart(2, '0') }}</p>
        <h1 class="cp-name">{{ country.name }}</h1>
        <p class="cp-bio">{{ country.bio }}</p>
        <ul class="cp-chips">
          <li class="cp-chip">{{ country.race }}</li>
          <li class="cp-chip">首都 · {{ country.capital }}</li>
          <li class="cp-chip">信仰 · {{ country.faith }}</li>
          <li class="cp-chip">{{ country.politics.system }}</li>
          <li v-if="country.region.name" class="cp-chip">区域 · {{ country.region.name }}</li>
        </ul>
      </div>
      <div v-if="leaderAvatar" class="cp-portrait">
        <img :src="leaderAvatar" :alt="country.politics.leader.name" loading="lazy" />
        <span class="cp-portrait-caption">{{ country.politics.leader.title }} {{ country.politics.leader.name }}</span>
      </div>
    </section>

    <section v-if="country.region.desc" class="cp-region">
      <h3>风土</h3>
      <p class="cp-region-desc">{{ country.region.desc }}</p>
      <ul v-if="country.region.traits.length" class="cp-chips">
        <li v-for="t in country.region.traits" :key="t" class="cp-chip cp-chip-soft">{{ t }}</li>
        <li v-if="country.region.customTag" class="cp-chip cp-chip-soft">{{ country.region.customTag }}</li>
      </ul>
    </section>

    <section class="cp-section">
      <h3>统治者</h3>
      <div class="cp-ruler">
        <div class="cp-ruler-main">
          <div class="cp-ruler-head">
            <span class="cp-avatar-fallback" v-if="!country.politics.leader.avatar">{{ leaderInitial }}</span>
            <div>
              <p class="cp-ruler-name">{{ country.politics.leader.name }}</p>
              <p class="cp-ruler-title">{{ country.politics.leader.title }}</p>
            </div>
          </div>
          <ul v-if="country.politics.leader.traits.length" class="cp-chips">
            <li v-for="t in country.politics.leader.traits" :key="t" class="cp-chip">{{ t }}</li>
          </ul>
          <p v-if="country.politics.leader.bio" class="cp-quote">{{ country.politics.leader.bio }}</p>
        </div>
        <div class="cp-stats">
          <div v-for="key in statKeys" :key="key" class="cp-stat">
            <div class="cp-stat-head">
              <span>{{ statLabels[key] }}</span>
              <strong>{{ country.stats[key] }}</strong>
            </div>
            <div class="cp-bar">
              <span :style="{ width: ((country.stats[key] / statMax) * 100).toFixed(1) + '%' }"></span>
            </div>
          </div>
          <p class="cp-stat-total">六维合计 <strong>{{ totalStats }}</strong></p>
        </div>
      </div>
    </section>

    <section v-if="country.politics.factions.length" class="cp-section">
      <h3>势力格局</h3>
      <div class="cp-factions">
        <div v-for="f in country.politics.factions" :key="f.id" class="cp-faction">
          <div class="cp-faction-head">
            <span class="cp-dot" :style="{ background: f.color }"></span>
            <span class="cp-faction-name">{{ f.name }}</span>
            <span class="cp-faction-leader">{{ f.leader }}</span>
            <strong class="cp-faction-value">{{ f.influence }}%</strong>
          </div>
          <div class="cp-bar">
            <span :style="{ width: Math.min(100, f.influence) + '%', background: f.color }"></span>
          </div>
        </div>
      </div>
    </section>

    <section v-if="country.politics.wonders.length" class="cp-section">
      <h3>奇观</h3>
      <div class="cp-cards">
        <article v-for="w in country.politics.wonders" :key="w.id" class="cp-card">
          <img v-if="w.avatar" :src="withBase(w.avatar)" :alt="w.name" loading="lazy" />
          <div class="cp-card-body">
            <h4>{{ w.name }}</h4>
            <p v-if="w.desc">{{ w.desc }}</p>
          </div>
        </article>
      </div>
    </section>

    <section v-if="country.politics.heroes.length" class="cp-section">
      <h3>英杰</h3>
      <div class="cp-cards">
        <article v-for="h in country.politics.heroes" :key="h.id" class="cp-card cp-hero-card">
          <img v-if="h.avatar" :src="withBase(h.avatar)" :alt="h.name" loading="lazy" />
          <div class="cp-card-body">
            <h4>{{ h.name }} <small v-if="h.title">{{ h.title }}</small></h4>
            <p v-if="h.bio">{{ h.bio }}</p>
          </div>
        </article>
      </div>
    </section>

    <section v-if="country.politics.modifiers.length" class="cp-section">
      <h3>国策与修正</h3>
      <ul class="cp-modifiers">
        <li v-for="m in country.politics.modifiers" :key="m.id">
          <span class="cp-mod-name">{{ m.name }}</span>
          <span class="cp-mod-effect">{{ m.effect }}</span>
        </li>
      </ul>
    </section>

    <section v-if="country.military.units.length" class="cp-section">
      <h3>军事</h3>
      <div class="cp-units">
        <article v-for="u in country.military.units" :key="u.id" class="cp-unit">
          <header>
            <h4>{{ u.name }}</h4>
            <span class="cp-unit-size">{{ u.size }} 人</span>
          </header>
          <p class="cp-unit-meta">{{ u.role }} · {{ u.race }}</p>
          <p v-if="u.modifiers" class="cp-unit-mods">{{ u.modifiers }}</p>
          <p v-if="u.desc" class="cp-unit-desc">{{ u.desc }}</p>
          <p v-if="unitGear(u).length" class="cp-unit-gear">装备：{{ unitGear(u).join('、') }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.country-page {
  --accent: #2f7d63;
  margin-top: 8px;
}

.cp-hero {
  position: relative;
  display: flex;
  gap: 24px;
  align-items: flex-start;
  justify-content: space-between;
  padding: 26px 28px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  background:
    radial-gradient(120% 140% at 0% 0%, color-mix(in srgb, var(--accent) 16%, transparent) 0%, transparent 55%),
    var(--vp-c-bg-soft);
  overflow: hidden;
}

.cp-hero-glow {
  position: absolute;
  inset: auto -60px -120px auto;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--accent) 30%, transparent);
  filter: blur(70px);
  opacity: 0.55;
  pointer-events: none;
}

.cp-hero-body {
  position: relative;
  z-index: 1;
}

.cp-eyebrow {
  margin: 0 0 6px;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.cp-name {
  margin: 0;
  font-size: 34px;
  line-height: 1.15;
  border: none;
  padding: 0;
  letter-spacing: -0.01em;
}

.cp-bio {
  margin: 12px 0 0;
  color: var(--vp-c-text-2);
  font-size: 15px;
  line-height: 1.75;
  max-width: 62ch;
}

.cp-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
}

.cp-chip {
  padding: 4px 10px;
  font-size: 12.5px;
  line-height: 1.5;
  border-radius: 999px;
  color: var(--vp-c-text-1);
  background: color-mix(in srgb, var(--accent) 12%, var(--vp-c-bg));
  border: 1px solid color-mix(in srgb, var(--accent) 26%, transparent);
}

.cp-chip-soft {
  background: var(--vp-c-bg);
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.cp-portrait {
  position: relative;
  flex: 0 0 148px;
  z-index: 1;
}

.cp-portrait img {
  width: 148px;
  height: 148px;
  object-fit: cover;
  border-radius: 16px;
  border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
}

.cp-portrait-caption {
  display: block;
  margin-top: 8px;
  font-size: 12px;
  color: var(--vp-c-text-3);
  text-align: center;
}

.cp-region {
  margin-top: 22px;
}

.cp-region h3,
.cp-section h3 {
  margin: 0 0 12px;
  font-size: 17px;
  border: none;
  padding: 0;
}

.cp-region h3::before,
.cp-section h3::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 15px;
  margin-right: 9px;
  border-radius: 2px;
  background: var(--accent);
  transform: translateY(2px);
}

.cp-region-desc {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}

.cp-section {
  margin-top: 30px;
}

.cp-ruler {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 22px;
  padding: 20px 22px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
}

.cp-ruler-head {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cp-avatar-fallback {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 12px;
  font-size: 22px;
  color: #fff;
  background: var(--accent);
}

.cp-ruler-name {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.cp-ruler-title {
  margin: 2px 0 0;
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}

.cp-quote {
  margin: 14px 0 0;
  padding-left: 12px;
  border-left: 3px solid color-mix(in srgb, var(--accent) 45%, transparent);
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.75;
}

.cp-stats {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.cp-stat-head {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.cp-stat-head strong {
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}

.cp-bar {
  height: 7px;
  border-radius: 999px;
  background: var(--vp-c-default-soft);
  overflow: hidden;
}

.cp-bar span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, color-mix(in srgb, var(--accent) 70%, #fff), var(--accent));
  transition: width 0.4s ease;
}

.cp-stat-total {
  margin: 4px 0 0;
  font-size: 12.5px;
  color: var(--vp-c-text-3);
  text-align: right;
}

.cp-factions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cp-faction-head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  margin-bottom: 6px;
}

.cp-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex: 0 0 auto;
}

.cp-faction-name {
  font-weight: 600;
}

.cp-faction-leader {
  color: var(--vp-c-text-3);
  font-size: 12.5px;
}

.cp-faction-value {
  margin-left: auto;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-2);
}

.cp-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.cp-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.cp-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
}

.cp-hero-card img {
  height: 180px;
}

.cp-card-body {
  padding: 14px 16px 16px;
}

.cp-card-body h4 {
  margin: 0 0 6px;
  font-size: 15px;
}

.cp-card-body h4 small {
  color: var(--vp-c-text-3);
  font-weight: 400;
  font-size: 12px;
  margin-left: 6px;
}

.cp-card-body p {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.cp-modifiers {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cp-modifiers li {
  padding: 12px 16px;
  border-left: 3px solid color-mix(in srgb, var(--accent) 55%, transparent);
  border-radius: 0 10px 10px 0;
  background: var(--vp-c-bg-soft);
}

.cp-mod-name {
  display: block;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
}

.cp-mod-effect {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  white-space: pre-wrap;
}

.cp-units {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 14px;
}

.cp-unit {
  padding: 14px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.cp-unit header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.cp-unit h4 {
  margin: 0;
  font-size: 15px;
}

.cp-unit-size {
  font-size: 12px;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}

.cp-unit-meta {
  margin: 4px 0 0;
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}

.cp-unit-mods {
  margin: 8px 0 0;
  font-size: 12.5px;
  color: color-mix(in srgb, var(--accent) 75%, var(--vp-c-text-1));
}

.cp-unit-desc,
.cp-unit-gear {
  margin: 8px 0 0;
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

@media (max-width: 767px) {
  .cp-hero {
    flex-direction: column-reverse;
    padding: 20px;
  }

  .cp-portrait img {
    width: 96px;
    height: 96px;
  }

  .cp-name {
    font-size: 27px;
  }

  .cp-ruler {
    grid-template-columns: 1fr;
  }
}
</style>
