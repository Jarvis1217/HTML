import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/loginPage.vue')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/indexPage.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
