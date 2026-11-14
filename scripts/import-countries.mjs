// 把「国家资料集」JSON 转成 Wiki 页面 + 静态资源 + 数据模块
// 用法: node scripts/import-countries.mjs [jsonPath]
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { traitDesc, gearDesc, slotLabels } from './glossary.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const srcPath = process.argv[2] || 'D:/Backup/Downloads/国家资料集_备份_2026-11-14.json'
const countries = JSON.parse(readFileSync(srcPath, 'utf8'))

const imgDir = join(root, 'docs/public/countries')
const mdDir = join(root, 'docs/countries')
const dataDir = join(root, 'docs/.vitepress/data')

for (const dir of [imgDir, mdDir, dataDir]) mkdirSync(dir, { recursive: true })
rmSync(imgDir, { recursive: true, force: true })
mkdirSync(imgDir, { recursive: true })

const statsKeys = [
  ['diplomacy', '外交'],
  ['stewardship', '管理'],
  ['martial', '军事'],
  ['intrigue', '谋略'],
  ['learning', '学识'],
  ['prowess', '武艺']
]

let imageCount = 0

function saveImage(dataUri, fileName) {
  if (typeof dataUri !== 'string' || !dataUri.startsWith('data:image')) return null
  const m = dataUri.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.*)$/)
  if (!m) return null
  const ext = m[1] === 'jpeg' ? 'jpg' : m[1].replace('svg+xml', 'svg')
  writeFileSync(join(imgDir, `${fileName}.${ext}`), Buffer.from(m[2], 'base64'))
  imageCount += 1
  return `/countries/${fileName}.${ext}`
}

function slugOf(name, used) {
  const base = String(name || '未命名').replace(/[\\/:*?"<>|#%]/g, '').trim() || '未命名'
  let slug = base
  let n = 2
  while (used.has(slug)) slug = `${base}-${n++}`
  used.add(slug)
  return slug
}

const usedSlugs = new Set()

// ---------- 第一遍：整理数据 ----------
const records = countries.map((c, index) => {
  const slug = slugOf(c.name, usedSlugs)
  const tag = `c${String(index + 1).padStart(2, '0')}`
  const leader = c.politics?.leader || {}
  const politics = c.politics || {}
  const military = c.military || {}

  // 兵牌（units）是模板；军团（legions）用 unitNames 重复引用兵牌，组成具体编制
  const parseTraits = (u) =>
    [...String(u.modifiers || '').matchAll(/【([^】]+)】/g)].map((m) => ({
      name: m[1],
      desc: traitDesc[m[1]] || ''
    }))

  const parseGear = (u) => {
    const eq = u.equipment || {}
    const list = []
    for (const [slot, value] of Object.entries(eq)) {
      const items = Array.isArray(value) ? value : [value]
      for (const item of items) {
        if (!item?.name || item.name === '无') continue
        list.push({
          slot,
          slotLabel: slotLabels[slot] || slot,
          name: item.name,
          desc: item.desc || gearDesc[item.name] || ''
        })
      }
    }
    return list
  }

  const unitDefs = (military.units || []).map((u) => ({
    id: u.id,
    name: u.name,
    role: u.role,
    race: u.race,
    size: Number(u.size) || 0,
    modifiers: u.modifiers,
    traits: parseTraits(u),
    gear: parseGear(u),
    desc: u.desc,
    equipment: u.equipment
  }))
  const unitByName = new Map(unitDefs.map((u) => [u.name, u]))

  const legions = (military.legions || []).map((l) => {
    const counts = new Map()
    for (const name of l.unitNames || []) counts.set(name, (counts.get(name) || 0) + 1)
    const composition = [...counts.entries()].map(([name, count]) => {
      const def = unitByName.get(name) || {}
      const size = Number(def.size) || 0
      return {
        name,
        count,
        role: def.role || '',
        race: def.race || '',
        size,
        total: size * count,
        modifiers: def.modifiers || '',
        traits: def.traits || [],
        gear: def.gear || [],
        desc: def.desc || ''
      }
    })
    return {
      id: l.id,
      name: l.name,
      training: l.training || '',
      loyalty: l.loyalty ?? null,
      composition,
      total: composition.reduce((n, x) => n + x.total, 0),
      cards: composition.reduce((n, x) => n + x.count, 0)
    }
  })

  return {
    id: c.id,
    slug,
    index: index + 1,
    name: c.name,
    race: c.race,
    capital: c.capital,
    faith: c.faith,
    bio: c.nation_bio,
    accent: politics.factions?.[0]?.color || '#2f7d63',
    region: {
      name: c.region_name,
      traits: (c.region_traits || '')
        .split(/[、,，]/)
        .map((t) => t.trim())
        .filter(Boolean),
      customTag: c.region_custom_tag || '',
      desc: c.region_desc
    },
    politics: {
      system: politics.system,
      leader: {
        name: leader.name,
        title: leader.title,
        avatar: saveImage(leader.avatar, `${tag}-leader`),
        traits: leader.traits || [],
        stats: leader.stats || {},
        bio: leader.bio
      },
      factions: (politics.factions || []).map((f) => ({
        id: f.id,
        name: f.name,
        leader: f.leader,
        influence: f.influence,
        color: f.color
      })),
      modifiers: politics.modifiers || [],
      wonders: (politics.wonders || []).map((w, i) => ({
        id: w.id,
        name: w.name,
        desc: w.desc,
        avatar: saveImage(w.avatar, `${tag}-wonder-${i + 1}`)
      })),
      heroes: (politics.heroes || []).map((h, i) => ({
        id: h.id,
        name: h.name,
        title: h.title,
        stars: h.stars,
        bio: h.bio,
        avatar: saveImage(h.avatar, `${tag}-hero-${i + 1}`)
      }))
    },
    military: {
      legions,
      units: unitDefs
    },
    stats: Object.fromEntries(statsKeys.map(([key]) => [key, Number(leader.stats?.[key] ?? 0)]))
  }
})


// ---------- 数据模块 ----------
writeFileSync(
  join(dataDir, 'countries.mjs'),
  `// 由 scripts/import-countries.mjs 自动生成，请勿手改
export default ${JSON.stringify(records, null, 2)}
`,
  'utf8'
)

// ---------- 第二遍：生成页面 ----------
// 注意：VitePress 本地搜索按 Markdown 标题切分页面，
// 每页必须有一个「# 国名」标题，否则整页不会进入搜索索引。
records.forEach((r, i) => {

  const searchText = [
    r.name,
    r.race,
    `首都 ${r.capital}`,
    `信仰 ${r.faith}`,
    r.politics.system,
    `区域 ${r.region.name}`,
    r.region.traits.join(' '),
    `统治者 ${r.politics.leader.title} ${r.politics.leader.name}`,
    r.politics.leader.traits.join(' '),
    r.politics.factions.map((f) => f.name).join(' '),
    r.politics.wonders.map((w) => w.name).join(' '),
    r.military.units.map((u) => u.name).join(' '),
    r.bio
  ]
    .filter(Boolean)
    .join(' ')
    .replace(/</g, '‹')

  const frontmatter = [
    '---',
    `title: ${r.name}`,
    `description: ${r.race}政权 · 首都${r.capital} · ${r.politics.system}`,
    'outline: false',
    '---'
  ].join('\n')

  const md = `${frontmatter}

# ${r.name}

<CountryPage :index="${i}" />

<div class="search-only">
${searchText}
</div>
`
  writeFileSync(join(mdDir, `${r.slug}.md`), md, 'utf8')
})

// ---------- 侧边栏 ----------
const sidebarItems = records
  .map(
    (c) =>
      `    { text: ${JSON.stringify(`${String(c.index).padStart(2, '0')} · ${c.name}`)}, link: '/countries/${c.slug}' }`
  )
  .join(',\n')
writeFileSync(
  join(dataDir, 'sidebar-countries.mjs'),
  `// 由 scripts/import-countries.mjs 自动生成，请勿手改
export default [
  {
    text: '国家档案',
    collapsed: true,
    items: [
      { text: '全部国家', link: '/countries/' },
${sidebarItems}
    ]
  }
]
`,
  'utf8'
)

// ---------- 入口页 ----------
const indexSearch = records
  .map((c) => `${c.name} ${c.race} ${c.capital} ${c.politics.leader.name} ${c.politics.system}`)
  .join('。')

writeFileSync(
  join(mdDir, 'index.md'),
  `---
title: 国家档案
description: 二十个国家的政体、统治者、势力与军团
outline: false
---

# 国家档案

一片大陆上并立着二十个政权。点开任意一张卡片，查看它的统治者、势力格局、奇观与军团。

<CountryExplorer />

<div class="search-only">
${indexSearch}
</div>
`,
  'utf8'
)

console.log(`countries: ${records.length}`)
console.log(`images: ${imageCount}`)
console.log(`pages: ${records.map((c) => c.slug).join(', ')}`)
