import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => { return import('../views/index/Index.vue') },
    children: [
      {
        path: '/home',
        component: () => { return import('../views/index/pages/Home.vue') }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
