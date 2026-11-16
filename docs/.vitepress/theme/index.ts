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
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: App }) {
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
  }
} satisfies Theme
