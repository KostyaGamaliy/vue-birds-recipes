import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './routes/router'
//import { createPinia } from 'pinia'
import store from '@/pinia/store'

//const pinia = createPinia()
const app = createApp(App)

app.use(router).use(store).mount('#app')
