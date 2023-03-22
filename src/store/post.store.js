import { createStore } from 'vuex'
import { postService } from '../services/post.service'

export const postStore = {
    state: {
        userPosts: [],
        followingPosts: []
    },
    getters: {
        userPosts({ userPosts }) {
            return userPosts
        },
        followingPosts({ followingPosts }) {
            return followingPosts
        }
    },
    mutations: {
        setUserPosts(state, { userPosts }) {
            state.userPosts = userPosts
        },
        setPosts(state, { posts }) {
            state.followingPosts = posts
        }
    },
    actions: {
        async loadUserPosts({ commit }, { userId }) {
            try {
                const userPosts = await postService.getUserPostsById(userId)
                commit({ type: 'setUserPosts', userPosts })
            } catch (error) {
                throw new Error('coudl\'nt get posts from user', error)
            }
        },
        async loadPosts({ commit }, { user }) {
            try {
                const posts = await postService.getPosts(user)
                commit({ type: 'setPosts', posts })
                console.log(posts)
            } catch (err) {
                throw new Error('coudl\'nt get posts', err)

            }
        }
    }

}