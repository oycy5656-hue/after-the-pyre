<script setup>
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import DIPLOMACY from '../../data/diplomacy.mjs'

const { entities, blocs, countries, regions, faiths } = DIPLOMACY

const filter = ref('all')
const keyword = ref('')
const active = ref(null)

const TYPE_BADGE = (name, entity) => {
  if (entity?.bloc) return { label: '集团', cls: 'bloc' }
  if (entity?.sphere) return { label: '文化圈', cls: 'world' }
  if (entity?.offMap) return { label: '未上图', cls: 'off' }
  if (entity?.recorded && entity?.countryName) name = entity.countryName
  if (name.includes('教团')) return { label: '教团', cls: 'relig' }
  if (name.includes('王朝')) return { label: '王朝', cls: 'dyn' }
  if (name.includes('帝国')) return { label: '帝国', cls: 'emp' }
  if (name.includes('王国')) return { label: '王国', cls: 'king' }
  if (name.includes('共和国')) return { label: '共和', cls: 'rep' }
  if (name.includes('议邦') || name.includes('联邦')) return { label: '联邦', cls: 'fed' }
  if (name.includes('诸部')) return { label: '部族', cls: 'tribe' }
  if (name.includes('世界')) return { label: '世界', cls: 'world' }
  return { label: '政权', cls: 'state' }
}

const list = computed(() => {
  const kw = keyword.value.trim()
  return entities
    .filter((e) => {
      if (filter.value === 'recorded' && !e.recorded) return false
      if (filter.value === 'npc' && e.recorded) return false
      if (kw && !e.name.includes(kw)) return false
      return true
    })
    .sort((a, b) => b.cells - a.cells)
})

const stats = computed(() => ({
  total: entities.length,
  recorded: entities.filter((e) => e.recorded).length,
  cells: entities.reduce((n, e) => n + e.cells, 0),
  regions: regions.length,
  faiths: faiths.length
}))

const countryOf = (name) => countries.find((c) => c.name === name)

const neighborsOf = (e) => (e.recorded ? countryOf(e.countryName)?.neighbors || [] : [])

const memberLabel = (bloc, name) => (bloc?.memberLabels && bloc.memberLabels[name]) || name

const select = (e) => {
  active.value = active.value?.id === e.id ? null : e
}

const activeCountry = computed(() => (active.value?.recorded ? countryOf(active.value.countryName) : null))
</script>

<template>
  <div class="dp">
    <header class="dp-head">
      <p class="dp-lead">
        这片大陆上的政治实体并不只有「国家」。教团、王朝、部族联盟、以及横跨多国的文化圈，共同构成了这盘棋。
        下列名录收录了地图上全部 {{ stats.total }} 个实体，其中 {{ stats.recorded }} 个拥有完整的国家档案。
      </p>
      <ul class="dp-stats">
        <li><strong>{{ stats.total }}</strong><span>政治实体</span></li>
        <li><strong>{{ stats.recorded }}</strong><span>有档案</span></li>
        <li><strong>{{ stats.cells }}</strong><span>地块</span></li>
        <li><strong>{{ stats.regions }}</strong><span>地区</span></li>
        <li><strong>{{ stats.faiths }}</strong><span>信仰</span></li>
      </ul>

      <div class="dp-tools">
        <div class="dp-tabs">
          <button type="button" :class="{ on: filter === 'all' }" @click="filter = 'all'">全部</button>
          <button type="button" :class="{ on: filter === 'recorded' }" @click="filter = 'recorded'">有档案</button>
          <button type="button" :class="{ on: filter === 'npc' }" @click="filter = 'npc'">无档案</button>
        </div>
        <input v-model="keyword" class="dp-search" placeholder="搜索实体名…" />
      </div>
    </header>

    <div class="dp-body">
      <div class="dp-grid">
        <button
          v-for="e in list"
          :key="e.id"
          type="button"
          class="dp-card"
          :class="{ on: active?.id === e.id, dim: !e.recorded }"
          @click="select(e)"
        >
          <span class="dp-dot" :style="{ background: e.color }" />
          <span class="dp-name">{{ e.name }}</span>
          <em class="dp-type" :class="TYPE_BADGE(e.name, e).cls">{{ TYPE_BADGE(e.name, e).label }}</em>
          <span class="dp-meta">
            {{ e.bloc || e.sphere ? (e.members || []).join(' · ') : e.offMap ? '未上图' : e.cells + ' 格' }}
            <template v-if="e.capital"> · {{ e.capital }}</template>
            <template v-else-if="e.blocName && !e.bloc"> · 属{{ e.blocName }}</template>
          </span>
        </button>
      </div>

      <aside class="dp-side">
        <template v-if="!active">
          <h3>政治实体</h3>
          <p class="dp-hint">点击左侧任意实体，查看它的政体、信仰与外交关系。</p>
          <p class="dp-hint dp-dim">有档案的实体可以跳转到国家页。</p>
        </template>

        <template v-else>
          <p class="dp-side-kicker">{{ TYPE_BADGE(active.name, active).label }}</p>
          <h3>{{ active.name }}</h3>

          <dl class="dp-facts">
            <div v-if="active.capital"><dt>首都</dt><dd>{{ active.capital }}</dd></div>
            <div v-if="active.race"><dt>种族</dt><dd>{{ active.race }}</dd></div>
            <div v-if="active.system"><dt>政体</dt><dd>{{ active.system }}</dd></div>
            <div v-if="active.faith"><dt>信仰</dt><dd>{{ active.faith }}</dd></div>
            <div v-if="active.region"><dt>地区</dt><dd>{{ active.region }}</dd></div>
            <div v-if="active.population"><dt>人口</dt><dd>{{ active.population }}</dd></div>
            <div><dt>地块</dt><dd>{{ active.cells }}</dd></div>
          </dl>

          <template v-if="active.bloc">
            <p class="dp-label">成员</p>
            <ul class="dp-chips">
              <li v-for="m in active.members" :key="m">{{ memberLabel(active, m) }}</li>
            </ul>
            <p v-if="active.leader" class="dp-label">主导</p>
            <p class="dp-note">{{ active.leader }}<span v-if="active.player"> · 玩家扮演 {{ active.player }}</span></p>
            <p class="dp-note">{{ active.note }}</p>
          </template>

          <template v-else-if="active.members && active.members.length">
            <p class="dp-label">成员</p>
            <ul class="dp-chips">
              <li v-for="m in active.members" :key="m">{{ m }}</li>
            </ul>
          </template>

          <template v-if="active.blocName && !active.bloc">
            <p class="dp-label">所属集团</p>
            <p class="dp-note">{{ active.blocName }}<span v-if="active.isPlayerHouse"> · 玩家家族</span></p>
          </template>

          <template v-if="active.note && !active.bloc">
            <p class="dp-note">{{ active.note }}</p>
          </template>

          <template v-if="neighborsOf(active).length">
            <p class="dp-label">接壤</p>
            <ul class="dp-chips">
              <li v-for="n in neighborsOf(active)" :key="n">{{ n }}</li>
            </ul>
          </template>

          <template v-if="activeCountry?.mentions?.length">
            <p class="dp-label">档案提及</p>
            <ul class="dp-chips">
              <li v-for="m in activeCountry.mentions" :key="m">{{ m }}</li>
            </ul>
          </template>

          <template v-if="activeCountry?.factions?.length">
            <p class="dp-label">内部势力</p>
            <ul class="dp-factions">
              <li v-for="f in activeCountry.factions" :key="f.name">
                <i :style="{ background: f.color }" />
                <span>{{ f.name }}</span>
                <b>{{ f.influence }}%</b>
              </li>
            </ul>
          </template>

          <a v-if="activeCountry" class="dp-link" :href="withBase('/countries/' + activeCountry.slug + '.html')">查看国家档案 →</a>
          <p v-else class="dp-hint">该实体尚未建立独立档案，仅有地图与地块数据。</p>
        </template>
      </aside>
    </div>

    <section class="dp-section">
      <h2>政治集团</h2>
      <p class="dp-sub">同一个集团下的成员在名义上共主，实际往往各怀心思。</p>
      <div class="dp-blocs">
        <article v-for="b in blocs" :key="b.id" class="dp-bloc">
          <header>
            <span class="dp-dot" :style="{ background: b.color }" />
            <h3>{{ b.name }}</h3>
            <em>{{ b.type }}</em>
          </header>
          <p class="dp-bloc-leader">
            主导：{{ b.leader || '—' }}<span v-if="b.player"> · 玩家扮演 {{ b.player }}</span>
          </p>
          <ul class="dp-chips">
            <li v-for="m in b.members" :key="m">{{ memberLabel(b, m) }}</li>
          </ul>
          <p class="dp-bloc-note">{{ b.note }}</p>
        </article>
      </div>
    </section>

    <section class="dp-section">
      <h2>地区与信仰</h2>
      <p class="dp-sub">同一地区或同一信仰的政权，天然更容易结盟，也更容易争夺同一块土地。</p>
      <div class="dp-cols">
        <div class="dp-block">
          <h3>地区</h3>
          <ul class="dp-list">
            <li v-for="r in regions" :key="r.name">
              <span>{{ r.name }}</span>
              <em>{{ r.members.join('、') }}</em>
            </li>
          </ul>
        </div>
        <div class="dp-block">
          <h3>信仰</h3>
          <ul class="dp-list">
            <li v-for="f in faiths" :key="f.name">
              <span>{{ f.name }}</span>
              <em>{{ f.members.join('、') }}</em>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="dp-section">
      <h2>关系一览</h2>
      <p class="dp-sub">「接壤」来自地块边界计算，「提及」来自各国档案正文。</p>
      <table class="dp-table">
        <thead>
          <tr><th>国家</th><th>政体</th><th>地区</th><th>接壤</th><th>档案提及</th></tr>
        </thead>
        <tbody>
          <tr v-for="c in countries" :key="c.name">
            <td>
              <a :href="withBase('/countries/' + c.slug + '.html')">{{ c.name }}</a>
              <em v-if="!c.onMap" class="dp-offmap">{{ c.name === '维瑞亚帝国' ? '四家族共治' : '未上图' }}</em>
            </td>
            <td>{{ c.system || '—' }}</td>
            <td>{{ c.region || '—' }}</td>
            <td class="dp-cell-chips">
              <span v-for="n in c.neighbors" :key="n">{{ n }}</span>
              <i v-if="!c.neighbors.length">—</i>
            </td>
            <td class="dp-cell-chips">
              <span v-for="m in c.mentions" :key="m">{{ m }}</span>
              <i v-if="!c.mentions.length">—</i>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
.dp {
  padding-top: 64px;
  width: min(1400px, calc(100vw - 96px));
  margin-left: calc(50% - min(1400px, 100vw - 96px) / 2);
}

.dp-lead {
  margin: 0 0 14px;
  font-size: 13px;
  line-height: 1.9;
  color: var(--vp-c-text-3);
}

.dp-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 8px;
  margin: 0 0 16px;
  padding: 0;
  list-style: none;
}

.dp-stats li {
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.dp-stats strong {
  display: block;
  font-size: 18px;
  color: var(--vp-c-text-1);
}

.dp-stats span {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.dp-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 14px;
}

.dp-tabs {
  display: flex;
  gap: 4px;
  padding: 4px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
}

.dp-tabs button {
  padding: 3px 12px;
  font-size: 11.5px;
  color: var(--vp-c-text-3);
  background: transparent;
  border: none;
  border-radius: 999px;
  cursor: pointer;
}

.dp-tabs button.on {
  color: #0b1412;
  background: var(--vp-c-brand-1);
}

.dp-search {
  flex: 1;
  min-width: 160px;
  padding: 6px 12px;
  font-size: 12px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
}

.dp-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 16px;
  align-items: start;
}

.dp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(168px, 1fr));
  gap: 8px;
}

.dp-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: 'dot name type' 'meta meta meta';
  gap: 4px 6px;
  align-items: center;
  padding: 9px 11px;
  text-align: left;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  cursor: pointer;
}

.dp-card.on {
  border-color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
}

.dp-card.dim {
  opacity: 0.82;
}

.dp-dot {
  grid-area: dot;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dp-name {
  grid-area: name;
  font-size: 12.5px;
  color: var(--vp-c-text-1);
}

.dp-type {
  grid-area: type;
  padding: 1px 6px;
  font-style: normal;
  font-size: 9.5px;
  border-radius: 4px;
  color: #cfe3d8;
  background: rgba(255, 255, 255, 0.08);
}

.dp-type.emp { color: #f0d9a8; background: rgba(201, 162, 74, 0.18); }
.dp-type.dyn { color: #e3c4c0; background: rgba(179, 110, 103, 0.2); }
.dp-type.relig { color: #c8dfd0; background: rgba(79, 174, 140, 0.2); }
.dp-type.fed { color: #c6d6ea; background: rgba(91, 127, 199, 0.2); }
.dp-type.tribe { color: #d6cfa8; background: rgba(160, 150, 90, 0.2); }
.dp-type.world { color: #b8e6cf; background: rgba(127, 184, 160, 0.22); }
.dp-type.off { color: #c9c2b4; background: rgba(150, 140, 130, 0.2); }

.dp-meta {
  grid-area: meta;
  font-size: 10px;
  color: var(--vp-c-text-3);
}

.dp-side {
  position: sticky;
  top: 80px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
}

.dp-side-kicker {
  margin: 0 0 2px;
  font-size: 10.5px;
  letter-spacing: 0.12em;
  color: var(--vp-c-brand-1);
}

.dp-side h3 {
  margin: 0 0 10px;
  font-size: 17px;
}

.dp-hint {
  margin: 0 0 8px;
  font-size: 11.5px;
  line-height: 1.8;
  color: var(--vp-c-text-3);
}

.dp-dim {
  opacity: 0.75;
}

.dp-facts {
  display: grid;
  gap: 4px;
  margin: 0 0 12px;
}

.dp-facts div {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 5px 9px;
  font-size: 11.5px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
}

.dp-facts dt {
  color: var(--vp-c-text-3);
}

.dp-facts dd {
  margin: 0;
  color: var(--vp-c-text-1);
}

.dp-label {
  margin: 12px 0 6px;
  font-size: 10.5px;
  letter-spacing: 0.1em;
  color: var(--vp-c-text-3);
}

.dp-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.dp-chips li {
  padding: 2px 8px;
  font-size: 11px;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
}

.dp-factions {
  display: grid;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.dp-factions li {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 9px;
  font-size: 11.5px;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
}

.dp-factions i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.dp-factions b {
  margin-left: auto;
  color: var(--vp-c-text-3);
  font-weight: 500;
}

.dp-link {
  display: inline-block;
  margin-top: 14px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.dp-blocs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px;
}

.dp-bloc {
  padding: 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.dp-bloc header {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 6px;
}

.dp-bloc h3 {
  margin: 0;
  font-size: 14px;
}

.dp-bloc em {
  margin-left: auto;
  padding: 1px 7px;
  font-style: normal;
  font-size: 10px;
  color: var(--vp-c-text-3);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
}

.dp-bloc-leader {
  margin: 0 0 8px;
  font-size: 11.5px;
  color: var(--vp-c-text-2);
}

.dp-bloc-note {
  margin: 10px 0 0;
  font-size: 11.5px;
  line-height: 1.8;
  color: var(--vp-c-text-3);
}

.dp-note {
  margin: 4px 0 0;
  font-size: 11.5px;
  line-height: 1.8;
  color: var(--vp-c-text-3);
}

.dp-type.bloc { color: #dfd3b0; background: rgba(201, 162, 74, 0.22); }

.dp-section {
  margin-top: 36px;
}

.dp-section h2 {
  margin: 0 0 4px;
}

.dp-sub {
  margin: 0 0 14px;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.dp-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.dp-block {
  padding: 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.dp-block h3 {
  margin: 0 0 10px;
  font-size: 13.5px;
  color: var(--vp-c-text-2);
}

.dp-list {
  display: grid;
  gap: 5px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.dp-list li {
  display: grid;
  gap: 2px;
  padding: 6px 9px;
  font-size: 11.5px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
}

.dp-list span {
  color: var(--vp-c-text-1);
}

.dp-list em {
  font-style: normal;
  font-size: 10.5px;
  color: var(--vp-c-text-3);
}

.dp-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.dp-table th {
  padding: 8px 10px;
  font-size: 11px;
  text-align: left;
  color: var(--vp-c-text-3);
  border-bottom: 1px solid var(--vp-c-divider);
}

.dp-table td {
  padding: 7px 10px;
  vertical-align: top;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.dp-table a {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.dp-offmap {
  margin-left: 6px;
  padding: 0 5px;
  font-style: normal;
  font-size: 9.5px;
  color: #b08a4a;
  background: rgba(201, 162, 74, 0.15);
  border-radius: 3px;
}

.dp-cell-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.dp-cell-chips span {
  padding: 1px 7px;
  font-size: 10.5px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
}

.dp-cell-chips i {
  font-style: normal;
  color: var(--vp-c-text-3);
}

@media (max-width: 1000px) {
  .dp-body {
    grid-template-columns: minmax(0, 1fr);
  }
  .dp-side {
    position: static;
  }
  .dp-cols {
    grid-template-columns: 1fr;
  }
}
</style>
