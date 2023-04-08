import { postService } from '../services/post.service'

export const postStore = {
    state: {
        userPosts: [],
        followingPosts: [],
        numOfPostsToQuerry: 4
    },
    getters: {
        userPosts({ userPosts }) {
            return userPosts
        },
        followingPosts({ followingPosts }) {
            return followingPosts
        },
        currNumOfPosts({ numOfPostsToQuerry }) {
            return numOfPostsToQuerry
        }
    },
    mutations: {
        setUserPosts(state, { userPosts }) {
            state.userPosts = userPosts
        },
        setPosts(state, { posts }) {
            state.followingPosts = posts
        },
        setCurrNumOfPosts(state, { num }) {
            state.numOfPostsToQuerry = num
        },
        addPost(state, { post }) {
            state.userPosts.push(post)
            state.followingPosts.push(post)
        },
        removePost(state, { postId }) {
            state.userPosts = state.userPosts.filter(post => post._id !== postId)
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
        async addPost({ commit }, { post }) {
            try {
                commit({ type: 'addPost', post })
            } catch (error) {
                throw new Error('coudl\'nt add post', error)

            }
        },
        async removePost({ commit }, { postId }) {
            try {
                await postService.removePost(postId)
                commit({ type: 'removePost', postId })

            } catch (error) {
                throw new Error('coudl\'nt remove post', error)

            }
        },
        async loadPosts({ commit }, { user, numOfPostsToQuerry }) {
            try {
                if (numOfPostsToQuerry) {
                    console.log(numOfPostsToQuerry)
                    commit({ type: 'setCurrNumOfPosts', num: numOfPostsToQuerry })
                }

                const posts = await postService.getPosts(user, this.state.postStore.numOfPostsToQuerry)
                commit({ type: 'setPosts', posts })
            } catch (err) {
                throw new Error('coudl\'nt get posts', err)

            }
        },
    }

}