import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../pages/home.vue'
import UserProfile from '../pages/user-profile.vue'

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
        }


    ],
}
const router = createRouter(routerOptions)

export default router
