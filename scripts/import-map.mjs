// 从 FMG .map 文件里抽出可交互的 SVG 地图 + 州/城市数据
// 用法: node scripts/import-map.mjs "path/to/xxx.map"
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const srcPath = process.argv[2] || 'D:/Backup/Downloads/葬火之后 2026-11-13-23-03.map'
const raw = readFileSync(srcPath, 'utf8')

const outSvg = join(root, 'docs/public/map/world.svg')
const outData = join(root, 'docs/.vitepress/data/map.mjs')
mkdirSync(dirname(outSvg), { recursive: true })

// ---------- SVG ----------
const svgStart = raw.indexOf('<svg')
const svgEnd = raw.indexOf('</svg>') + 6
let svg = raw.slice(svgStart, svgEnd)

// 从原图里抽出每个政权的多边形路径（原图把政权图层藏在了 cells 里，不可见），
// 之后由页面自己重新绘制，顺手把这段从 SVG 里删掉省体积
const stateShapes = []
for (const m of svg.matchAll(/<path d="([^"]+)"[^>]*fill="(#[0-9a-fA-F]{6})"[^>]*id="state(\d+)"[^>]*\/>/g)) {
  stateShapes.push({ i: Number(m[3]), color: m[2], d: m[1] })
}

// 去掉纯 UI 图层（网格、坐标、比例尺等）减体积；
// 注意：deftemp 里是地形 mask/feature 定义，删了陆地会变空白；cells 里装着政权图层，也不能删
const dropGroups = ['scaleBar', 'gridOverlay', 'coordinates', 'cellIndexes', 'temperature', 'provs', 'zones']

function extractGroup(text, id) {
  const tokenRe = /<g\b[^>]*>|<\/g>/g
  let depth = 0
  let start = -1
  let m
  while ((m = tokenRe.exec(text))) {
    const tag = m[0]
    const selfClosing = tag.endsWith('/>')
    if (start === -1) {
      if (tag.startsWith('<g') && tag.includes(`id="${id}"`)) {
        start = m.index
        if (selfClosing) {
          return { start, end: m.index + tag.length, block: tag }
        }
        depth = 1
      }
      continue
    }
    if (tag === '</g>') {
      depth -= 1
      if (depth === 0) {
        return { start, end: m.index + tag.length, block: text.slice(start, m.index + tag.length) }
      }
    } else if (!selfClosing) {
      depth += 1
    }
  }
  return null
}

for (const id of dropGroups) {
  const found = extractGroup(svg, id)
  if (found) svg = svg.slice(0, found.start) + svg.slice(found.end)
}

// 存档时用户把「cells」图层关掉了，而政权图层就嵌在它里面，
// 所以把政权图层整段移除（路径已经单独抽出来，由页面重绘）
const regions = extractGroup(svg, 'regions')
if (regions) {
  svg = svg.slice(0, regions.start) + svg.slice(regions.end)
}

writeFileSync(outSvg, svg, 'utf8')

// ---------- 数据 ----------
const lines = raw.split(/\r?\n/)
const blocks = []
for (const line of lines) {
  const t = line.trim()
  if (!t.startsWith('[') && !t.startsWith('{')) continue
  try {
    blocks.push(JSON.parse(t))
  } catch {
    /* 跳过 SVG 行 */
  }
}

const statesBlock = blocks.find((b) => {
  if (!Array.isArray(b) || b.length < 5) return false
  const first = b.find((x) => x && typeof x === 'object')
  return first && 'neighbors' in first && 'name' in first
})
const burgsBlock = blocks.find((b) => {
  if (!Array.isArray(b) || b.length < 5) return false
  const first = b.find((x) => x && typeof x === 'object')
  return first && 'cell' in first && 'state' in first && 'x' in first
})

if (!statesBlock) throw new Error('找不到 state 数据')

// 从抽出来的路径里取每个州的主色（政权图层已从 SVG 移除，不能再从 svg 里找）
const colorOf = {}
for (const shape of stateShapes) colorOf[shape.i] = shape.color

const burgs = (burgsBlock || [])
  .filter((b) => b && b.i > 0 && b.name)
  .map((b) => ({
    i: b.i,
    name: b.name,
    x: Math.round(b.x * 10) / 10,
    y: Math.round(b.y * 10) / 10,
    state: b.state,
    capital: !!b.capital,
    population: b.population ? Math.round(b.population * 10) / 10 : 0,
    port: b.port ? 1 : 0
  }))

// 站内国家页（用国名匹配；地图和资料集偶有异体字，这里做归一化 + 别名）
let countries = []
try {
  const mod = await import(pathToFileURL(join(root, 'docs/.vitepress/data/countries.mjs')).href)
  countries = mod.default
} catch (err) {
  console.warn('读取国家数据失败：', err.message)
  countries = []
}

const alias = {
  八薮之囿: '八菽之囿',
  白韵: '白昀'
}

const normalize = (name) =>
  String(name || '')
    .replace(/(帝国|共和国|王国|至高国|王朝|城|国)$/g, '')
    .trim()

const slugByName = new Map()
for (const c of countries) {
  slugByName.set(c.name, c.slug)
  slugByName.set(normalize(c.name), c.slug)
}

function matchSlug(name) {
  const raw = String(name || '').trim()
  if (slugByName.has(raw)) return slugByName.get(raw)
  const aliased = alias[raw]
  if (aliased && slugByName.has(aliased)) return slugByName.get(aliased)
  const n = normalize(raw)
  if (slugByName.has(n)) return slugByName.get(n)
  return null
}

const states = statesBlock
  .filter((s) => s && s.i > 0 && s.name)
  .map((s) => {
    const stateBurgs = burgs.filter((b) => b.state === s.i)
    const capital = stateBurgs.find((b) => b.capital) || null
    return {
      i: s.i,
      name: s.name,
      color: colorOf[s.i] || '#8a8a8a',
      slug: matchSlug(s.name),
      area: Math.round(s.area || 0),
      cells: s.cells || 0,
      burgCount: stateBurgs.length,
      capital: capital ? { name: capital.name, x: capital.x, y: capital.y } : null
    }
  })

const info = raw.slice(0, raw.indexOf('\n')).split('|')
const [version, , date, seed, width, height] = info

const data = {
  width: Number(width) || 1912,
  height: Number(height) || 956,
  version,
  seed,
  date,
  states,
  burgs,
  stateShapes
}

writeFileSync(
  outData,
  `// 由 scripts/import-map.mjs 自动生成，请勿手改
export default ${JSON.stringify(data)}
`,
  'utf8'
)

const matched = states.filter((s) => s.slug).length
console.log('svg MB:', (svg.length / 1024 / 1024).toFixed(2))
console.log('states:', states.length, 'matched to wiki:', matched)
console.log('burgs:', burgs.length)
console.log('unmatched states:', states.filter((s) => !s.slug).map((s) => s.name).join(', '))
