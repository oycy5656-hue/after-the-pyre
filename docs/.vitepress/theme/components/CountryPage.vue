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

const factions = computed(() => (country.value.politics && country.value.politics.factions) || [])
const regionTraits = computed(() => (country.value.region && country.value.region.traits) || [])
const leaderTraits = computed(() => (country.value.politics.leader && country.value.politics.leader.traits) || [])
const wonders = computed(() => (country.value.politics && country.value.politics.wonders) || [])
const modifiers = computed(() => (country.value.politics && country.value.politics.modifiers) || [])
const factionTotal = computed(() => factions.value.reduce((n, f) => n + (f.influence || 0), 0))

// 圆环图：把影响力换算成 stroke-dasharray
const RADIUS = 42
const CIRC = 2 * Math.PI * RADIUS
const donut = computed(() => {
  let acc = 0
  const total = factionTotal.value || 1
  return factions.value.map((f) => {
    const len = (f.influence / total) * CIRC
    const seg = { ...f, dash: `${len} ${CIRC - len}`, offset: -acc }
    acc += len
    return seg
  })
})

const legions = computed(() => (country.value.military && country.value.military.legions) || [])
const totalTroops = computed(() => legions.value.reduce((n, l) => n + (l.total || 0), 0))
const totalCards = computed(() => legions.value.reduce((n, l) => n + (l.cards || 0), 0))

const toc = computed(() => [
  ['overview', '概览'],
  ['region', '风土'],
  ['ruler', '统治者'],
  ['factions', '势力格局'],
  ['military', '军事'],
  ...(wonders.value.length ? [['wonders', '奇观']] : []),
  ...(modifiers.value.length ? [['policies', '国策']] : [])
])
</script>

<template>
  <div class="wp-page" :style="{ '--accent': country.accent }">
    <div class="wp-main">
      <p id="overview" class="wp-lead">{{ country.bio }}</p>

      <section id="region" class="wp-section">
        <h2>风土</h2>
        <p>{{ country.region.desc }}</p>
        <ul v-if="regionTraits.length" class="wp-tags">
          <li v-for="t in regionTraits" :key="t">{{ t }}</li>
          <li v-if="country.region.customTag">{{ country.region.customTag }}</li>
        </ul>
      </section>

      <section id="ruler" class="wp-section">
        <h2>统治者</h2>
        <div class="wp-ruler">
          <div class="wp-ruler-info">
            <p class="wp-ruler-name">{{ country.politics.leader.name }}</p>
            <p class="wp-ruler-title">{{ country.politics.leader.title }}</p>
            <ul v-if="leaderTraits.length" class="wp-tags">
              <li v-for="t in leaderTraits" :key="t">{{ t }}</li>
            </ul>
            <blockquote v-if="country.politics.leader.bio">{{ country.politics.leader.bio }}</blockquote>
          </div>
          <table class="wp-stat-table">
            <tbody>
              <tr v-for="key in statKeys" :key="key">
                <th>{{ statLabels[key] }}</th>
                <td class="wp-stat-bar">
                  <span class="wp-bar"><i :style="{ width: ((country.stats[key] / statMax) * 100).toFixed(0) + '%' }"></i></span>
                </td>
                <td class="wp-stat-num">{{ country.stats[key] }}</td>
              </tr>
              <tr class="wp-stat-total">
                <th>合计</th>
                <td></td>
                <td class="wp-stat-num">{{ totalStats }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="factions" class="wp-section">
        <h2>势力格局</h2>
        <div class="wp-factions">
          <svg class="wp-donut" viewBox="0 0 100 100" role="img" aria-label="派系影响力占比">
            <circle cx="50" cy="50" :r="RADIUS" fill="none" stroke="var(--vp-c-default-soft)" stroke-width="13" />
            <circle
              v-for="seg in donut"
              :key="seg.id"
              cx="50"
              cy="50"
              :r="RADIUS"
              fill="none"
              :stroke="seg.color"
              stroke-width="13"
              :stroke-dasharray="seg.dash"
              :stroke-dashoffset="seg.offset"
              transform="rotate(-90 50 50)"
            />
            <text x="50" y="46" text-anchor="middle" class="wp-donut-label">{{ factions.length }}</text>
            <text x="50" y="58" text-anchor="middle" class="wp-donut-sub">派系</text>
          </svg>
          <table class="wp-faction-table">
            <thead>
              <tr><th>派系</th><th>领袖</th><th>影响力</th></tr>
            </thead>
            <tbody>
              <tr v-for="f in factions" :key="f.id">
                <td><span class="wp-dot" :style="{ background: f.color }"></span>{{ f.name }}</td>
                <td class="wp-muted">{{ f.leader }}</td>
                <td class="wp-num">{{ f.influence }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="military" class="wp-section">
        <h2>军事</h2>
        <div class="wp-mil-stats">
          <div><strong>{{ legions.length }}</strong><span>军团</span></div>
          <div><strong>{{ totalTroops.toLocaleString() }}</strong><span>总兵力</span></div>
          <div><strong>{{ totalCards }}</strong><span>兵牌</span></div>
        </div>

        <template v-if="legions.length">
          <article v-for="legion in legions" :key="legion.id" class="wp-legion">
            <header class="wp-legion-head">
              <h3>{{ legion.name }}</h3>
              <p class="wp-legion-meta">
                <span v-if="legion.training">{{ legion.training }}</span>
                <span v-if="legion.loyalty !== null">忠诚 {{ legion.loyalty }}</span>
                <span>{{ legion.cards }} 张兵牌</span>
                <strong>{{ legion.total.toLocaleString() }} 人</strong>
              </p>
            </header>
            <div class="wp-cards">
              <div v-for="card in legion.composition || []" :key="card.name" class="wp-card">
                <p class="wp-card-name">{{ card.name }}<em>× {{ card.count }}</em></p>
                <p class="wp-card-meta">{{ card.role }} · {{ card.race }}</p>
                <p v-if="card.modifiers" class="wp-card-mods">{{ card.modifiers }}</p>
                <p class="wp-card-total">{{ card.size }} 人/牌 · 小计 {{ card.total.toLocaleString() }}</p>
              </div>
            </div>
          </article>
          <p class="wp-mil-total">全境合计 {{ legions.length }} 个军团 · {{ totalCards }} 张兵牌 · {{ totalTroops.toLocaleString() }} 人</p>
        </template>
        <p v-else class="wp-empty">尚无成建制的军团记录。</p>
      </section>

      <section v-if="wonders.length" id="wonders" class="wp-section">
        <h2>奇观</h2>
        <div class="wp-gallery">
          <figure v-for="w in wonders" :key="w.id">
            <img v-if="w.avatar" :src="withBase(w.avatar)" :alt="w.name" loading="lazy" />
            <figcaption>
              <strong>{{ w.name }}</strong>
              <span v-if="w.desc">{{ w.desc }}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section v-if="modifiers.length" id="policies" class="wp-section">
        <h2>国策与修正</h2>
        <dl class="wp-modifiers">
          <template v-for="m in modifiers" :key="m.id">
            <dt>{{ m.name }}</dt>
            <dd>{{ m.effect }}</dd>
          </template>
        </dl>
      </section>

      <p class="wp-categories">
        分类：<a>{{ country.race }}</a> · <a>{{ country.politics.system }}</a> ·
        <a>{{ country.region.name }}</a> · <a>葬火之后国家</a>
      </p>
    </div>

    <aside class="wp-aside">
      <div class="wp-infobox">
        <p class="wp-infobox-title">{{ country.name }}</p>
        <img v-if="leaderAvatar" class="wp-infobox-img" :src="leaderAvatar" :alt="country.politics.leader.name" />
        <p class="wp-infobox-caption">{{ country.politics.leader.title }} {{ country.politics.leader.name }}</p>
        <table>
          <tbody>
            <tr><th>种族</th><td>{{ country.race }}</td></tr>
            <tr><th>首都</th><td>{{ country.capital }}</td></tr>
            <tr><th>信仰</th><td>{{ country.faith }}</td></tr>
            <tr><th>政体</th><td>{{ country.politics.system }}</td></tr>
            <tr><th>区域</th><td>{{ country.region.name }}</td></tr>
            <tr><th>派系</th><td>{{ factions.length }} 个</td></tr>
            <tr><th>军团</th><td>{{ legions.length }} 支 / {{ totalTroops.toLocaleString() }} 人</td></tr>
          </tbody>
        </table>
      </div>

      <nav class="wp-toc">
        <p class="wp-toc-title">目录</p>
        <ol>
          <li v-for="[id, label] in toc" :key="id"><a :href="'#' + id">{{ label }}</a></li>
        </ol>
      </nav>
    </aside>
  </div>
</template>

<style scoped>
.wp-page {
  --accent: #2f7d63;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 272px;
  gap: 32px;
  align-items: start;
  margin-top: 4px;
}

.wp-main {
  min-width: 0;
  font-size: 15px;
  line-height: 1.85;
}

.wp-lead {
  margin: 0 0 26px;
  font-size: 15.5px;
  color: var(--vp-c-text-1);
}

.wp-section {
  margin-top: 34px;
}

.wp-section h2 {
  margin: 0 0 14px;
  padding-bottom: 7px;
  font-size: 21px;
  font-weight: 600;
  border-bottom: 1px solid var(--vp-c-divider);
}

.wp-section p {
  margin: 0 0 12px;
  color: var(--vp-c-text-2);
}

.wp-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 10px 0 0;
  padding: 0;
  list-style: none;
}

.wp-tags li {
  padding: 2px 9px;
  font-size: 12.5px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

.wp-ruler {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 16px;
  padding: 18px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.wp-ruler-name {
  margin: 0;
  font-size: 19px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.wp-ruler-title {
  margin: 2px 0 10px;
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}

.wp-ruler blockquote {
  margin: 12px 0 0;
  padding: 2px 0 2px 12px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  border-left: 3px solid color-mix(in srgb, var(--accent) 50%, transparent);
}

.wp-stat-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 13px;
}

.wp-stat-table tr th {
  width: 62px;
  min-width: 62px;
  padding: 4px 0;
  font-size: 12.5px;
  white-space: nowrap;
  text-align: left;
  font-weight: 400;
  color: var(--vp-c-text-3);
}

.wp-stat-bar {
  width: 100%;
  padding: 4px 8px 4px 0;
}

.wp-bar {
  display: block;
  height: 8px;
  border-radius: 4px;
  background: var(--vp-c-default-soft);
  overflow: hidden;
}

.wp-bar i {
  display: block;
  height: 100%;
  background: var(--accent);
}

.wp-stat-num {
  width: 28px;
  text-align: right;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-1);
}

.wp-stat-total th,
.wp-stat-total td {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 7px;
  font-weight: 600;
}

.wp-factions {
  display: grid;
  grid-template-columns: 170px minmax(0, 1fr);
  gap: 34px;
  align-items: center;
}

.wp-donut {
  width: 180px;
  height: 180px;
}

.wp-donut-label {
  font-size: 15px;
  font-weight: 600;
  fill: var(--vp-c-text-1);
}

.wp-donut-sub {
  font-size: 9px;
  fill: var(--vp-c-text-3);
}

.wp-faction-table,
.wp-unit-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
}

.wp-faction-table th:nth-child(1),
.wp-faction-table td:nth-child(1) {
  width: 38%;
}

.wp-faction-table th:nth-child(2),
.wp-faction-table td:nth-child(2) {
  width: 40%;
}

.wp-faction-table td {
  word-break: keep-all;
}

.wp-faction-table th,
.wp-unit-table th {
  padding: 9px 14px;
  text-align: left;
  font-weight: 500;
  font-size: 12.5px;
  color: var(--vp-c-text-3);
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.wp-faction-table td,
.wp-unit-table td {
  padding: 11px 14px;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.wp-dot {
  display: inline-block;
  width: 9px;
  height: 9px;
  margin-right: 7px;
  border-radius: 2px;
  vertical-align: baseline;
}

.wp-num {
  text-align: right;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-1);
}

.wp-muted {
  color: var(--vp-c-text-3);
  font-size: 12.5px;
}

.wp-mil-stats {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.wp-mil-stats > div {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.wp-mil-stats strong {
  display: block;
  font-size: 22px;
  line-height: 1.1;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}

.wp-mil-stats span {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

/* 军团与兵牌 */
.wp-legion {
  margin-bottom: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
}

.wp-legion-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 10px;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.wp-legion-head h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.wp-legion-meta {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}

.wp-legion-meta strong {
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}

.wp-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 10px;
  padding: 14px 16px;
}

.wp-card {
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.wp-card-name {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin: 0;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.wp-card-name em {
  font-style: normal;
  color: var(--accent);
}

.wp-card-meta {
  margin: 3px 0 0;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.wp-card-mods {
  margin: 6px 0 0;
  font-size: 12px;
  color: color-mix(in srgb, var(--accent) 80%, var(--vp-c-text-1));
}

.wp-card-total {
  margin: 8px 0 0;
  padding-top: 6px;
  border-top: 1px dashed var(--vp-c-divider);
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.wp-mil-total {
  margin: 2px 0 0;
  text-align: right;
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}

.wp-unit-name {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.wp-unit-name small {
  display: block;
  font-weight: 400;
  font-size: 11.5px;
  color: var(--vp-c-text-3);
}

.wp-unit-table tfoot th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.wp-empty {
  padding: 18px;
  text-align: center;
  font-size: 13.5px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 8px;
}

.wp-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.wp-gallery figure {
  margin: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.wp-gallery img {
  display: block;
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.wp-gallery figcaption {
  padding: 12px 14px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.wp-gallery figcaption strong {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.wp-modifiers {
  margin: 0;
}

.wp-modifiers dt {
  margin-top: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.wp-modifiers dd {
  margin: 4px 0 0;
  padding-left: 12px;
  border-left: 2px solid var(--vp-c-divider);
  font-size: 13.5px;
  color: var(--vp-c-text-2);
}

.wp-categories {
  margin-top: 40px;
  padding-top: 14px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}

.wp-categories a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.wp-aside {
  position: sticky;
  top: 90px;
  font-size: 13px;
}

.wp-infobox {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}

.wp-infobox-title {
  margin: 0;
  padding: 10px 14px;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  color: #fff;
  background: var(--accent);
}

.wp-infobox-img {
  display: block;
  width: 100%;
  max-height: 220px;
  object-fit: cover;
}

.wp-infobox-caption {
  margin: 0;
  padding: 6px 12px;
  font-size: 11.5px;
  text-align: center;
  color: var(--vp-c-text-3);
  border-bottom: 1px solid var(--vp-c-divider);
}

.wp-infobox table {
  width: 100%;
  border-collapse: collapse;
}

.wp-infobox th,
.wp-infobox td {
  padding: 7px 12px;
  text-align: left;
  vertical-align: top;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 12.5px;
}

.wp-infobox th {
  width: 62px;
  font-weight: 500;
  color: var(--vp-c-text-3);
  background: color-mix(in srgb, var(--accent) 6%, transparent);
}

.wp-infobox td {
  color: var(--vp-c-text-1);
}

.wp-infobox tr:last-child th,
.wp-infobox tr:last-child td {
  border-bottom: none;
}

.wp-toc {
  margin-top: 18px;
  padding: 12px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.wp-toc-title {
  margin: 0 0 8px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--vp-c-text-3);
}

.wp-toc ol {
  margin: 0;
  padding-left: 18px;
  font-size: 12.5px;
}

.wp-toc li {
  margin: 4px 0;
}

.wp-toc a {
  color: var(--vp-c-text-2);
  text-decoration: none;
}

.wp-toc a:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}

@media (max-width: 1100px) {
  .wp-page {
    grid-template-columns: minmax(0, 1fr);
  }

  .wp-aside {
    position: static;
    order: -1;
  }

  .wp-ruler {
    grid-template-columns: minmax(0, 1fr);
  }

  .wp-factions {
    grid-template-columns: minmax(0, 1fr);
    justify-items: center;
  }
}
</style>
