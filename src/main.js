import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'
import 'normalize.css'
import './style/index.scss'

const app = createApp(App).use(store).use(router).mount('#app')

// router.afterEach((to,from,next)=>{
//   app.scrollTop = 0
//   next()
// })