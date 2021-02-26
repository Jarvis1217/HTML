import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'indexPage',
    component: () => import('../views/indexPage.vue')
  },
  {
    path: '/login',
    name: 'loginPage',
    component: () => import('../views/loginPage.vue')
  },
  {
    path: '/info',
    name: 'infoPage',
    component: () => import('../views/infoPage.vue')
  },
  {
    path: '/write',
    name: 'writePage',
    component: () => import('../views/writePage.vue')
  },
  {
    path: '/view',
    name: 'viewPage',
    component: () => import('../views/viewPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
