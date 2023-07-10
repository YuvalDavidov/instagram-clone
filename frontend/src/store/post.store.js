import { postService } from '../services/post.service'
// let postsIdsOld = [...new Set([...state.userPosts].map(post => post._id))]
//             let newPosts = [...userPosts].reduce((acc, post) => {
//                 if (!postsIdsOld.includes(post._id)) acc.push(post)
//                 return acc
//             }, [])
export const postStore = {
    state: {
        post: null,
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
        },
        getPost({ post }) {
            return post
        }
    },
    mutations: {
        setUserPosts(state, { userPosts }) {
            state.userPosts = [...userPosts]
        },
        setPosts(state, { posts }) {
            state.followingPosts = [...posts]
        },
        setPost(state, { post }) {
            state.post = post
        },
        setCurrNumOfPosts(state, { num }) {
            state.numOfPostsToQuerry = num
        },
        addPost(state, { post }) {
            state.userPosts.unshift(post)
            state.followingPosts.unshift(post)
        },
        updateUserPost(state, { post }) {
            const idx = state.userPosts.findIndex(p => p._id === post._id)
            state.userPosts.splice(idx, 1, post)
            state.userPosts = [...state.userPosts]
        },
        updatePost(state, { post }) {
            const idx = state.followingPosts.findIndex(p => p._id === post._id)
            state.followingPosts.splice(idx, 1, post)
            state.followingPosts = [...state.followingPosts]
        },
        removePost(state, { postId }) {
            state.userPosts = state.userPosts.filter(post => post._id !== postId)
        }
    },
    actions: {
        async loadUserPosts({ commit }, { userId, numOfPostsToQuerry }) {
            try {
                const userPosts = await postService.getUserPostsById(userId, numOfPostsToQuerry)
                commit({ type: 'setUserPosts', userPosts })
            } catch (error) {
                throw new Error('coudl\'nt get posts from user', error)
            }
        },
        async savePost({ commit, state }, { post }) {
            const actionType = (state.userPosts.find(posta => posta._id === post._id)) ? 'updateUserPost' : 'updatePost'
            try {
                commit({ type: actionType, post })
            } catch (error) {
                throw new Error('coudl\'nt save post', error)

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
        async loadPosts({ commit }, { userId, numOfPostsToQuerry }) {
            try {
                if (numOfPostsToQuerry) {
                    commit({ type: 'setCurrNumOfPosts', num: numOfPostsToQuerry })
                }
                const posts = await postService.getPosts(userId, this.state.postStore.numOfPostsToQuerry)
                commit({ type: 'setPosts', posts })
            } catch (err) {
                throw new Error('coudl\'nt get posts', err)

            }
        },
        async loadPost({ commit }, { postId }) {
            try {
                const post = await postService.getPostById(postId)
                commit({ type: 'setPost', post })
            } catch (err) {
                throw new Error('coudl\'nt get post', err)
            }
        }
    }

}