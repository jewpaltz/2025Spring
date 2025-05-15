import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import Oruga from '@oruga-ui/oruga-next'

const app = createApp(App)

app
  .use(router)
  .use(Buefy, {
    defaultIconPack: 'fas',
  })
  .use(Oruga)

app.mount('#app')
