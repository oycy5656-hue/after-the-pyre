import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import type { App } from 'vue'
import CountryPage from './components/CountryPage.vue'
import CountryExplorer from './components/CountryExplorer.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('CountryPage', CountryPage)
    app.component('CountryExplorer', CountryExplorer)
  }
} satisfies Theme
