import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../pages/home.vue'
import UserProfile from '../pages/user-profile.vue'
import Search from '../pages/search.vue'
import Messages from '../pages/messages.vue'
import Notifications from '../pages/notifications.vue'
import StorySlider from '../cmps/story-slider.vue'
import EditProfile from '../pages/edit-profile.vue'
import Post from '../pages/post.vue'

const routerOptions = {
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Home,
        },
        {
            path: '/profile/:_id',
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
        {
            path: '/notifications',
            component: Notifications,
        },
        {
            path: '/stories/profile/:_id/:storyId',
            component: StorySlider,
        },
        {
            path: '/stories/:_id/:storyId',
            component: StorySlider,
        },
        {
            path: '/account/edit',
            component: EditProfile
        },
        {
            path: '/post/:postId',
            component: Post
        },


    ],
}
const router = createRouter(routerOptions)

export default router
