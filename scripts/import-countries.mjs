// 把「国家资料集」JSON 转成 Wiki 页面 + 静态资源 + 数据模块
// 用法: node scripts/import-countries.mjs [jsonPath]
import { mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const srcPath = process.argv[2] || 'D:/Backup/Downloads/国家资料集_备份_2026-11-14.json'
const countries = JSON.parse(readFileSync(srcPath, 'utf8'))

const imgDir = join(root, 'docs/public/countries')
const mdDir = join(root, 'docs/countries')
const dataDir = join(root, 'docs/.vitepress/data')

for (const dir of [imgDir, mdDir, dataDir]) mkdirSync(dir, { recursive: true })
rmSync(imgDir, { recursive: true, force: true })
mkdirSync(imgDir, { recursive: true })
// 只清理生成的文件，别动手写的 index.md
for (const f of ['countries.mjs', 'sidebar-countries.mjs']) {
  rmSync(join(dataDir, f), { force: true })
}

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
  const target = join(imgDir, `${fileName}.${ext}`)
  writeFileSync(target, Buffer.from(m[2], 'base64'))
  imageCount += 1
  return `/countries/${fileName}.${ext}`
}

function slugOf(name, used) {
  let base = String(name || '未命名').replace(/[\\/:*?"<>|#%]/g, '').trim() || '未命名'
  let slug = base
  let n = 2
  while (used.has(slug)) slug = `${base}-${n++}`
  used.add(slug)
  return slug
}

const usedSlugs = new Set()
const out = []

countries.forEach((c, index) => {
  const slug = slugOf(c.name, usedSlugs)
  const tag = `c${String(index + 1).padStart(2, '0')}`
  const leader = c.politics?.leader || {}
  const politics = c.politics || {}
  const military = c.military || {}

  const leaderAvatar = saveImage(leader.avatar, `${tag}-leader`)
  const wonders = (politics.wonders || []).map((w, i) => ({
    id: w.id,
    name: w.name,
    desc: w.desc,
    avatar: saveImage(w.avatar, `${tag}-wonder-${i + 1}`)
  }))
  const heroes = (politics.heroes || []).map((h, i) => ({
    id: h.id,
    name: h.name,
    title: h.title,
    stars: h.stars,
    bio: h.bio,
    avatar: saveImage(h.avatar, `${tag}-hero-${i + 1}`)
  }))

  const accent = politics.factions?.[0]?.color || '#2f7d63'

  const record = {
    id: c.id,
    slug,
    index: index + 1,
    name: c.name,
    race: c.race,
    capital: c.capital,
    faith: c.faith,
    bio: c.nation_bio,
    accent,
    region: {
      name: c.region_name,
      traits: (c.region_traits || '').split(/[、,，]/).map((t) => t.trim()).filter(Boolean),
      customTag: c.region_custom_tag || '',
      desc: c.region_desc
    },
    politics: {
      system: politics.system,
      leader: {
        name: leader.name,
        title: leader.title,
        avatar: leaderAvatar,
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
      wonders,
      heroes
    },
    military: {
      legions: military.legions || [],
      units: (military.units || []).map((u) => ({
        id: u.id,
        name: u.name,
        role: u.role,
        race: u.race,
        size: u.size,
        modifiers: u.modifiers,
        desc: u.desc,
        equipment: u.equipment
      }))
    },
    stats: Object.fromEntries(
      statsKeys.map(([key]) => [key, Number(leader.stats?.[key] ?? 0)])
    )
  }
  out.push(record)

  const frontmatter = [
    '---',
    `title: ${record.name}`,
    `description: ${record.race}政权 · 首都${record.capital} · ${record.politics.system}`,
    `outline: [2, 3]`,
    '---'
  ].join('\n')

  const md = `${frontmatter}

<CountryPage :index="${index}" />
`
  writeFileSync(join(mdDir, `${slug}.md`), md, 'utf8')
})

const dataModule = `// 由 scripts/import-countries.mjs 自动生成，请勿手改
export default ${JSON.stringify(out, null, 2)}
`
writeFileSync(join(dataDir, 'countries.mjs'), dataModule, 'utf8')

const sidebarItems = out
  .map((c) => `    { text: ${JSON.stringify(`${String(c.index).padStart(2, '0')} · ${c.name}`)}, link: '/countries/${c.slug}' }`)
  .join(',\n')
const sidebarModule = `// 由 scripts/import-countries.mjs 自动生成，请勿手改
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
`
writeFileSync(join(dataDir, 'sidebar-countries.mjs'), sidebarModule, 'utf8')

console.log(`countries: ${out.length}`)
console.log(`images: ${imageCount}`)
console.log(`pages: ${out.map((c) => c.slug).join(', ')}`)
