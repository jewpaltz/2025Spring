import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'

const app = createApp(App)

app.use(router).use(Buefy, {
  defaultIconPack: 'fas',
})

app.mount('#app')
