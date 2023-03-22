import { createStore } from 'vuex'
import { postService } from '../services/post.service'

export const postStore = {
    state: {
        userPosts: []
    },
    getters: {
        userPosts({ userPosts }) {
            return userPosts
        }
    },
    mutations: {
        setUserPosts(state, { userPosts }) {
            state.userPosts = userPosts
        }
    },
    actions: {
        async loadUserPosts({ commit }, { userId }) {
            try {
                const userPosts = await postService.getUserPostsById(userId)
                commit({ type: 'setUserPosts', userPosts })
            } catch (error) {

            }
        },
    }

}