import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import type { App } from 'vue'
import CountryPage from './components/CountryPage.vue'
import CountryExplorer from './components/CountryExplorer.vue'
import MapViewer from './components/MapViewer.vue'
import EconomyExplorer from './components/EconomyExplorer.vue'
import HomePage from './components/HomePage.vue'
import AccountPage from './components/AccountPage.vue'
import AdminPage from './components/AdminPage.vue'
import PolicyBoard from './components/PolicyBoard.vue'
import ForumBoard from './components/ForumBoard.vue'
import ProductionView from './components/ProductionView.vue'
import CellMap from './components/CellMap.vue'
import DiplomacyBoard from './components/DiplomacyBoard.vue'
import DispatchBoard from './components/DispatchBoard.vue'
import CultureBoard from './components/CultureBoard.vue'
import './style.css'
import './ui-refresh.css'
import './wide.css'
import './premium.css'
import { installPremiumUI, onRouteChanged } from './premium'

const RIPPLE_TARGETS = 'button, .vp-button, .VPNavBarMenuLink, .VPSidebarItem .link, .dp-card, .tw-btn'

function installRipple() {
  document.addEventListener(
    'pointerdown',
    (e) => {
      const el = (e.target as HTMLElement)?.closest?.(RIPPLE_TARGETS) as HTMLElement | null
      if (!el) return
      const rect = el.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const span = document.createElement('span')
      span.className = 'ui-ripple'
      span.style.width = span.style.height = size + 'px'
      span.style.left = e.clientX - rect.left - size / 2 + 'px'
      span.style.top = e.clientY - rect.top - size / 2 + 'px'
      el.appendChild(span)
      window.setTimeout(() => span.remove(), 650)
    },
    { passive: true }
  )
}

function installRouteTransition(router: any) {
  const animate = () => {
    document.body.classList.remove('route-enter')
    void document.body.offsetWidth
    document.body.classList.add('route-enter')
    window.setTimeout(() => document.body.classList.remove('route-enter'), 700)
  }
  if (router?.onAfterRouteChanged !== undefined) {
    const prev = router.onAfterRouteChanged
    router.onAfterRouteChanged = (to: string) => {
      prev?.(to)
      animate()
      window.setTimeout(() => onRouteChanged(), 80)
    }
  }
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }: { app: App; router?: any }) {
    if (typeof window !== 'undefined') {
      installRipple()
      installRouteTransition(router)
      installPremiumUI()
      window.setTimeout(() => onRouteChanged(), 60)
    }
    app.component('CountryPage', CountryPage)
    app.component('CountryExplorer', CountryExplorer)
    app.component('MapViewer', MapViewer)
  app.component('EconomyExplorer', EconomyExplorer)
  app.component('HomePage', HomePage)
  app.component('AccountPage', AccountPage)
  app.component('AdminPage', AdminPage)
  app.component('PolicyBoard', PolicyBoard)
  app.component('ForumBoard', ForumBoard)
  app.component('ProductionView', ProductionView)
  app.component('CellMap', CellMap)
  app.component('DiplomacyBoard', DiplomacyBoard)
  app.component('DispatchBoard', DispatchBoard)
  app.component('CultureBoard', CultureBoard)
  }
} satisfies Theme
