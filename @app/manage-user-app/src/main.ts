import './style.css'
import '@vue-monorepo/dev-extreme-config/node_modules/devextreme/dist/css/dx.dark.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router/index.ts'

const app = createApp(App)
app.use(router)
app.mount('#app')
