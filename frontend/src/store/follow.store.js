import { followService } from "../services/follow.service"
import { userService } from "../services/user.service"

// const user = myStore.getters.GetUser
// console.log(user);
export const followStore = {
    state: {
        followers: [],
        following: [],

    },
    getters: {
        getIsFollowing({ following }) {
            console.log(following);


            return following
        },

    },
    mutations: {
        setUnfollow(state, { userId }) {
            state.following = state.following.filter(id => id !== userId)
        },

    },
    actions: {
        async unFollow({ commit }, userId, following) {
            try {
                await followService.unFollow(userId)
                commit({ type: 'setUnfollow', userId })

            } catch (error) {
                throw Error('store - coudl\'nt unfollow', error)

            }
        }

    }
}