<script setup>
import { computed, onMounted, ref } from 'vue'
import { initAuth, isAdmin, loadEdits, getOverride } from '../auth'
import { createTweet, deleteTweet, fetchTweets, uploadTweetImage } from '../cloud'
import { emptyTurnState, START_YEAR, YEARS_PER_TURN } from '../../data/turn.mjs'

const tweets = ref([])
const loading = ref(true)
const busy = ref(false)
const msg = ref('')
const admin = ref(false)

const turn = ref(1)
const eraYear = ref(START_YEAR)
const eraTime = ref('')
const body = ref('')
const fileInput = ref(null)
const imageFile = ref(null)
const imagePreview = ref('')
const expanded = ref(null)

const loadTurn = async () => {
  try {
    await loadEdits()
    const ov = getOverride('__turn__')
    if (ov && typeof ov.turn === 'number') {
      turn.value = ov.turn
      eraYear.value = ov.year || START_YEAR
    }
  } catch {
    /* 离线时保持默认 */
  }
}

const load = async () => {
  loading.value = true
  try {
    tweets.value = await fetchTweets()
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await initAuth()
  admin.value = isAdmin()
  await Promise.all([load(), loadTurn()])
})

const pickImage = (e) => {
  const f = e.target.files && e.target.files[0]
  if (!f) return
  imageFile.value = f
  imagePreview.value = URL.createObjectURL(f)
}

const clearImage = () => {
  imageFile.value = null
  imagePreview.value = ''
  if (fileInput.value) fileInput.value.value = ''
}

const publish = async () => {
  if (!body.value.trim() && !imageFile.value) {
    msg.value = '内容不能为空'
    return
  }
  busy.value = true
  msg.value = '发布中…'
  try {
    let url = ''
    if (imageFile.value) {
      msg.value = '上传图片…'
      url = await uploadTweetImage(imageFile.value)
    }
    msg.value = '发布中…'
    await createTweet({
      turn: Number(turn.value) || 1,
      eraYear: Number(eraYear.value) || START_YEAR,
      eraTime: eraTime.value.trim(),
      body: body.value.trim(),
      imageUrl: url,
      authorName: '纪事官'
    })
    body.value = ''
    eraTime.value = ''
    clearImage()
    msg.value = '已发布'
    await load()
  } catch (e) {
    msg.value = e.message || '发布失败'
  } finally {
    busy.value = false
  }
}

const remove = async (id) => {
  if (!confirm('删除这条推文？')) return
  try {
    await deleteTweet(id)
    await load()
  } catch (e) {
    msg.value = e.message || '删除失败'
  }
}

const fmtDate = (iso) => {
  const d = new Date(iso)
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

const grouped = computed(() => {
  const map = new Map()
  for (const t of tweets.value) {
    const k = `第 ${t.turn} 回合 · 纪元 ${t.era_year || START_YEAR} 年`
    if (!map.has(k)) map.set(k, [])
    map.get(k).push(t)
  }
  return [...map.entries()]
})
</script>

<template>
  <div class="tw">
    <header class="tw-head">
      <p class="tw-lead">
        纪事官发布的战报与随笔。每条推文自动记录**发布时的回合**，并可标注该回合内的具体时间（如「春·三月」「夜半」）。
      </p>
      <p class="tw-meta">一回合 {{ YEARS_PER_TURN }} 年 · 起始纪元 {{ START_YEAR }} 年</p>
    </header>

    <section v-if="admin" class="tw-compose">
      <div class="tw-compose-head">
        <strong>发布推文</strong>
        <span class="tw-turn-badge">{{ turn }} · 纪元 {{ eraYear }}</span>
      </div>

      <div class="tw-fields">
        <label class="tw-field">
          <span>回合</span>
          <input v-model.number="turn" type="number" min="1" step="1" />
        </label>
        <label class="tw-field">
          <span>纪元年</span>
          <input v-model.number="eraYear" type="number" min="0" step="1" />
        </label>
        <label class="tw-field grow">
          <span>回合内时间</span>
          <input v-model="eraTime" placeholder="如：春·三月 / 夜半 / 雨后第三日" />
        </label>
      </div>

      <textarea v-model="body" class="tw-textarea" rows="4" placeholder="写点什么…" />

      <div class="tw-attach">
        <button type="button" class="tw-btn ghost" @click="fileInput.click()">添加图片</button>
        <input ref="fileInput" type="file" accept="image/*" hidden @change="pickImage" />
        <div v-if="imagePreview" class="tw-preview">
          <img :src="imagePreview" alt="预览" />
          <button type="button" @click="clearImage">移除</button>
        </div>
      </div>

      <div class="tw-actions">
        <button type="button" class="tw-btn primary" :disabled="busy" @click="publish">
          {{ busy ? '处理中…' : '发布' }}
        </button>
        <span v-if="msg" class="tw-msg">{{ msg }}</span>
      </div>
    </section>

    <p v-if="loading" class="tw-empty">载入中…</p>
    <p v-else-if="!tweets.length" class="tw-empty">还没有推文。</p>

    <section v-for="[group, items] in grouped" :key="group" class="tw-group">
      <h3 class="tw-group-title">{{ group }}</h3>
      <div class="tw-list">
        <article v-for="t in items" :key="t.id" class="tw-item">
          <header class="tw-item-head">
            <span class="tw-author">{{ t.author_name || '纪事官' }}</span>
            <span v-if="t.era_time" class="tw-time">{{ t.era_time }}</span>
            <time class="tw-date">{{ fmtDate(t.created_at) }}</time>
            <button v-if="admin" type="button" class="tw-del" title="删除" @click="remove(t.id)">×</button>
          </header>
          <p v-if="t.body" class="tw-body">{{ t.body }}</p>
          <figure v-if="t.image_url" class="tw-figure">
            <img :src="t.image_url" alt="配图" loading="lazy" @click="expanded = expanded === t.id ? null : t.id" />
          </figure>
        </article>
      </div>
    </section>

    <div v-if="expanded" class="tw-lightbox" @click="expanded = null">
      <img :src="tweets.find((t) => t.id === expanded)?.image_url" alt="大图" />
    </div>
  </div>
</template>

<style scoped>
.tw {
  padding-top: 48px;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.tw-lead {
  margin: 0 0 6px;
  font-size: 13px;
  line-height: 1.9;
  color: var(--vp-c-text-3);
}

.tw-meta {
  margin: 0 0 18px;
  font-size: 11.5px;
  color: var(--vp-c-text-3);
}

.tw-compose {
  margin-bottom: 26px;
  padding: 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.tw-compose-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 13px;
}

.tw-turn-badge {
  margin-left: auto;
  padding: 2px 9px;
  font-size: 11px;
  color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 999px;
}

.tw-fields {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.tw-field {
  display: grid;
  gap: 3px;
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.tw-field.grow {
  flex: 1;
  min-width: 200px;
}

.tw-field input {
  padding: 5px 9px;
  font: inherit;
  font-size: 12px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
}

.tw-textarea {
  width: 100%;
  padding: 9px 11px;
  font: inherit;
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 9px;
  resize: vertical;
}

.tw-attach {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.tw-preview {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tw-preview img {
  width: 72px;
  height: 54px;
  object-fit: cover;
  border-radius: 7px;
  border: 1px solid var(--vp-c-divider);
}

.tw-preview button {
  font-size: 11px;
  color: var(--vp-c-text-3);
  background: transparent;
  border: none;
  cursor: pointer;
}

.tw-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
}

.tw-btn {
  padding: 6px 14px;
  font-size: 12px;
  border-radius: 999px;
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.tw-btn.primary {
  color: #0b1412;
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.tw-btn:disabled {
  opacity: 0.6;
  cursor: default;
}

.tw-msg {
  font-size: 11.5px;
  color: var(--vp-c-text-3);
}

.tw-empty {
  padding: 30px 0;
  text-align: center;
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}

.tw-group {
  margin-bottom: 22px;
}

.tw-group-title {
  margin: 0 0 10px;
  padding-bottom: 6px;
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-3);
  border-bottom: 1px solid var(--vp-c-divider);
}

.tw-list {
  display: grid;
  gap: 10px;
}

.tw-item {
  padding: 12px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 11px;
  background: var(--vp-c-bg-soft);
}

.tw-item-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.tw-author {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.tw-time {
  padding: 1px 7px;
  color: #8a6a1f;
  background: rgba(201, 162, 74, 0.16);
  border-radius: 4px;
}

.tw-date {
  margin-left: auto;
}

.tw-del {
  width: 18px;
  height: 18px;
  font-size: 12px;
  line-height: 1;
  color: var(--vp-c-text-3);
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  border-radius: 50%;
  cursor: pointer;
}

.tw-body {
  margin: 0;
  font-size: 13px;
  line-height: 1.85;
  color: var(--vp-c-text-2);
  white-space: pre-wrap;
}

.tw-figure {
  margin: 10px 0 0;
}

.tw-figure img {
  max-width: 100%;
  border-radius: 9px;
  border: 1px solid var(--vp-c-divider);
  cursor: zoom-in;
}

.tw-lightbox {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: grid;
  place-items: center;
  padding: 40px;
  background: rgba(4, 7, 6, 0.88);
  cursor: zoom-out;
}

.tw-lightbox img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
}
</style>
