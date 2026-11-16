<script setup>
import { computed, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import { currentUser, initAuth } from '../auth'
import { createPost, createReply, deletePost, deleteReply, fetchPosts, fetchReplies } from '../cloud'

const user = ref(null)
const posts = ref([])
const openId = ref(null)
const replies = ref({})
const busy = ref(false)
const msg = ref('')
const err = ref('')
const ready = ref(false)

const form = ref({ title: '', body: '', tag: '综合' })
const replyDraft = ref('')

const TAGS = ['综合', '设定', '国策', '战报', '问询', '闲聊']

const isAdminUser = computed(() => user.value?.role === 'admin')
const canWrite = computed(() => !!user.value)

const load = async () => {
  posts.value = await fetchPosts()
}

onMounted(async () => {
  await initAuth()
  user.value = currentUser()
  await load()
  ready.value = true
})

const fmtTime = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const submitPost = async () => {
  err.value = ''
  msg.value = ''
  if (!form.value.title.trim()) {
    err.value = '标题不能为空'
    return
  }
  busy.value = true
  try {
    await createPost({ ...form.value, authorName: user.value.display || user.value.username })
    form.value = { title: '', body: '', tag: '综合' }
    await load()
    msg.value = '已发布'
  } catch (e) {
    err.value = e.message
  } finally {
    busy.value = false
  }
}

const toggleOpen = async (id) => {
  if (openId.value === id) {
    openId.value = null
    return
  }
  openId.value = id
  replyDraft.value = ''
  if (!replies.value[id]) replies.value[id] = await fetchReplies(id)
}

const submitReply = async (id) => {
  if (!replyDraft.value.trim()) return
  busy.value = true
  err.value = ''
  try {
    await createReply(id, replyDraft.value.trim(), user.value.display || user.value.username)
    replies.value[id] = await fetchReplies(id)
    replyDraft.value = ''
  } catch (e) {
    err.value = e.message
  } finally {
    busy.value = false
  }
}

const removePost = async (id) => {
  if (!confirm('确定删除这条帖子？')) return
  try {
    await deletePost(id)
    await load()
    if (openId.value === id) openId.value = null
  } catch (e) {
    err.value = e.message
  }
}

const removeReply = async (postId, id) => {
  try {
    await deleteReply(id)
    replies.value[postId] = await fetchReplies(postId)
  } catch (e) {
    err.value = e.message
  }
}

const canDelete = (item) => isAdminUser.value || (user.value && item.author === user.value.id)
</script>

<template>
  <div class="fm">
    <div v-if="!ready" class="fm-gate"><p>加载中…</p></div>

    <template v-else>
      <section v-if="canWrite" class="fm-compose">
        <h2>发帖</h2>
        <div class="fm-row">
          <select v-model="form.tag">
            <option v-for="t in TAGS" :key="t" :value="t">{{ t }}</option>
          </select>
          <input v-model="form.title" placeholder="标题" />
        </div>
        <textarea v-model="form.body" rows="5" placeholder="正文（支持换行）" />
        <div class="fm-actions">
          <button type="button" class="fm-btn primary" :disabled="busy" @click="submitPost">{{ busy ? '发布中…' : '发布' }}</button>
          <span class="fm-hint">以 {{ user.display || user.username }} 的身份发帖</span>
        </div>
      </section>

      <section v-else class="fm-gate">
        <h2>登录后可发帖</h2>
        <p>浏览不需要登录，发帖与回复需要账号。</p>
        <a class="fm-btn primary" :href="withBase('/account/')">去登录</a>
      </section>

      <p v-if="msg" class="fm-msg ok">{{ msg }}</p>
      <p v-if="err" class="fm-msg err">{{ err }}</p>

      <section class="fm-list">
        <h2>帖子 <em>{{ posts.length }}</em></h2>

        <p v-if="!posts.length" class="fm-empty">还没有人发帖，来第一个吧。</p>

        <article v-for="p in posts" :key="p.id" class="fm-post" :class="{ open: openId === p.id }">
          <header class="fm-post-head" @click="toggleOpen(p.id)">
            <span class="fm-tag">{{ p.tag }}</span>
            <h3>{{ p.title }}</h3>
            <span class="fm-meta">{{ p.author_name || '匿名' }} · {{ fmtTime(p.created_at) }}</span>
            <span class="fm-toggle">{{ openId === p.id ? '收起' : '展开' }}</span>
          </header>

          <template v-if="openId === p.id">
            <p v-if="p.body" class="fm-body">{{ p.body }}</p>

            <div class="fm-replies">
              <p class="fm-replies-title">回复 {{ (replies[p.id] || []).length }}</p>
              <div v-for="r in replies[p.id] || []" :key="r.id" class="fm-reply">
                <span class="fm-reply-author">{{ r.author_name || '匿名' }}</span>
                <span class="fm-reply-time">{{ fmtTime(r.created_at) }}</span>
                <p class="fm-reply-body">{{ r.body }}</p>
                <button v-if="canDelete(r)" type="button" class="fm-del" @click="removeReply(p.id, r.id)">删除</button>
              </div>

              <div v-if="canWrite" class="fm-reply-form">
                <textarea v-model="replyDraft" rows="3" placeholder="写回复…" />
                <button type="button" class="fm-btn" :disabled="busy" @click="submitReply(p.id)">回复</button>
              </div>
              <p v-else class="fm-hint">登录后可回复</p>
            </div>

            <button v-if="canDelete(p)" type="button" class="fm-del post" @click="removePost(p.id)">删除本帖</button>
          </template>
        </article>
      </section>
    </template>
  </div>
</template>

<style scoped>
.fm { max-width: 860px; margin: 0 auto; }

.fm-gate {
  margin: 20px 0;
  padding: 22px;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.fm-gate h2 { margin: 0 0 6px; font-size: 18px; }

.fm-compose {
  margin-bottom: 24px;
  padding: 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.fm-compose h2 { margin: 0 0 12px; font-size: 16px; }

.fm-row { display: flex; gap: 10px; margin-bottom: 10px; }
.fm-row select {
  padding: 8px 10px; font: inherit; font-size: 13px;
  color: var(--vp-c-text-1); background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider); border-radius: 8px;
}
.fm-row input { flex: 1; }

.fm-compose input,
.fm-compose textarea,
.fm-reply-form textarea {
  width: 100%; box-sizing: border-box; padding: 9px 11px;
  font: inherit; font-size: 13.5px; line-height: 1.7;
  color: var(--vp-c-text-1); background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider); border-radius: 8px;
  outline: none; resize: vertical;
}

.fm-actions { display: flex; align-items: center; gap: 12px; margin-top: 10px; }

.fm-btn {
  padding: 8px 18px; font-size: 13px; font-weight: 600;
  color: var(--vp-c-text-1); background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider); border-radius: 8px; cursor: pointer;
  text-decoration: none;
}
.fm-btn.primary { color: #fff; background: var(--vp-c-brand-1); border-color: transparent; }
.fm-btn:disabled { opacity: 0.6; cursor: default; }

.fm-hint { font-size: 11.5px; color: var(--vp-c-text-3); }

.fm-msg { margin: 0 0 12px; padding: 8px 12px; font-size: 12.5px; border-radius: 7px; }
.fm-msg.ok { color: #1f6f4f; background: rgba(47, 125, 99, 0.12); }
.fm-msg.err { color: #9c4b4b; background: rgba(156, 75, 75, 0.12); }

.fm-list h2 { display: flex; align-items: baseline; gap: 8px; margin: 0 0 12px; font-size: 18px; }
.fm-list h2 em { font-style: normal; font-size: 12px; font-weight: 400; color: var(--vp-c-text-3); }

.fm-empty {
  padding: 22px; text-align: center; font-size: 13px; color: var(--vp-c-text-3);
  border: 1px dashed var(--vp-c-divider); border-radius: 10px;
}

.fm-post {
  margin-bottom: 8px; border: 1px solid var(--vp-c-divider);
  border-radius: 10px; background: var(--vp-c-bg-soft); overflow: hidden;
}
.fm-post.open { border-color: color-mix(in srgb, var(--vp-c-brand-1) 35%, var(--vp-c-divider)); }

.fm-post-head {
  display: flex; align-items: center; gap: 10px; padding: 12px 14px; cursor: pointer;
}
.fm-post-head:hover { background: var(--vp-c-default-soft); }
.fm-tag {
  flex: 0 0 auto; padding: 1px 7px; font-size: 10.5px; border-radius: 4px;
  color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft);
}
.fm-post-head h3 { flex: 1; margin: 0; font-size: 14.5px; font-weight: 600; color: var(--vp-c-text-1); }
.fm-meta { font-size: 11.5px; color: var(--vp-c-text-3); white-space: nowrap; }
.fm-toggle { font-size: 11.5px; color: var(--vp-c-brand-1); }

.fm-body { margin: 0; padding: 0 16px 14px; font-size: 13.5px; line-height: 1.8; color: var(--vp-c-text-2); white-space: pre-wrap; }

.fm-replies { padding: 12px 16px 16px; border-top: 1px solid var(--vp-c-divider); }
.fm-replies-title { margin: 0 0 8px; font-size: 12px; color: var(--vp-c-text-3); }

.fm-reply { position: relative; padding: 8px 0; border-bottom: 1px dashed var(--vp-c-divider); }
.fm-reply-author { font-size: 12.5px; font-weight: 600; color: var(--vp-c-text-1); }
.fm-reply-time { margin-left: 8px; font-size: 11px; color: var(--vp-c-text-3); }
.fm-reply-body { margin: 4px 0 0; font-size: 13px; line-height: 1.7; color: var(--vp-c-text-2); white-space: pre-wrap; }

.fm-reply-form { display: flex; gap: 8px; align-items: flex-start; margin-top: 10px; }
.fm-reply-form textarea { flex: 1; }

.fm-del {
  position: absolute; right: 0; top: 8px;
  padding: 2px 8px; font-size: 11px; color: #9c4b4b;
  background: none; border: 1px solid rgba(156, 75, 75, 0.35); border-radius: 5px; cursor: pointer;
}
.fm-del.post { position: static; margin: 10px 16px 14px; }
</style>
