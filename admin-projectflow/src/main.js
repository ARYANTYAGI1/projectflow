import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/state/store'
import i18n from './i18n'
import BootstrapVue from 'bootstrap-vue-next'
import ElementPlus from 'element-plus'
import { vMaska } from 'maska'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import moment from 'moment'

import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'element-plus/dist/index.css'
import '@/assets/scss/app.scss'

const app = createApp(App)

// Register Element Plus icons globally
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.config.globalProperties.$filters = {
  formatDate(value) {
    if (value) {
      return moment(String(value)).format('DD/MM/YYYY')
    }
  }
}

// Use plugins and libraries
app.use(router)
app.use(store)
app.use(i18n)
app.use(BootstrapVue)
app.use(ElementPlus)
app.directive('maska', vMaska)

// Mount the app
app.mount('#app')
