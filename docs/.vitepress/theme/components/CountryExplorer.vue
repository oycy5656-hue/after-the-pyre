<script setup>
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import countries from '../../data/countries.mjs'

const query = ref('')
const race = ref('全部')

const races = computed(() => ['全部', ...new Set(countries.map((c) => c.race).filter(Boolean))])

const totalFactions = computed(() => countries.reduce((n, c) => n + c.politics.factions.length, 0))
const totalUnits = computed(() => countries.reduce((n, c) => n + c.military.units.length, 0))

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return countries.filter((c) => {
    if (race.value !== '全部' && c.race !== race.value) return false
    if (!q) return true
    const haystack = [c.name, c.race, c.capital, c.faith, c.politics.system, c.region.name, c.politics.leader.name]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return haystack.includes(q)
  })
})

const statLabels = [
  ['diplomacy', '外交'],
  ['stewardship', '管理'],
  ['martial', '军事'],
  ['intrigue', '谋略'],
  ['learning', '学识'],
  ['prowess', '武艺']
]

const ranked = computed(() =>
  [...countries].sort(
    (a, b) =>
      statLabels.reduce((sum, [k]) => sum + b.stats[k], 0) -
      statLabels.reduce((sum, [k]) => sum + a.stats[k], 0)
  )
)

function total(c) {
  return statLabels.reduce((sum, [k]) => sum + c.stats[k], 0)
}

function link(c) {
  return withBase(`/countries/${c.slug}`)
}

function initials(name) {
  return (name || '?').slice(0, 1)
}
</script>

<template>
  <div class="explorer">
    <div class="ex-summary">
      <div class="ex-stat">
        <strong>{{ countries.length }}</strong>
        <span>国家</span>
      </div>
      <div class="ex-stat">
        <strong>{{ races.length - 1 }}</strong>
        <span>种族</span>
      </div>
      <div class="ex-stat">
        <strong>{{ totalFactions }}</strong>
        <span>派系</span>
      </div>
      <div class="ex-stat">
        <strong>{{ totalUnits }}</strong>
        <span>军团</span>
      </div>
    </div>

    <div class="ex-toolbar">
      <label class="ex-search">
        <span class="ex-search-icon">⌕</span>
        <input v-model="query" type="search" placeholder="搜索国名、首都、政体、统治者…" />
      </label>
      <div class="ex-races">
        <button
          v-for="r in races"
          :key="r"
          type="button"
          :class="['ex-race', { active: race === r }]"
          @click="race = r"
        >
          {{ r }}
        </button>
      </div>
    </div>

    <p class="ex-count">显示 {{ filtered.length }} / {{ countries.length }}</p>

    <div class="ex-grid">
      <a v-for="c in filtered" :key="c.id" class="ex-card" :href="link(c)" :style="{ '--accent': c.accent }">
        <div class="ex-card-top">
          <span class="ex-badge">{{ c.race }}</span>
          <span class="ex-no">No.{{ String(c.index).padStart(2, '0') }}</span>
        </div>
        <h3 class="ex-name">{{ c.name }}</h3>
        <p class="ex-leader" :title="`${c.politics.leader.title} ${c.politics.leader.name}`">
          <span class="ex-avatar">{{ initials(c.politics.leader.name) }}</span>
          <span class="ex-leader-name">{{ c.politics.leader.title }} {{ c.politics.leader.name }}</span>
        </p>
        <dl class="ex-meta">
          <div><dt>首都</dt><dd>{{ c.capital }}</dd></div>
          <div><dt>政体</dt><dd>{{ c.politics.system }}</dd></div>
          <div><dt>区域</dt><dd>{{ c.region.name }}</dd></div>
          <div v-if="c.population"><dt>人口</dt><dd>{{ c.population }}</dd></div>
        </dl>
        <div class="ex-factions">
          <span
            v-for="f in c.politics.factions"
            :key="f.id"
            class="ex-faction-seg"
            :style="{ width: Math.min(100, f.influence) + '%', background: f.color }"
            :title="`${f.name} · ${f.influence}%`"
          ></span>
        </div>
        <p class="ex-footer">查看档案 →</p>
      </a>
    </div>

    <p v-if="!filtered.length" class="ex-empty">没有匹配的国家，换个关键词试试。</p>

    <section class="ex-table-section">
      <h3>统治者六维对比</h3>
      <p class="ex-table-hint">按六维合计从高到低排列。</p>
      <div class="ex-table-wrap">
        <table class="ex-table">
          <thead>
            <tr>
              <th>#</th>
              <th>国家</th>
              <th>统治者</th>
              <th v-for="[key, label] in statLabels" :key="key">{{ label }}</th>
              <th>合计</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(c, i) in ranked" :key="c.id">
              <td class="ex-rank">{{ i + 1 }}</td>
              <td>
                <a :href="link(c)">{{ c.name }}</a>
                <span class="ex-race-tag">{{ c.race }}</span>
              </td>
              <td class="ex-cell-muted">{{ c.politics.leader.name }}</td>
              <td v-for="[key] in statLabels" :key="key" class="ex-cell-num">{{ c.stats[key] }}</td>
              <td class="ex-cell-num ex-cell-strong">{{ total(c) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<style scoped>
.explorer {
  margin-top: 8px;
}

.ex-summary {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 22px;
}

.ex-stat {
  padding: 14px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
}

.ex-stat strong {
  display: block;
  font-size: 26px;
  line-height: 1.1;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}

.ex-stat span {
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}

.ex-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.ex-search {
  position: relative;
  flex: 1 1 260px;
  display: block;
}

.ex-search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--vp-c-text-3);
  font-size: 16px;
}

.ex-search input {
  width: 100%;
  padding: 9px 12px 9px 32px;
  font-size: 13.5px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s ease;
}

.ex-search input:focus {
  border-color: var(--vp-c-brand-1);
}

.ex-races {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.ex-race {
  padding: 6px 12px;
  font-size: 12.5px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ex-race:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-brand-1);
}

.ex-race.active {
  color: #fff;
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.ex-count {
  margin: 0 0 14px;
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}

.ex-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.ex-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px 18px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  text-decoration: none !important;
  color: inherit;
  overflow: hidden;
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.ex-card::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), transparent);
}

.ex-card:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--accent) 45%, var(--vp-c-divider));
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.12);
}

.ex-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.ex-badge {
  padding: 2px 8px;
  font-size: 11.5px;
  border-radius: 999px;
  color: color-mix(in srgb, var(--accent) 80%, var(--vp-c-text-1));
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
}

.ex-no {
  font-size: 11.5px;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}

.ex-name {
  margin: 0 0 8px;
  font-size: 20px;
  line-height: 1.25;
}

.ex-leader {
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 0 0 12px;
  font-size: 12.5px;
  color: var(--vp-c-text-2);
}

.ex-avatar {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  font-size: 12px;
  color: #fff;
  background: var(--accent);
  flex: 0 0 auto;
}

.ex-leader-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ex-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0;
  font-size: 12.5px;
}

.ex-meta div {
  display: flex;
  gap: 8px;
}

.ex-meta dt {
  flex: 0 0 32px;
  color: var(--vp-c-text-3);
}

.ex-meta dd {
  margin: 0;
  color: var(--vp-c-text-2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ex-factions {
  display: flex;
  gap: 2px;
  height: 5px;
  margin-top: 14px;
  border-radius: 999px;
  overflow: hidden;
  background: var(--vp-c-default-soft);
}

.ex-faction-seg {
  display: block;
  height: 100%;
}

.ex-footer {
  margin: 12px 0 0;
  font-size: 12px;
  color: color-mix(in srgb, var(--accent) 80%, var(--vp-c-text-1));
  opacity: 0;
  transition: opacity 0.18s ease;
}

.ex-card:hover .ex-footer {
  opacity: 1;
}

.ex-empty {
  padding: 30px 0;
  text-align: center;
  color: var(--vp-c-text-3);
}

.ex-table-section {
  margin-top: 40px;
}

.ex-table-section h3 {
  margin: 0 0 4px;
  font-size: 17px;
  border: none;
  padding: 0;
}

.ex-table-section h3::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 15px;
  margin-right: 9px;
  border-radius: 2px;
  background: var(--vp-c-brand-1);
  transform: translateY(2px);
}

.ex-table-hint {
  margin: 0 0 12px;
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}

.ex-table-wrap {
  overflow-x: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
}

.ex-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  white-space: nowrap;
}

.ex-table th,
.ex-table td {
  padding: 9px 12px;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

.ex-table thead th {
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg);
  position: sticky;
  top: 0;
}

.ex-table tbody tr:last-child td {
  border-bottom: none;
}

.ex-table tbody tr:hover td {
  background: color-mix(in srgb, var(--vp-c-brand-1) 6%, transparent);
}

.ex-rank {
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}

.ex-race-tag {
  margin-left: 8px;
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.ex-cell-muted {
  color: var(--vp-c-text-2);
}

.ex-cell-num {
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.ex-table th:nth-child(n + 4),
.ex-table td:nth-child(n + 4) {
  width: 54px;
  text-align: center;
}

.ex-table th:nth-child(2) {
  min-width: 132px;
}

.ex-table th:nth-child(3) {
  min-width: 130px;
}

.ex-cell-strong {
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .ex-summary {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
