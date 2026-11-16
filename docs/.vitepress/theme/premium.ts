/**
 * 高级交互层：自定义光标、磁性按钮、卡片 3D 倾斜、滚动揭示、顶部进度条、噪点与暗角
 * 全部在浏览器端运行，SSR 时不执行。
 */

const isTouch = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window)

/* ---------------- 自定义光标 ---------------- */
function installCursor() {
  if (isTouch()) return
  const dot = document.createElement('div')
  dot.className = 'ui-cursor-dot'
  const ring = document.createElement('div')
  ring.className = 'ui-cursor-ring'
  document.body.append(dot, ring)
  document.documentElement.classList.add('has-custom-cursor')

  let mx = window.innerWidth / 2
  let my = window.innerHeight / 2
  let rx = mx
  let ry = my
  let visible = false

  const onMove = (e: PointerEvent) => {
    mx = e.clientX
    my = e.clientY
    if (!visible) {
      visible = true
      document.documentElement.classList.add('cursor-active')
    }
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`
    const el = e.target as HTMLElement
    const interactive = el?.closest?.(
      'a, button, .dp-card, .pv-bcard, .eco-block, .VPSidebarItem .link, .VPNavBarMenuLink'
    )
    ring.classList.toggle('is-hover', !!interactive)
  }

  const loop = () => {
    rx += (mx - rx) * 0.16
    ry += (my - ry) * 0.16
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
    requestAnimationFrame(loop)
  }

  window.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('pointerleave', () => {
    visible = false
    document.documentElement.classList.remove('cursor-active')
  })
  requestAnimationFrame(loop)
}

/* ---------------- 磁性元素 ---------------- */
function installMagnetic() {
  if (isTouch()) return
  const STRENGTH = 0.22
  document.addEventListener(
    'pointermove',
    (e) => {
      const el = (e.target as HTMLElement)?.closest?.('[data-magnetic], .vp-button, .tw-btn') as HTMLElement | null
      if (!el) return
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      el.style.transform = `translate3d(${dx * STRENGTH}px, ${dy * STRENGTH}px, 0)`
    },
    { passive: true }
  )
  document.addEventListener(
    'pointerout',
    (e) => {
      const el = (e.target as HTMLElement)?.closest?.('[data-magnetic], .vp-button, .tw-btn') as HTMLElement | null
      if (el) el.style.transform = ''
    },
    { passive: true }
  )
}

/* ---------------- 卡片 3D 倾斜 ---------------- */
function installTilt() {
  if (isTouch()) return
  const MAX = 7
  document.addEventListener(
    'pointermove',
    (e) => {
      const el = (e.target as HTMLElement)?.closest?.('.dp-card, .pv-bcard, .eco-kpi-card, .tw-item') as HTMLElement | null
      if (!el) return
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      el.style.transform = `perspective(700px) rotateX(${-py * MAX}deg) rotateY(${px * MAX}deg) translateY(-3px)`
      el.style.setProperty('--glare-x', `${(px + 0.5) * 100}%`)
      el.style.setProperty('--glare-y', `${(py + 0.5) * 100}%`)
    },
    { passive: true }
  )
  document.addEventListener(
    'pointerout',
    (e) => {
      const el = (e.target as HTMLElement)?.closest?.('.dp-card, .pv-bcard, .eco-kpi-card, .tw-item') as HTMLElement | null
      if (el) el.style.transform = ''
    },
    { passive: true }
  )
}

/* ---------------- 滚动揭示 ---------------- */
let revealObserver: IntersectionObserver | null = null

function installReveal() {
  if (!('IntersectionObserver' in window)) return
  revealObserver?.disconnect()
  revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLElement
        el.classList.add('is-revealed')
        revealObserver?.unobserve(el)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
  )

  const mark = () => {
    const nodes = document.querySelectorAll<HTMLElement>(
      '.vp-doc h2, .vp-doc section, .vp-doc .home-shell > *, .vp-doc .eco-main > .eco-block, .dp-card, .pv-bcard, .tw-item, .dp-bloc'
    )
    let i = 0
    for (const el of nodes) {
      if (el.classList.contains('reveal')) continue
      el.classList.add('reveal')
      el.style.setProperty('--reveal-delay', `${Math.min(i % 8, 7) * 45}ms`)
      revealObserver?.observe(el)
      i++
    }
  }

  mark()

  // 组件异步渲染时补挂
  const mo = new MutationObserver(() => {
    window.clearTimeout((mo as any)._t)
    ;(mo as any)._t = window.setTimeout(mark, 120)
  })
  mo.observe(document.body, { childList: true, subtree: true })
  window.setTimeout(() => mo.disconnect(), 20000)

  window.setTimeout(mark, 300)
  window.setTimeout(mark, 1000)
  window.setTimeout(mark, 2500)
}

/* ---------------- 顶部滚动进度条 ---------------- */
function installProgress() {
  const bar = document.createElement('div')
  bar.className = 'ui-progress'
  document.body.appendChild(bar)

  const update = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight
    const p = h > 0 ? Math.min(1, window.scrollY / h) : 0
    bar.style.setProperty('--p', String(p))
    document.documentElement.classList.toggle('scrolled', window.scrollY > 24)
  }
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
  update()
}

/* ---------------- 首页视差与聚光 ---------------- */
function installHeroParallax() {
  const hero = document.querySelector('.home-shell') as HTMLElement | null
  if (!hero) return
  const layers = hero.querySelectorAll<HTMLElement>('[data-parallax]')
  hero.addEventListener(
    'pointermove',
    (e) => {
      const r = hero.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      hero.style.setProperty('--spot-x', `${(px + 0.5) * 100}%`)
      hero.style.setProperty('--spot-y', `${(py + 0.5) * 100}%`)
      layers.forEach((el, i) => {
        const depth = Number(el.dataset.parallax) || (i + 1) * 6
        el.style.transform = `translate3d(${-px * depth}px, ${-py * depth}px, 0)`
      })
    },
    { passive: true }
  )
}

/* ---------------- 安装 ---------------- */
export function installPremiumUI() {
  if (typeof window === 'undefined') return
  document.documentElement.classList.add('ui-premium')
  installCursor()
  installMagnetic()
  installTilt()
  installProgress()
}

export function onRouteChanged() {
  if (typeof window === 'undefined') return
  installReveal()
  installHeroParallax()
  window.scrollTo({ top: 0, behavior: 'auto' })
}
