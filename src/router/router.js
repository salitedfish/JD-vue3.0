import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => { return import('../views/index/Index.vue') },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => { return import('../views/index/pages/Home.vue') }
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => { return import('../views/index/pages/Cart.vue') }
      },
      {
        path: '/user',
        name: 'User',
        component: () => { return import('../views/index/pages/User.vue') }
      },
      {
        path: '/order',
        name: 'Order',
        component: () => { return import('../views/index/pages/Order.vue') }
      }
    ]
  },
  {
    path: '/ordercomfirm/:id',
    name: 'OrderComfirm',
    component: () => { return import('../views/index/OrderComfirm.vue') }
  },
  {
    path: '/malldetail/:id',
    name: 'MallDetail',
    component: () => { return import('../views/malldetail/MallDetail.vue') },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => { return import('../views/login/Login') },
    // beforeEnter(to, from, next) {
    //   let { isLogin } = localStorage
    //   isLogin ? next("/home") : next();
    // }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => { return import('../views/register/Register.vue') }
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

//使用导航守卫
router.beforeEach((to, from, next) => {

  let { isLogin } = localStorage;
  (isLogin || to.name === 'Login' || to.name === 'Register') ? next() : next({ name: 'Login' });
})

export default router
