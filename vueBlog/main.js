import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'
import  i18n from './language/il8n.js'

// Vuex
const store = createStore({
    state () {
        return {
            logStatus: sessionStorage.getItem("logStatus") === "true",
            blogs:[],
            pageList:[],
            title: ''
        }
    },
    mutations: {
        statusChange(state) {
            state.logStatus = !state.logStatus;
        },
        blogsChange(state,list) {
            state.blogs = list;
        },
        pageListChange(state,list) {
            state.pageList = list;
        },
        titleChange(state,tt) {
            state.title = tt;
        }
    }
});

// 路由守卫
router.beforeEach(((to, from, next) => {
    if(to.path === "/info") {
        if(store.state.logStatus === true) {
            next();
        }else {
            next('/index');
        }
    } else {
        next()
    }
}))

const app = createApp(App)
app.use(router)
app.use(store)
app.use(i18n)
app.mount('#app')
