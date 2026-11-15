<script setup>
import { computed, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import countries from '../../data/countries.mjs'
import { currentUser, initAuth } from '../auth'
import { claimCountry, claimableSlugs, fetchAllClaims, fetchClaims, fetchPolicies, myClaim, releaseClaim, savePolicy } from '../cloud'
import { getOverride, loadEdits, saveOverride } from '../auth'

const user = ref(null)
const mySlug = ref(null)
const claims = ref({})
const policies = ref({})
const freeSlugs = ref([])
const selected = ref(null)
const draft = ref(null)
const busy = ref(false)
const msg = ref('')
const err = ref('')
const ready = ref(false)
const deadline = ref({ open: true, at: '' })
const canSubmit = computed(() => deadline.value.open || isAdminUser.value)

const SLOTS = 3
const isAdminUser = computed(() => user.value?.role === 'admin')

const bySlug = new Map(countries.map((c) => [c.slug, c]))
const countryOf = (slug) => bySlug.get(slug) || null

/** 玩家可见：我锁定的 + 仍可认领的；管理员：全部 */
const visible = computed(() => {
  if (isAdminUser.value) return countries
  const list = []
  if (mySlug.value && bySlug.has(mySlug.value)) list.push(bySlug.get(mySlug.value))
  for (const slug of freeSlugs.value) {
    if (slug !== mySlug.value && bySlug.has(slug)) list.push(bySlug.get(slug))
  }
  return list
})

const currentCountry = computed(() => (selected.value ? countryOf(selected.value) : null))
const currentClaim = computed(() => (selected.value ? claims.value[selected.value] : null))
const isMine = computed(() => !!mySlug.value && selected.value === mySlug.value)
const canEdit = computed(() => isMine.value || (isAdminUser.value && !!currentClaim.value))

const blankSlots = () => Array.from({ length: SLOTS }, () => ({ title: '', body: '' }))

const loadDraft = () => {
  if (!selected.value) {
    draft.value = null
    return
  }
  const saved = policies.value[selected.value]
  draft.value = { slots: blankSlots().map((s, i) => ({ ...s, ...(saved?.slots?.[i] || {}) })) }
}

const refresh = async () => {
  const allSlugs = countries.map((c) => c.slug)
  const [claim, list, free] = await Promise.all([
    myClaim(),
    isAdminUser.value ? fetchAllClaims() : fetchClaims(),
    claimableSlugs(allSlugs)
  ])
  mySlug.value = claim || null
  claims.value = list || {}
  freeSlugs.value = free || []
  policies.value = await fetchPolicies()
  await loadEdits()
  const st = getOverride('__policy_status__')
  deadline.value = st && typeof st.open === 'boolean' ? st : { open: true, at: '' }
  loadDraft()
}

onMounted(async () => {
  await initAuth()
  user.value = currentUser()
  await refresh()
  const first = visible.value[0]
  selected.value = mySlug.value || (first ? first.slug : null)
  loadDraft()
  ready.value = true
})

const pick = (slug) => {
  selected.value = slug
  msg.value = ''
  err.value = ''
  loadDraft()
}

const doClaim = async () => {
  if (!user.value || !selected.value) return
  if (mySlug.value) {
    err.value = '你已经锁定了「' + (countryOf(mySlug.value)?.name || mySlug.value) + '」，每人只能锁一个'
    return
  }
  busy.value = true
  err.value = ''
  try {
    await claimCountry(selected.value, user.value.display || user.value.username)
    msg.value = '已锁定「' + currentCountry.value.name + '」'
    await refresh()
  } catch (e) {
    err.value = e.message
  } finally {
    busy.value = false
  }
}

const doRelease = async () => {
  busy.value = true
  err.value = ''
  try {
    await releaseClaim(selected.value)
    msg.value = '已解除锁定'
    mySlug.value = null
    await refresh()
  } catch (e) {
    err.value = e.message
  } finally {
    busy.value = false
  }
}

const doSave = async () => {
  if (!canSubmit.value) {
    err.value = '本回合国策提交已截止'
    return
  }
  busy.value = true
  err.value = ''
  try {
    await savePolicy(selected.value, draft.value)
    policies.value[selected.value] = draft.value
    msg.value = '国策已保存'
  } catch (e) {
    err.value = e.message
  } finally {
    busy.value = false
  }
}

const setDeadline = async (open) => {
    busy.value = true
    err.value = ''
    try {
      const next = { open, at: new Date().toLocaleString('zh-CN', { hour12: false }).slice(5) }
      await saveOverride('__policy_status__', next)
      deadline.value = next
      msg.value = open ? '已重新开放提交' : '已截止本回合的国策提交'
    } catch (e) {
      err.value = e.message
    } finally {
      busy.value = false
    }
  }

  const download = (filename, text, type) => {
  const blob = new Blob([text], { type })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
  URL.revokeObjectURL(a.href)
}

const exportJson = () => {
  const all = {}
  for (const c of countries) {
    const p = policies.value[c.slug]
    if (!p) continue
    all[c.name] = { claim: claims.value[c.slug]?.display || null, slots: p.slots }
  }
  download('国策导出.json', JSON.stringify(all, null, 2), 'application/json')
}

const exportText = () => {
  const lines = []
  for (const c of countries) {
    const p = policies.value[c.slug]
    if (!p) continue
    lines.push('【' + c.name + '】' + (claims.value[c.slug]?.display ? '（' + claims.value[c.slug].display + '）' : ''))
    p.slots.forEach((s, i) => {
      if (!s?.title && !s?.body) return
      lines.push('  ' + (i + 1) + '. ' + (s.title || '未命名'))
      if (s.body) lines.push(s.body.split('\n').map((l) => '     ' + l).join('\n'))
    })
    lines.push('')
  }
  download('国策导出.txt', lines.join('\n') || '（暂无国策）', 'text/plain;charset=utf-8')
}
</script>

<template>
  <div class="pol">
    <div v-if="!user" class="pol-gate">
      <h2>需要登录</h2>
      <p>锁定国家、发表国策需要先登录账号。</p>
      <a class="pol-btn primary" :href="withBase('/account/')">去登录</a>
    </div>

    <div v-else-if="!ready" class="pol-gate"><p>加载中…</p></div>

    <div v-else class="pol-layout">
      <div class="pol-status" :class="deadline.open ? 'open' : 'closed'">
        <span>{{ deadline.open ? '本回合国策提交开放中' : '本回合国策提交已截止' }}</span>
        <template v-if="deadline.at"><em>于 {{ deadline.at }}</em></template>
        <span v-if="!deadline.open" class="pol-status-note">玩家只能查看，不能再修改；管理员仍可编辑</span>
        <span class="pol-status-actions" v-if="isAdminUser">
          <button v-if="deadline.open" type="button" class="pol-btn small" :disabled="busy" @click="setDeadline(false)">截止提交</button>
          <button v-else type="button" class="pol-btn small primary" :disabled="busy" @click="setDeadline(true)">重新开放</button>
        </span>
      </div>


      <aside class="pol-list">
        <h3>
          {{ isAdminUser ? '全部国家' : '可选国家' }}
          <em class="pol-count">{{ visible.length }}</em>
        </h3>
        <ul v-if="visible.length">
          <li v-for="c in visible" :key="c.slug">
            <button type="button" :class="{ on: c.slug === selected }" @click="pick(c.slug)">
              <span class="pol-name">{{ c.name }}</span>
              <em v-if="c.slug === mySlug" class="pol-tag mine">我的</em>
              <em v-else-if="isAdminUser && claims[c.slug]" class="pol-tag">{{ claims[c.slug].display || '已锁定' }}</em>
              <em v-else class="pol-tag free">空闲</em>
            </button>
          </li>
        </ul>
        <p v-else class="pol-none">暂无可认领的国家——都已名花有主。</p>

        <div v-if="isAdminUser" class="pol-export">
          <h3>导出（仅管理员）</h3>
          <button type="button" class="pol-btn" @click="exportJson">全部国策 JSON</button>
          <button type="button" class="pol-btn" @click="exportText">全部国策 TXT</button>
        </div>
      </aside>

      <section class="pol-main">
        <template v-if="currentCountry">
          <header class="pol-head">
            <div>
              <h2>{{ currentCountry.name }}</h2>
              <p class="pol-sub">
                <template v-if="isMine">你已锁定此国，可以填写国策</template>
                <template v-else-if="isAdminUser && currentClaim">锁定者：{{ currentClaim.display || '未知' }}</template>
                <template v-else-if="isAdminUser">尚未被认领</template>
                <template v-else>此国仍可认领</template>
              </p>
            </div>
            <div class="pol-actions">
              <button v-if="!isMine && (!currentClaim || isAdminUser) && !mySlug" type="button" class="pol-btn primary" :disabled="busy" @click="doClaim">
                锁定此国
              </button>
              <button v-if="isAdminUser && currentClaim" type="button" class="pol-btn" :disabled="busy" @click="doRelease">
                解除锁定
              </button>
              <button v-if="isMine" type="button" class="pol-btn" :disabled="busy" @click="doRelease">放弃此国</button>
            </div>
          </header>

          <p v-if="msg" class="pol-msg ok">{{ msg }}</p>
          <p v-if="err" class="pol-msg err">{{ err }}</p>

          <div v-if="draft && canEdit" class="pol-slots">
            <div v-for="(slot, i) in draft.slots" :key="i" class="pol-slot">
              <div class="pol-slot-head"><span>国策 {{ i + 1 }}</span><em v-if="!slot.title && !slot.body">空</em></div>
              <input v-model="slot.title" :disabled="!canSubmit" placeholder="国策标题" />
              <textarea v-model="slot.body" :disabled="!canSubmit" rows="5" placeholder="内容：手段、代价、预期效果" />
            </div>
            <button v-if="canSubmit" type="button" class="pol-btn primary" :disabled="busy" @click="doSave">保存国策</button>
            <p v-else class="pol-hint">本回合已截止，等待管理员推进回合。</p>
          </div>

          <p v-else-if="isAdminUser && currentClaim" class="pol-hint">管理员可查看该国的国策内容。</p>
          <p v-else class="pol-hint">锁定该国后才能填写国策。</p>
        </template>

        <p v-else class="pol-hint">列表里没有可选国家。</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.pol { max-width: 1080px; margin: 0 auto; }

.pol-gate {
  max-width: 420px; margin: 40px auto; padding: 26px; text-align: center;
  border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft);
}

.pol-layout { display: grid; grid-template-columns: 250px minmax(0, 1fr); gap: 24px; align-items: start; }

.pol-list { padding: 14px; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); }
.pol-list h3 { margin: 0 0 8px; font-size: 13px; display: flex; align-items: center; gap: 6px; }
.pol-count { font-style: normal; font-size: 11px; color: var(--vp-c-text-3); }
.pol-list ul { display: grid; gap: 2px; max-height: 460px; overflow: auto; margin: 0; padding: 0; list-style: none; }
.pol-list button {
  display: flex; align-items: center; gap: 6px; width: 100%; padding: 6px 8px;
  font-size: 12.5px; text-align: left; color: var(--vp-c-text-2);
  background: none; border: none; border-radius: 6px; cursor: pointer;
}
.pol-list button:hover { background: var(--vp-c-default-soft); }
.pol-list button.on { color: var(--vp-c-text-1); font-weight: 600; background: var(--vp-c-bg); }
.pol-name { flex: 1; }

.pol-tag { font-style: normal; font-size: 10px; padding: 0 5px; border-radius: 3px; color: #8a6a1f; background: rgba(192, 138, 46, 0.16); }
.pol-tag.mine { color: #1f6f4f; background: rgba(47, 125, 99, 0.16); }
.pol-tag.free { color: var(--vp-c-text-3); background: var(--vp-c-default-soft); }
.pol-none { margin: 10px 0 0; font-size: 12px; color: var(--vp-c-text-3); }

.pol-export { margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--vp-c-divider); display: grid; gap: 6px; }

.pol-main { padding: 20px; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); }
.pol-head { display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
.pol-head h2 { margin: 0; font-size: 20px; }
.pol-sub { margin: 4px 0 0; font-size: 12.5px; color: var(--vp-c-text-3); }
.pol-actions { display: flex; gap: 8px; }

.pol-btn {
  padding: 7px 14px; font-size: 12.5px; font-weight: 600; color: var(--vp-c-text-1);
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 7px; cursor: pointer;
}
.pol-btn.primary { color: #fff; background: var(--vp-c-brand-1); border-color: transparent; }
.pol-btn:disabled { opacity: 0.6; cursor: default; }

.pol-slots { display: grid; gap: 14px; }
.pol-slot { padding: 12px; border: 1px solid var(--vp-c-divider); border-radius: 9px; background: var(--vp-c-bg); }
.pol-slot-head { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 12px; font-weight: 600; color: var(--vp-c-text-2); }
.pol-slot-head em { font-style: normal; font-weight: 400; color: var(--vp-c-text-3); }
.pol-slot input, .pol-slot textarea {
  width: 100%; box-sizing: border-box; margin-bottom: 8px; padding: 8px 10px;
  font: inherit; font-size: 13px; line-height: 1.6; color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); border-radius: 7px; outline: none; resize: vertical;
}

.pol-msg { margin: 0 0 12px; padding: 8px 12px; font-size: 12.5px; border-radius: 7px; }
.pol-msg.ok { color: #1f6f4f; background: rgba(47, 125, 99, 0.12); }
.pol-msg.err { color: #9c4b4b; background: rgba(156, 75, 75, 0.12); }
.pol-hint { margin: 12px 0 0; font-size: 12px; color: var(--vp-c-text-3); }

@media (max-width: 900px) {
  .pol-layout { grid-template-columns: minmax(0, 1fr); }
  .pol-list ul { max-height: 220px; }
}

.pol-status {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  padding: 10px 14px;
  font-size: 12.5px;
  border-radius: 9px;
  border: 1px solid var(--vp-c-divider);
}

.pol-status.open {
  color: #1f6f4f;
  background: rgba(47, 125, 99, 0.1);
  border-color: rgba(47, 125, 99, 0.3);
}

.pol-status.closed {
  color: #9c4b4b;
  background: rgba(156, 75, 75, 0.1);
  border-color: rgba(156, 75, 75, 0.3);
}

.pol-status em {
  font-style: normal;
  opacity: 0.75;
}

.pol-status-note {
  opacity: 0.8;
}

.pol-status-actions {
  margin-left: auto;
  display: flex;
  gap: 8px;
}

.pol-btn.small {
  padding: 4px 10px;
  font-size: 11.5px;
}

.pol-slot input:disabled,
.pol-slot textarea:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

</style>
