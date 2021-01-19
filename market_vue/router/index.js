import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/login.vue")
    },
    {
        path: "/index",
        name: "index",
        component: () => import("../views/index.vue")
    },
    {
        path:"/admin",
        name:"admin",
        component: () => import("../views/admin.vue")
    }
]

const router = createRouter({
    base:"./",
    history: createWebHashHistory(),
    routes
})

export default router
