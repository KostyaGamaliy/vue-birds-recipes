import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
//import HeaderForm from "@/components/Header.vue"
import router from './routes/router'

const app = createApp(App)
//app.component("HeaderForm", HeaderForm)
app.use(router).mount('#app')
