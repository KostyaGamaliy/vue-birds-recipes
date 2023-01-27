import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './routes/router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

app.use(pinia).use(router).mount('#app')
