import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: () =>
            import ('../views/Home.vue')
    },
    {
        path: '/step-1',
        name: 'Step 1',
        component: () =>
            import ('../views/Step_1.vue')
    },
    {
        path: '/step-2',
        name: 'Step 2',
        component: () =>
            import ('../views/Step_2.vue')
    },
    {
        path: '/step-3',
        name: 'Step 3',
        component: () =>
            import ('../views/Step_3.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes
})


export default router