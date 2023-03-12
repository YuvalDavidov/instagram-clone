import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../pages/home.vue'
import UserProfile from '../pages/user-profile.vue'
import Search from '../pages/search.vue'
import Messages from '../pages/messages.vue'


const routerOptions = {
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Home,
        },
        {
            path: '/:username',
            component: UserProfile
        },
        {
            path: '/search',
            component: Search,
        },
        {
            path: '/messages',
            component: Messages,
        },


    ],
}
const router = createRouter(routerOptions)

export default router
