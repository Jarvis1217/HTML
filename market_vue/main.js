import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import Cookies from 'js-cookie'

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();

    } else if (to.path === '/index') {
        if(Cookies.get("User") === undefined) {
            next("/login");
        }else {
            next();
        }

    } else if (to.path === '/admin') {
        if(Cookies.get("User") === undefined) {
            next("/login");
        }else if(Cookies.get("User") === "index") {
            next("/index");
        }else {
            next();
        }
    }else {
        next();
    }
})

createApp(App).use(router).mount('#app')
