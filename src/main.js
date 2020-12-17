import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'
import 'normalize.css'
import './style/index.scss'

//以下为根据屏幕大小不同，改变rem的数据
const width = document.documentElement.clientWidth || document.body.clientWidth
const ratio = width / 375
document.getElementsByTagName('html')[0].style.fontSize = 100 * ratio + 'px'
//以下为创建vue实例
const app = createApp(App).use(store).use(router).mount('#app')

// router.afterEach((to,from,next)=>{
//   app.scrollTop = 0
//   next()
// })


