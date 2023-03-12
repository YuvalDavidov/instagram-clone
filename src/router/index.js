import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../pages/home.vue'


const routerOptions = {
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Home,
        },


    ],
}
const router = createRouter(routerOptions)

export default router
